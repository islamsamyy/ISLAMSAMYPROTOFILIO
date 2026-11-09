import { supabase } from '@/lib/supabase/client';
import { initialProjects, ProjectItem } from '@/data/seedProjects';
import { initialPackages, initialConsultationRates, PricingPackage, ConsultationRates } from '@/data/seedPricing';
import { initialArticles, ArticleItem } from '@/data/seedArticles';
import { initialReviews, ClientReview } from '@/data/seedReviews';
import { initialReservations, BookingReservation } from '@/data/seedReservations';
import { initialCertifications, CertificationItem } from '@/data/seedCertifications';
import { initialExperiences, ExperienceItem } from '@/data/seedExperience';
import { initialCrmLeads, CrmLead, CrmStage, CrmActivityLog } from '@/data/seedCrm';

const STORAGE_KEYS = {
  PROJECTS: 'islam_data_projects_v1',
  PACKAGES: 'islam_data_packages_v1',
  CONSULTATION: 'islam_data_consultation_v1',
  ARTICLES: 'islam_data_articles_v1',
  REVIEWS: 'islam_data_reviews_v1',
  RESERVATIONS: 'islam_data_reservations_v1',
  CERTIFICATIONS: 'islam_data_certifications_v1',
  EXPERIENCES: 'islam_data_experiences_v1',
  CRM_LEADS: 'islam_data_crm_leads_v1',
};

function isClient(): boolean {
  return typeof window !== 'undefined';
}

// Cross-tab broadcast channel for multi-tab sync in the browser
let broadcastBus: BroadcastChannel | null = null;
if (typeof window !== 'undefined' && 'BroadcastChannel' in window) {
  try {
    broadcastBus = new BroadcastChannel('islam_store_bus');
  } catch (e) {
    // Unsupported or restricted environment
  }
}

/**
 * Cache data in localStorage without triggering sync events or broadcast storms
 */
function cacheLocally(key: string, data: any) {
  if (!isClient()) return;
  try {
    localStorage.setItem(key, JSON.stringify(data));
  } catch (e) {
    // Ignore storage quota errors
  }
}

/**
 * Notify the active window/tab components to re-read from local storage immediately
 */
export function notifyLocal(table?: string) {
  if (isClient()) {
    window.dispatchEvent(new CustomEvent('islam_store_sync', { detail: { table } }));
  }
}

/**
 * Broadcast to other tabs only AFTER database mutation has successfully committed
 */
export function notifyCrossTab(table?: string) {
  if (isClient()) {
    try {
      broadcastBus?.postMessage({ type: 'sync', table, timestamp: Date.now() });
    } catch (e) {
      // Ignore broadcast errors
    }
  }
}

/**
 * Combined notifier for legacy callers
 */
export function notifyUpdate(table?: string) {
  notifyLocal(table);
  notifyCrossTab(table);
}

/**
 * Universal backend mutation helper that uses /api/admin/mutate (service role)
 * with graceful fallback to client-side Supabase if offline or during unit tests.
 */
async function apiMutate(table: string, action: 'upsert' | 'delete' | 'update', data?: any, id?: string) {
  let lastError: any = null;
  if (isClient()) {
    try {
      const res = await fetch('/api/admin/mutate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ table, action, data, id })
      });
      const json = await res.json().catch(() => ({}));
      if (res.ok && json.success) {
        return json;
      }
      lastError = new Error(json.error || `Server responded with status ${res.status}`);
      console.warn(`[apiMutate] /api/admin/mutate returned error for ${table}:`, json);
    } catch (err: any) {
      lastError = err;
      console.warn(`[apiMutate] Network error calling /api/admin/mutate for ${table}:`, err);
    }
  }

  // Fallback to client-side supabase mutation
  try {
    if (action === 'upsert' && data) {
      const { error } = await (supabase.from(table) as any).upsert(data);
      if (error) throw error;
    } else if (action === 'delete' && id) {
      const { error } = await supabase.from(table).delete().eq('id', id);
      if (error) throw error;
    } else if (action === 'update' && id && data) {
      const { error } = await (supabase.from(table) as any).update(data).eq('id', id);
      if (error) throw error;
    }
    return { success: true };
  } catch (e: any) {
    console.error(`[data-store] Client supabase fallback failed for ${table}:`, e);
    if (isClient() && lastError) {
      throw lastError;
    }
  }
}

