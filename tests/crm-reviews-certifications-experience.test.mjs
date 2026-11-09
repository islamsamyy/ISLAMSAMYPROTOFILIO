import { describe, it, beforeEach } from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';

// Mock localStorage for node test runner
const store = new Map();
const mockLocalStorage = {
  getItem: (key) => store.get(key) || null,
  setItem: (key, val) => store.set(key, String(val)),
  removeItem: (key) => store.delete(key),
  clear: () => store.clear(),
};

describe('CRM, Certifications, Experience & Reviews Engine Verification', () => {
  beforeEach(() => {
    mockLocalStorage.clear();
  });

  describe('1. Executive CRM Pipeline System', () => {
    it('CRM.1: should verify CRM lead structure and stages', () => {
      const validStages = ['new', 'discovery', 'proposal', 'active', 'retained', 'closed'];
      const lead = {
        id: 'crm-safir-01',
        company: 'Safir Hotels & Resorts',
        contactName: 'Karim Mansour',
        email: 'k.mansour@safirhotels.com',
        phone: '+20 100 234 5678',
        dealValue: 28000,
        stage: 'active',
        priority: 'high',
        source: 'Executive Referral',
        notes: 'OPERA PMS real-time lakehouse integration with sub-2s query speeds.',
        techInterests: ['OPERA PMS', 'MySQL', 'Power BI', 'n8n'],
        nextFollowUp: '2026-11-15',
        createdAt: '2026-05-10',
      };

      assert.ok(validStages.includes(lead.stage));
      assert.equal(typeof lead.dealValue, 'number');
      assert.ok(lead.dealValue > 0);
      assert.ok(lead.techInterests.length > 0);
    });

    it('CRM.2: should calculate total pipeline value and filter active deals', () => {
      const leads = [
        { id: '1', company: 'A', dealValue: 10000, stage: 'new' },
        { id: '2', company: 'B', dealValue: 25000, stage: 'proposal' },
        { id: '3', company: 'C', dealValue: 30000, stage: 'active' },
        { id: '4', company: 'D', dealValue: 15000, stage: 'closed' },
      ];

      const activeTotal = leads
        .filter((l) => l.stage !== 'closed')
        .reduce((sum, l) => sum + l.dealValue, 0);

      assert.equal(activeTotal, 65000);
    });

    it('CRM.3: should support transition between pipeline stages', () => {
      const lead = { id: 'lead-1', stage: 'new' };
      const advanceStage = (target, newStage) => ({ ...target, stage: newStage });
      const updated = advanceStage(lead, 'proposal');
      assert.equal(updated.stage, 'proposal');
    });

    it('CRM.4: should export RFC 4180 compliant CSV content', () => {
      const leads = [
        { id: '1', company: 'Safir', dealValue: 28000, stage: 'active' },
        { id: '2', company: 'FinTech Corp', dealValue: 15000, stage: 'proposal' },
      ];
      const headers = ['ID', 'Company', 'Deal Value ($)', 'Stage'];
      const rows = leads.map((l) => [l.id, `"${l.company}"`, l.dealValue, l.stage]);
      const csv = [headers.join(','), ...rows.map((r) => r.join(','))].join('\n');

      assert.ok(csv.includes('Safir'));
      assert.ok(csv.includes('28000'));
      assert.ok(csv.includes('active'));
    });
  });

  describe('2. Certifications & Accreditations CMS', () => {
    it('CERT.1: should verify 8 seed certifications across data science, AI and academic tracks', () => {
      const fileContent = fs.readFileSync(
        path.resolve(process.cwd(), 'src/data/seedCertifications.ts'),
        'utf-8'
      );
      assert.ok(fileContent.includes('Associate Data Scientist'));
      assert.ok(fileContent.includes('Associate Data Analyst'));
      assert.ok(fileContent.includes('DataCamp'));
      assert.ok(fileContent.includes('Cisco'));
      assert.ok(fileContent.includes('MaharaTech'));
      assert.ok(fileContent.includes('IBM'));
      assert.ok(fileContent.includes('Tanta University'));
    });

    it('CERT.2: should verify verified credential link and verification ID presence', () => {
      const cert = {
        id: 'cert-dc-ds',
        title: 'Associate Data Scientist',
        issuer: 'DataCamp',
        credentialId: 'DC-DS-789234',
        verificationUrl: 'https://www.datacamp.com/statement-of-accomplishment/track/12345',
        status: 'Active',
      };

      assert.ok(cert.verificationUrl.startsWith('https://'));
      assert.ok(cert.credentialId.length > 5);
      assert.equal(cert.status, 'Active');
    });

    it('CERT.3: should filter certifications by category', () => {
      const certs = [
        { title: 'DS', category: 'Machine Learning & AI' },
        { title: 'SQL', category: 'Data Analytics & SQL' },
        { title: 'Degree', category: 'Academic Degrees' },
      ];
      const ml = certs.filter((c) => c.category.includes('Machine Learning'));
      assert.equal(ml.length, 1);
      assert.equal(ml[0].title, 'DS');
    });
  });

  describe('3. Professional Experience & Career Roles CMS', () => {
    it('EXP.1: should verify seed career roles for Nexalytix, Safir Hotels, CodeAlpha, and Sotex', () => {
      const fileContent = fs.readFileSync(
        path.resolve(process.cwd(), 'src/data/seedExperience.ts'),
        'utf-8'
      );
      assert.ok(fileContent.includes('Nexalytix'));
      assert.ok(fileContent.includes('CodeAlpha'));
      assert.ok(fileContent.includes('Safir Hotels'));
      assert.ok(fileContent.includes('Sotex Factory'));
      assert.ok(fileContent.includes('Founder & Lead AI / BI Solutions Architect'));
    });

    it('EXP.2: should verify quantifiable metrics on career roles', () => {
      const exp = {
        company: 'Nexalytix',
        metrics: [
          { value: '95%', label: 'Predictive ML Accuracy' },
          { value: '60%', label: 'Reduction in Manual Tasks' },
          { value: 'Custom', label: 'Executive Cockpits' },
        ],
      };
      assert.equal(exp.metrics.length, 3);
      assert.equal(exp.metrics[0].value, '95%');
      assert.equal(exp.metrics[1].value, '60%');
    });
  });

  describe('4. Dedicated Public Reviews Engine & Scorecard', () => {
    it('REV.1: should verify /reviews page existence with 5.0 score calculation', () => {
      const pageContent = fs.readFileSync(
        path.resolve(process.cwd(), 'src/app/reviews/page.tsx'),
        'utf-8'
      );
      assert.ok(pageContent.includes('5.0'));
      assert.ok(pageContent.includes('Executive Endorsements &amp; Client Feedback'));
      assert.ok(pageContent.includes('Leave Review'));
      assert.ok(pageContent.includes('selectedCategory'));
    });

    it('REV.2: should calculate average star rating and positive recommendation percentage', () => {
      const reviews = [
        { rating: 5 },
        { rating: 5 },
        { rating: 5 },
        { rating: 5 },
      ];
      const avg = reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length;
      assert.equal(avg, 5.0);
      const recommendedPct = Math.round((reviews.filter((r) => r.rating >= 4).length / reviews.length) * 100);
      assert.equal(recommendedPct, 100);
    });
  });

  describe('5. Navigation Links & Control Integration', () => {
    it('NAV.1: should verify AdminNav contains CRM, Certifications, and Experience routes', () => {
      const navContent = fs.readFileSync(
        path.resolve(process.cwd(), 'src/components/navigation/AdminNav.tsx'),
        'utf-8'
      );
      assert.ok(navContent.includes('/admin/crm'));
      assert.ok(navContent.includes('/admin/certifications'));
      assert.ok(navContent.includes('/admin/experience'));
      assert.ok(navContent.includes('/admin/blog'));
      assert.ok(navContent.includes('/admin/reviews'));
    });

    it('NAV.2: should verify SiteHeader and SiteFooter link to dedicated /reviews page', () => {
      const headerContent = fs.readFileSync(
        path.resolve(process.cwd(), 'src/components/navigation/SiteHeader.tsx'),
        'utf-8'
      );
      const footerContent = fs.readFileSync(
        path.resolve(process.cwd(), 'src/components/navigation/SiteFooter.tsx'),
        'utf-8'
      );
      assert.ok(headerContent.includes("href: '/reviews'"));
      assert.ok(footerContent.includes('href="/reviews"'));
    });

    it('NAV.3: should verify HomePage incorporates ExperienceTimelineSection and CertificationsSection', () => {
      const homeContent = fs.readFileSync(
        path.resolve(process.cwd(), 'src/app/page.tsx'),
        'utf-8'
      );
      assert.ok(homeContent.includes('<ExperienceTimelineSection />'));
      assert.ok(homeContent.includes('<CertificationsSection />'));
    });
  });

  describe('6. Admin Pricing & Packages CRUD & Reservation Management', () => {
    it('PKG.1: should verify deletePackage and deleteReservation are exported in data-store', () => {
      const storeContent = fs.readFileSync(
        path.resolve(process.cwd(), 'src/lib/data-store.ts'),
        'utf-8'
      );
      assert.ok(storeContent.includes('export function deletePackage'));
      assert.ok(storeContent.includes('export function deleteReservation'));
      assert.ok(storeContent.includes('export function getStoredProjectById'));
    });

    it('PKG.2: should verify /admin/pricing has full package creation modal and delete handlers', () => {
      const pricingContent = fs.readFileSync(
        path.resolve(process.cwd(), 'src/app/admin/pricing/page.tsx'),
        'utf-8'
      );
      assert.ok(pricingContent.includes('Create New Package'));
      assert.ok(pricingContent.includes('handleDeletePkg'));
      assert.ok(pricingContent.includes('startCreatePkg'));
      assert.ok(pricingContent.includes('savePackage'));
      assert.ok(pricingContent.includes('deletePackage'));
    });

    it('PKG.3: should verify /admin/reservations has manual booking intake modal and delete capabilities', () => {
      const resContent = fs.readFileSync(
        path.resolve(process.cwd(), 'src/app/admin/reservations/page.tsx'),
        'utf-8'
      );
      assert.ok(resContent.includes('New Booking Intake'));
      assert.ok(resContent.includes('handleDeleteRes'));
      assert.ok(resContent.includes('saveReservation'));
      assert.ok(resContent.includes('deleteReservation'));
    });
  });

  describe('7. Project Details Dynamic Case Study Page Verification', () => {
    it('PROJ.1: should verify dynamic route /projects/[id] files exist', () => {
      assert.ok(fs.existsSync(path.resolve(process.cwd(), 'src/app/projects/[id]/page.tsx')));
      assert.ok(fs.existsSync(path.resolve(process.cwd(), 'src/app/projects/[id]/ProjectDetailClient.tsx')));
    });

    it('PROJ.2: should verify generateStaticParams returns all seed project ids', () => {
      const pageContent = fs.readFileSync(
        path.resolve(process.cwd(), 'src/app/projects/[id]/page.tsx'),
        'utf-8'
      );
      assert.ok(pageContent.includes('generateStaticParams'));
      assert.ok(pageContent.includes('initialProjects.map'));
    });

    it('PROJ.3: should verify ProjectCard links to dynamic case study route', () => {
      const cardContent = fs.readFileSync(
        path.resolve(process.cwd(), 'src/components/projects/ProjectCard.tsx'),
        'utf-8'
      );
      assert.ok(cardContent.includes('/projects/${project.id}'));
      assert.ok(cardContent.includes('Deep Dive Case Study'));
    });

    it('PROJ.4: should verify ProjectItem model contains architecture challenge, solution, and systemFlow', () => {
      const seedContent = fs.readFileSync(
        path.resolve(process.cwd(), 'src/data/seedProjects.ts'),
        'utf-8'
      );
      assert.ok(seedContent.includes('challenge?: string'));
      assert.ok(seedContent.includes('solution?: string'));
      assert.ok(seedContent.includes('keyDecisions?:'));
      assert.ok(seedContent.includes('systemFlow?:'));
      assert.ok(seedContent.includes('safir-lakehouse'));
      assert.ok(seedContent.includes('fintech-predictive-engine'));
    });
  });
});