// ---------------- PROJECTS ----------------
export function mapProjectRowToItem(row: any): ProjectItem {
  return {
    id: row.id,
    title: row.title,
    client: row.client,
    companyLogo: row.company_logo || '',
    category: row.category,
    role: row.role,
    impactMetric: row.impact_metric,
    metrics: row.metrics || [],
    techStack: row.tech_stack || [],
    summary: row.summary,
    architectureHighlights: row.architecture_highlights || [],
    liveDemoUrl: row.live_demo_url || undefined,
    featured: Boolean(row.featured),
    challenge: row.challenge || undefined,
    solution: row.solution || undefined,
    keyDecisions: row.key_decisions || [],
    systemFlow: row.system_flow || [],
    outcomeMetrics: row.outcome_metrics || [],
  };
}

export function mapProjectItemToRow(p: ProjectItem) {
  return {
    id: p.id,
    title: p.title,
    client: p.client,
    company_logo: p.companyLogo || '',
    category: p.category,
    role: p.role,
    impact_metric: p.impactMetric,
    metrics: p.metrics || [],
    tech_stack: p.techStack || [],
    summary: p.summary,
    architecture_highlights: p.architectureHighlights || [],
    live_demo_url: p.liveDemoUrl || null,
    featured: Boolean(p.featured),
    challenge: p.challenge || null,
    solution: p.solution || null,
    key_decisions: p.keyDecisions || [],
    system_flow: p.systemFlow || [],
    outcome_metrics: p.outcomeMetrics || [],
    updated_at: new Date().toISOString()
  };
}

export function getStoredProjects(): ProjectItem[] {
  if (!isClient()) return initialProjects;
  try {
    const data = localStorage.getItem(STORAGE_KEYS.PROJECTS);
    if (!data) return initialProjects;
    return JSON.parse(data);
  } catch (e) {
    return initialProjects;
  }
}

export function setStoredProjects(projects: ProjectItem[]) {
  cacheLocally(STORAGE_KEYS.PROJECTS, projects);
  notifyLocal('projects');
}

export async function fetchProjectsFromSupabase(): Promise<ProjectItem[]> {
  const { data, error } = await supabase
    .from('projects')
    .select('*')
    .order('display_order', { ascending: true });

  if (error || !data || data.length === 0) {
    return getStoredProjects();
  }
  const mapped = data.map(mapProjectRowToItem);
  cacheLocally(STORAGE_KEYS.PROJECTS, mapped);
  return mapped;
}

export async function saveProject(project: ProjectItem) {
  const list = getStoredProjects();
  const index = list.findIndex(p => p.id === project.id);
  if (index > -1) {
    list[index] = project;
  } else {
    list.unshift(project);
  }
  setStoredProjects(list);

  await apiMutate('projects', 'upsert', mapProjectItemToRow(project));
  notifyCrossTab('projects');
}

export async function deleteProject(id: string) {
  const list = getStoredProjects().filter(p => p.id !== id);
  setStoredProjects(list);

  await apiMutate('projects', 'delete', undefined, id);
  notifyCrossTab('projects');
}

export function getStoredProjectById(id: string): ProjectItem | undefined {
  const projects = getStoredProjects();
  return projects.find(p => p.id === id);
}

// ---------------- PRICING & PACKAGES ----------------
export function mapPackageRowToItem(row: any): PricingPackage {
  return {
    id: row.id,
    name: row.name,
    badge: row.badge,
    headline: row.headline,
    price: row.price,
    frequency: row.frequency,
    duration: row.duration,
    deliverables: row.deliverables || [],
    isPopular: Boolean(row.is_popular),
  };
}

export function mapPackageItemToRow(pkg: PricingPackage) {
  return {
    id: pkg.id,
    name: pkg.name,
    badge: pkg.badge,
    headline: pkg.headline,
    price: pkg.price,
    frequency: pkg.frequency,
    duration: pkg.duration,
    deliverables: pkg.deliverables || [],
    is_popular: Boolean(pkg.isPopular),
    updated_at: new Date().toISOString()
  };
}

export function getStoredPackages(): PricingPackage[] {
  if (!isClient()) return initialPackages;
  try {
    const data = localStorage.getItem(STORAGE_KEYS.PACKAGES);
    if (!data) return initialPackages;
    return JSON.parse(data);
  } catch (e) {
    return initialPackages;
  }
}

export function setStoredPackages(packages: PricingPackage[]) {
  cacheLocally(STORAGE_KEYS.PACKAGES, packages);
  notifyLocal('packages');
}

export async function fetchPackagesFromSupabase(): Promise<PricingPackage[]> {
  const { data, error } = await supabase
    .from('packages')
    .select('*')
    .order('display_order', { ascending: true });

  if (error || !data || data.length === 0) {
    return getStoredPackages();
  }
  const mapped = data.map(mapPackageRowToItem);
  cacheLocally(STORAGE_KEYS.PACKAGES, mapped);
  return mapped;
}

export async function savePackage(pkg: PricingPackage) {
  const list = getStoredPackages();
  const index = list.findIndex(p => p.id === pkg.id);
  if (index > -1) {
    list[index] = pkg;
  } else {
    list.push(pkg);
  }
  setStoredPackages(list);

  await apiMutate('packages', 'upsert', mapPackageItemToRow(pkg));
  notifyCrossTab('packages');
}

export function deletePackage(id: string) {
  const list = getStoredPackages().filter(p => p.id !== id);
  setStoredPackages(list);

  return apiMutate('packages', 'delete', undefined, id).then(() => {
    notifyCrossTab('packages');
  });
}

export function mapRatesRowToItem(row: any): ConsultationRates {
  return {
    hourlyRate: String(row.hourly_rate ?? '$150'),
    session30Min: String(row.session_30_min ?? '$90'),
    session60Min: String(row.session_60_min ?? '$150'),
    availableDays: row.available_days || initialConsultationRates.availableDays,
    availableSlots: row.available_slots || initialConsultationRates.availableSlots,
    availableTimezones: row.available_timezones || initialConsultationRates.availableTimezones,
  };
}

export function getStoredConsultationRates(): ConsultationRates {
  if (!isClient()) return initialConsultationRates;
  try {
    const data = localStorage.getItem(STORAGE_KEYS.CONSULTATION);
    if (!data) return initialConsultationRates;
    return JSON.parse(data);
  } catch (e) {
    return initialConsultationRates;
  }
}

export function setStoredConsultationRates(rates: ConsultationRates) {
  cacheLocally(STORAGE_KEYS.CONSULTATION, rates);
  notifyLocal('consultation_rates');
}

export async function fetchConsultationRatesFromSupabase(): Promise<ConsultationRates> {
  const { data, error } = await supabase
    .from('consultation_rates')
    .select('*')
    .limit(1)
    .maybeSingle();

  if (error || !data) {
    return getStoredConsultationRates();
  }
  const mapped = mapRatesRowToItem(data);
  cacheLocally(STORAGE_KEYS.CONSULTATION, mapped);
  return mapped;
}

export async function saveConsultationRates(rates: ConsultationRates) {
  setStoredConsultationRates(rates);

  await apiMutate('consultation_rates', 'upsert', {
    id: 'default',
    hourly_rate: String(rates.hourlyRate),
    session_30_min: String(rates.session30Min),
    session_60_min: String(rates.session60Min),
    available_days: rates.availableDays,
    available_slots: rates.availableSlots,
    available_timezones: rates.availableTimezones,
    updated_at: new Date().toISOString()
  });
  notifyCrossTab('consultation_rates');
}

// ---------------- ARTICLES / BLOG ----------------
export function mapArticleRowToItem(row: any): ArticleItem {
  return {
    id: row.id,
    slug: row.slug,
    title: row.title,
    category: row.category,
    readTime: row.read_time,
    date: row.date,
    author: row.author || 'Islam Samy',
    excerpt: row.excerpt,
    content: row.content,
    tags: row.tags || [],
    featured: Boolean(row.featured),
  };
}

export function mapArticleItemToRow(a: ArticleItem) {
  return {
    id: a.id,
    slug: a.slug,
    title: a.title,
    category: a.category,
    read_time: a.readTime,
    date: a.date,
    author: a.author || 'Islam Samy',
    excerpt: a.excerpt,
    content: a.content,
    tags: a.tags || [],
    featured: Boolean(a.featured),
    updated_at: new Date().toISOString()
  };
}

export function getStoredArticles(): ArticleItem[] {
  if (!isClient()) return initialArticles;
  try {
    const data = localStorage.getItem(STORAGE_KEYS.ARTICLES);
    if (!data) return initialArticles;
    return JSON.parse(data);
  } catch (e) {
    return initialArticles;
  }
}

export function setStoredArticles(articles: ArticleItem[]) {
  cacheLocally(STORAGE_KEYS.ARTICLES, articles);
  notifyLocal('articles');
}

export async function fetchArticlesFromSupabase(): Promise<ArticleItem[]> {
  const { data, error } = await supabase
    .from('articles')
    .select('*')
    .order('created_at', { ascending: false });

  if (error || !data || data.length === 0) {
    return getStoredArticles();
  }
  const mapped = data.map(mapArticleRowToItem);
  cacheLocally(STORAGE_KEYS.ARTICLES, mapped);
  return mapped;
}

export async function saveArticle(article: ArticleItem) {
  const list = getStoredArticles();
  const index = list.findIndex(a => a.id === article.id);
  if (index > -1) {
    list[index] = article;
  } else {
    list.unshift(article);
  }
  setStoredArticles(list);

  await apiMutate('articles', 'upsert', mapArticleItemToRow(article));
  notifyCrossTab('articles');
}

export async function deleteArticle(id: string) {
  const list = getStoredArticles().filter(a => a.id !== id);
  setStoredArticles(list);

  await apiMutate('articles', 'delete', undefined, id);
  notifyCrossTab('articles');
}

// ---------------- CLIENT REVIEWS ----------------
export function mapReviewRowToItem(row: any): ClientReview & { authorName: string; authorRole: string; company: string; feedback: string; verified: boolean } {
  const clientName = row.client_name || '';
  const clientTitle = row.client_title || '';
  const companyName = row.company_name || '';
  const quote = row.quote || '';
  const featured = Boolean(row.featured);

  return {
    id: row.id,
    clientName,
    clientTitle,
    companyName,
    companyLogo: row.company_logo || '',
    rating: Number(row.rating) || 5,
    projectTag: row.project_tag || '',
    quote,
    date: row.date || '',
    featured,
    authorName: clientName,
    authorRole: clientTitle,
    company: companyName,
    feedback: quote,
    verified: featured
  };
}

export function mapReviewItemToRow(r: any) {
  const clientName = r.clientName || r.authorName || '';
  const clientTitle = r.clientTitle || r.authorRole || '';
  const companyName = r.companyName || r.company || '';
  const quote = r.quote || r.feedback || '';
  const featured = r.featured ?? r.verified ?? false;

  // reviews table in Postgres does NOT have updated_at
  return {
    id: r.id,
    client_name: clientName,
    client_title: clientTitle,
    company_name: companyName,
    company_logo: r.companyLogo || '',
    rating: Number(r.rating) || 5,
    project_tag: r.projectTag || 'General Feedback',
    quote,
    date: r.date || new Date().toISOString().split('T')[0],
    featured: Boolean(featured),
  };
}

export function getStoredReviews(): ClientReview[] {
  if (!isClient()) return initialReviews;
  try {
    const data = localStorage.getItem(STORAGE_KEYS.REVIEWS);
    if (!data) return initialReviews;
    return JSON.parse(data);
  } catch (e) {
    return initialReviews;
  }
}

export function setStoredReviews(reviews: ClientReview[]) {
  cacheLocally(STORAGE_KEYS.REVIEWS, reviews);
  notifyLocal('reviews');
}

export async function fetchReviewsFromSupabase(): Promise<ClientReview[]> {
  const { data, error } = await supabase
    .from('reviews')
    .select('*')
    .order('created_at', { ascending: false });

  if (error || !data || data.length === 0) {
    return getStoredReviews();
  }
  const mapped = data.map(mapReviewRowToItem);
  cacheLocally(STORAGE_KEYS.REVIEWS, mapped);
  return mapped;
}

export async function saveReview(review: any) {
  const mappedItem = mapReviewRowToItem({
    id: review.id,
    client_name: review.clientName || review.authorName,
    client_title: review.clientTitle || review.authorRole,
    company_name: review.companyName || review.company,
    company_logo: review.companyLogo || '',
    rating: review.rating,
    project_tag: review.projectTag,
    quote: review.quote || review.feedback,
    date: review.date || 'Recent',
    featured: review.featured ?? review.verified ?? false
  });

  const list = getStoredReviews();
  const index = list.findIndex(r => r.id === review.id);
  if (index > -1) {
    list[index] = mappedItem;
  } else {
    list.unshift(mappedItem);
  }
  setStoredReviews(list);

  await apiMutate('reviews', 'upsert', mapReviewItemToRow(review));
  notifyCrossTab('reviews');
}

export async function deleteReview(id: string) {
  const list = getStoredReviews().filter(r => r.id !== id);
  setStoredReviews(list);

  await apiMutate('reviews', 'delete', undefined, id);
  notifyCrossTab('reviews');
}

// ---------------- RESERVATIONS / BOOKINGS ----------------
export function mapReservationRowToItem(row: any): BookingReservation {
  return {
    id: row.id,
    type: row.type,
    clientName: row.client_name,
    clientEmail: row.client_email,
    company: row.company || '',
    itemName: row.item_name,
    scheduledDate: row.scheduled_date,
    scheduledTime: row.scheduled_time,
    timezone: row.timezone,
    amount: row.amount,
    status: row.status,
    notes: row.notes || '',
    meetLink: row.meet_link || '',
    createdAt: row.created_at || new Date().toISOString()
  };
}

export function mapReservationItemToRow(r: BookingReservation) {
  return {
    id: r.id,
    type: r.type,
    package_id: r.type === 'package' ? 'pkg-lakehouse-build' : null,
    client_name: r.clientName,
    client_email: r.clientEmail,
    company: r.company || '',
    item_name: r.itemName,
    scheduled_date: r.scheduledDate,
    scheduled_time: r.scheduledTime,
    timezone: r.timezone,
    amount: r.amount,
    status: r.status,
    notes: r.notes || '',
    meet_link: r.meetLink || '',
    updated_at: new Date().toISOString()
  };
}

export function getStoredReservations(): BookingReservation[] {
  if (!isClient()) return initialReservations;
  try {
    const data = localStorage.getItem(STORAGE_KEYS.RESERVATIONS);
    if (!data) return initialReservations;
    return JSON.parse(data);
  } catch (e) {
    return initialReservations;
  }
}

export function setStoredReservations(reservations: BookingReservation[]) {
  cacheLocally(STORAGE_KEYS.RESERVATIONS, reservations);
  notifyLocal('reservations');
}

export async function fetchReservationsFromSupabase(): Promise<BookingReservation[]> {
  const { data, error } = await supabase
    .from('reservations')
    .select('*')
    .order('created_at', { ascending: false });

  if (error || !data || data.length === 0) {
    return getStoredReservations();
  }
  const mapped = data.map(mapReservationRowToItem);
  cacheLocally(STORAGE_KEYS.RESERVATIONS, mapped);
  return mapped;
}

export async function saveReservation(reservation: BookingReservation) {
  const list = getStoredReservations();
  const index = list.findIndex(r => r.id === reservation.id);
  if (index > -1) {
    list[index] = reservation;
  } else {
    list.unshift(reservation);
  }
  setStoredReservations(list);

  await apiMutate('reservations', 'upsert', mapReservationItemToRow(reservation));
  notifyCrossTab('reservations');
}

export async function updateReservationStatus(id: string, status: BookingReservation['status']) {
  const list = getStoredReservations();
  const item = list.find(r => r.id === id);
  if (item) {
    item.status = status;
    setStoredReservations(list);
  }

  await apiMutate('reservations', 'update', { status, updated_at: new Date().toISOString() }, id);
  notifyCrossTab('reservations');
}

export function deleteReservation(id: string) {
  const list = getStoredReservations().filter(r => r.id !== id);
  setStoredReservations(list);

  return apiMutate('reservations', 'delete', undefined, id).then(() => {
    notifyCrossTab('reservations');
  });
}

// ---------------- CERTIFICATIONS ----------------
export function mapCertRowToItem(row: any): CertificationItem & { date: string; order: number } {
  return {
    id: row.id,
    title: row.title,
    issuer: row.issuer,
    issuerLogo: row.issuer_logo || undefined,
    issueDate: row.issue_date,
    credentialId: row.credential_id || undefined,
    verificationUrl: row.verification_url || undefined,
    category: row.category,
    status: row.status,
    skills: row.skills || [],
    description: row.description || '',
    date: row.issue_date,
    order: row.display_order ?? 0
  };
}

export function mapCertItemToRow(c: any) {
  // certifications table in Postgres does NOT have updated_at
  return {
    id: c.id,
    title: c.title,
    issuer: c.issuer,
    issuer_logo: c.issuerLogo || '',
    issue_date: c.issueDate || c.date || new Date().getFullYear().toString(),
    credential_id: c.credentialId || '',
    verification_url: c.verificationUrl || '',
    category: c.category,
    status: c.status || 'Verified',
    skills: c.skills || [],
    description: c.description || '',
    display_order: c.order ?? c.display_order ?? 0,
  };
}

export function getStoredCertifications(): CertificationItem[] {
  if (!isClient()) return initialCertifications;
  try {
    const data = localStorage.getItem(STORAGE_KEYS.CERTIFICATIONS);
    if (!data) return initialCertifications;
    return JSON.parse(data);
  } catch (e) {
    return initialCertifications;
  }
}

export function setStoredCertifications(certs: CertificationItem[]) {
  cacheLocally(STORAGE_KEYS.CERTIFICATIONS, certs);
  notifyLocal('certifications');
}

export async function fetchCertificationsFromSupabase(): Promise<CertificationItem[]> {
  const { data, error } = await supabase
    .from('certifications')
    .select('*')
    .order('display_order', { ascending: true });

  if (error || !data || data.length === 0) {
    return getStoredCertifications();
  }
  const mapped = data.map(mapCertRowToItem);
  cacheLocally(STORAGE_KEYS.CERTIFICATIONS, mapped);
  return mapped;
}

export async function saveCertification(cert: any) {
  const item = mapCertRowToItem(mapCertItemToRow(cert));
  const list = getStoredCertifications();
  const index = list.findIndex(c => c.id === cert.id);
  if (index > -1) {
    list[index] = item;
  } else {
    list.unshift(item);
  }
  setStoredCertifications(list);

  await apiMutate('certifications', 'upsert', mapCertItemToRow(cert));
  notifyCrossTab('certifications');
}

export async function deleteCertification(id: string) {
  const list = getStoredCertifications().filter(c => c.id !== id);
  setStoredCertifications(list);

  await apiMutate('certifications', 'delete', undefined, id);
  notifyCrossTab('certifications');
}

// ---------------- EXPERIENCES ----------------
export function mapExpRowToItem(row: any): ExperienceItem {
  return {
    id: row.id,
    role: row.role,
    company: row.company,
    location: row.location,
    period: row.period,
    current: Boolean(row.current),
    type: row.type,
    summary: row.summary,
    highlights: row.highlights || [],
    metrics: row.metrics || [],
    technologies: row.technologies || [],
  };
}

export function mapExpItemToRow(e: ExperienceItem) {
  // experiences table in Postgres does NOT have updated_at
  return {
    id: e.id,
    role: e.role,
    company: e.company,
    location: e.location,
    period: e.period,
    current: Boolean(e.current),
    type: e.type,
    summary: e.summary,
    highlights: e.highlights || [],
    metrics: e.metrics || [],
    technologies: e.technologies || [],
  };
}

export function getStoredExperiences(): ExperienceItem[] {
  if (!isClient()) return initialExperiences;
  try {
    const data = localStorage.getItem(STORAGE_KEYS.EXPERIENCES);
    if (!data) return initialExperiences;
    return JSON.parse(data);
  } catch (e) {
    return initialExperiences;
  }
}

export function setStoredExperiences(experiences: ExperienceItem[]) {
  cacheLocally(STORAGE_KEYS.EXPERIENCES, experiences);
  notifyLocal('experiences');
}

export async function fetchExperiencesFromSupabase(): Promise<ExperienceItem[]> {
  const { data, error } = await supabase
    .from('experiences')
    .select('*')
    .order('display_order', { ascending: true });

  if (error || !data || data.length === 0) {
    return getStoredExperiences();
  }
  const mapped = data.map(mapExpRowToItem);
  cacheLocally(STORAGE_KEYS.EXPERIENCES, mapped);
  return mapped;
}

export async function saveExperience(exp: ExperienceItem) {
  const list = getStoredExperiences();
  const index = list.findIndex(e => e.id === exp.id);
  if (index > -1) {
    list[index] = exp;
  } else {
    list.unshift(exp);
  }
  setStoredExperiences(list);

  await apiMutate('experiences', 'upsert', mapExpItemToRow(exp));
  notifyCrossTab('experiences');
}

export async function deleteExperience(id: string) {
  const list = getStoredExperiences().filter(e => e.id !== id);
  setStoredExperiences(list);

  await apiMutate('experiences', 'delete', undefined, id);
  notifyCrossTab('experiences');
}

// ---------------- CRM LEADS & ACTIVITIES ----------------
export function mapCrmRowToLead(row: any, activities: CrmActivityLog[] = []): CrmLead & { contactName: string; notes: string; activityLog: any[] } {
  const clientName = row.client_name || '';
  const contactName = row.contact_name || clientName;
  const requirements = row.requirements || '';
  const notes = row.notes || requirements;

  return {
    id: row.id,
    clientName,
    contactName,
    company: row.company || '',
    email: row.email || '',
    phone: row.phone || '',
    stage: row.stage as CrmStage,
    engagementType: row.engagement_type || 'Distributed Lakehouse',
    dealValue: Number(row.deal_value) || 0,
    priority: (row.priority ? (row.priority.charAt(0).toUpperCase() + row.priority.slice(1).toLowerCase()) : 'Medium') as any,
    source: row.source || 'Website Intake',
    createdAt: row.created_at || new Date().toISOString(),
    lastContacted: row.last_contacted || new Date().toISOString(),
    requirements,
    notes,
    activities,
    activityLog: activities.map(a => ({
      id: a.id,
      timestamp: a.date,
      type: a.type.toLowerCase(),
      content: a.summary
    })),
    techInterests: row.tech_interests || [],
    nextFollowUp: row.next_follow_up || '',
  };
}

export function mapCrmLeadToRow(lead: any) {
  return {
    id: lead.id,
    client_name: lead.clientName || lead.contactName || '',
    contact_name: lead.contactName || lead.clientName || '',
    company: lead.company || '',
    email: lead.email || '',
    phone: lead.phone || '',
    stage: lead.stage || 'new',
    engagement_type: lead.engagementType || 'Strategic Advisory Retainer',
    deal_value: Number(lead.dealValue) || 0,
    priority: (lead.priority || 'medium').toLowerCase(),
    source: lead.source || 'Website Intake',
    requirements: lead.requirements || lead.notes || '',
    notes: lead.notes || lead.requirements || '',
    tech_interests: lead.techInterests || [],
    next_follow_up: lead.nextFollowUp || '',
    updated_at: new Date().toISOString()
  };
}

export function getStoredCrmLeads(): CrmLead[] {
  if (!isClient()) return initialCrmLeads;
  try {
    const data = localStorage.getItem(STORAGE_KEYS.CRM_LEADS);
    if (!data) return initialCrmLeads;
    return JSON.parse(data);
  } catch (e) {
    return initialCrmLeads;
  }
}

export function setStoredCrmLeads(leads: CrmLead[]) {
  cacheLocally(STORAGE_KEYS.CRM_LEADS, leads);
  notifyLocal('crm_leads');
}

export async function fetchCrmLeadsFromSupabase(): Promise<CrmLead[]> {
  if (isClient()) {
    try {
      const res = await fetch('/api/admin/mutate?table=crm_leads');
      if (res.ok) {
        const json = await res.json();
        if (json.data && Array.isArray(json.data) && json.data.length > 0) {
          const mapped = json.data.map((row: any) => {
            const rawActs = row.crm_activities || [];
            const activities: CrmActivityLog[] = rawActs.map((a: any) => ({
              id: a.id,
              date: a.date,
              type: a.type as any,
              summary: a.summary
            }));
            return mapCrmRowToLead(row, activities);
          });
          cacheLocally(STORAGE_KEYS.CRM_LEADS, mapped);
          return mapped;
        }
      }
    } catch (e) {
      // Fallback to direct client query below
    }
  }

  const { data: leadsData, error: leadError } = await supabase
    .from('crm_leads')
    .select('*, crm_activities(*)')
    .order('created_at', { ascending: false });

  if (leadError || !leadsData || leadsData.length === 0) {
    return getStoredCrmLeads();
  }

  const mapped = leadsData.map((row: any) => {
    const rawActs = row.crm_activities || [];
    const activities: CrmActivityLog[] = rawActs.map((a: any) => ({
      id: a.id,
      date: a.date,
      type: a.type as any,
      summary: a.summary
    }));
    return mapCrmRowToLead(row, activities);
  });

  cacheLocally(STORAGE_KEYS.CRM_LEADS, mapped);
  return mapped;
}

export async function saveCrmLead(lead: any) {
  const mapped = mapCrmRowToLead(mapCrmLeadToRow(lead), lead.activities || []);
  const list = getStoredCrmLeads();
  const index = list.findIndex(l => l.id === lead.id);
  if (index > -1) {
    list[index] = mapped;
  } else {
    list.unshift(mapped);
  }
  setStoredCrmLeads(list);

  await apiMutate('crm_leads', 'upsert', mapCrmLeadToRow(lead));

  if (lead.activities && lead.activities.length > 0) {
    const actRows = lead.activities.map((a: any) => ({
      id: a.id,
      lead_id: lead.id,
      date: a.date || new Date().toISOString().split('T')[0],
      type: a.type || 'Note',
      summary: a.summary || a.content || 'Activity logged',
      content: a.content || a.summary || ''
    }));
    await apiMutate('crm_activities', 'upsert', actRows);
  }

  notifyCrossTab('crm_leads');
}

export async function updateCrmStage(id: string, stage: CrmStage) {
  const list = getStoredCrmLeads();
  const item = list.find(l => l.id === id);
  if (item) {
    item.stage = stage;
    item.lastContacted = new Date().toISOString().split('T')[0];
    setStoredCrmLeads(list);
  }

  await apiMutate('crm_leads', 'update', {
    stage,
    last_contacted: new Date().toISOString(),
    updated_at: new Date().toISOString()
  }, id);

  notifyCrossTab('crm_leads');
}

export async function deleteCrmLead(id: string) {
  const list = getStoredCrmLeads().filter(l => l.id !== id);
  setStoredCrmLeads(list);

  await apiMutate('crm_leads', 'delete', undefined, id);
  notifyCrossTab('crm_leads');
}

// ---------------- CONTACT INQUIRIES ----------------
export async function submitContactInquiry(inquiry: {
  name: string;
  email: string;
  company?: string;
  focus: string;
  message: string;
}) {
  try {
    // 1. Insert into contact_inquiries via admin API
    await apiMutate('contact_inquiries', 'upsert', {
      id: `inq-${Date.now()}`,
      name: inquiry.name,
      email: inquiry.email,
      company: inquiry.company || '',
      focus: inquiry.focus,
      message: inquiry.message,
      created_at: new Date().toISOString()
    });

    // 2. Also automatically create a CRM lead for Islam's executive pipeline
    const leadId = `crm-inquiry-${Date.now()}`;
    const newLead: CrmLead = {
      id: leadId,
      clientName: inquiry.name,
      contactName: inquiry.name,
      company: inquiry.company || 'Enterprise Venture',
      email: inquiry.email,
      stage: 'new',
      engagementType: inquiry.focus === 'power-bi' ? 'Executive BI Telemetry'
        : inquiry.focus === 'ml-models' ? 'Machine Learning Systems'
        : inquiry.focus === 'data-engineering' ? 'Distributed Lakehouse'
        : 'Strategic Advisory Retainer',
      dealValue: 3500,
      priority: 'High' as any,
      source: 'Website Intake',
      createdAt: new Date().toISOString().split('T')[0],
      lastContacted: new Date().toISOString().split('T')[0],
      requirements: inquiry.message,
      notes: `Submitted focus: ${inquiry.focus}. Message: ${inquiry.message}`,
      activities: [
        {
          id: `act-${Date.now()}`,
          date: new Date().toISOString().split('T')[0],
          type: 'Note' as any,
          summary: `Website intake submission received for ${inquiry.focus}: "${inquiry.message.slice(0, 80)}..."`
        }
      ]
    };

    await saveCrmLead(newLead);
    return { success: true, lead: newLead };
  } catch (e: any) {
    console.error('Failed to submit contact inquiry:', e);
    return { success: false, error: e.message };
  }
}

// Global Reset
export async function resetAllDataToDefaults() {
  if (isClient()) {
    localStorage.clear();
    window.location.reload();
  }
}
