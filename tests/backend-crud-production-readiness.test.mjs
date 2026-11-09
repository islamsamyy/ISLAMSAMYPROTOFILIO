import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';

describe('Senior 15-Year Principal Architecture & Production Readiness Verification', () => {
  const rootDir = process.cwd();

  describe('1. Back-End Mutation API (/api/admin/mutate) Verification', () => {
    it('API.1: should verify allowed tables whitelist in mutation route', () => {
      const routeContent = fs.readFileSync(path.resolve(rootDir, 'src/app/api/admin/mutate/route.ts'), 'utf-8');
      const expectedTables = [
        'projects',
        'packages',
        'consultation_rates',
        'articles',
        'reviews',
        'reservations',
        'certifications',
        'experiences',
        'crm_leads',
        'crm_activities',
        'contact_inquiries',
      ];
      for (const table of expectedTables) {
        assert.ok(routeContent.includes(`'${table}'`), `Mutation route must allow table: ${table}`);
      }
    });

    it('API.2: should sanitize and strip updated_at from tables lacking that column', () => {
      const routeContent = fs.readFileSync(path.resolve(rootDir, 'src/app/api/admin/mutate/route.ts'), 'utf-8');
      assert.ok(routeContent.includes('tablesWithoutUpdatedAt'));
      assert.ok(routeContent.includes('reviews'));
      assert.ok(routeContent.includes('certifications'));
      assert.ok(routeContent.includes('experiences'));
      assert.ok(routeContent.includes('crm_activities'));
    });

    it('API.3: should support GET handler for authenticated service-role data retrieval', () => {
      const routeContent = fs.readFileSync(path.resolve(rootDir, 'src/app/api/admin/mutate/route.ts'), 'utf-8');
      assert.ok(routeContent.includes('export async function GET'));
      assert.ok(routeContent.includes("searchParams.get('table')"));
      assert.ok(routeContent.includes('crm_activities(*)'));
    });

    it('API.4: should validate required parameters for delete and update actions', () => {
      const routeContent = fs.readFileSync(path.resolve(rootDir, 'src/app/api/admin/mutate/route.ts'), 'utf-8');
      assert.ok(routeContent.includes("action === 'delete'"));
      assert.ok(routeContent.includes('Missing ID for delete'));
      assert.ok(routeContent.includes("action === 'update'"));
      assert.ok(routeContent.includes('Missing ID for update'));
    });
  });

  describe('2. Front-End Data Store Contract & Reliability', () => {
    const storeContent = fs.readFileSync(path.resolve(rootDir, 'src/lib/data-store.ts'), 'utf-8');

    it('STORE.1: should export all required CRUD mutation functions', () => {
      const requiredFunctions = [
        'saveProject',
        'deleteProject',
        'savePackage',
        'deletePackage',
        'saveConsultationRates',
        'saveArticle',
        'deleteArticle',
        'saveReview',
        'deleteReview',
        'saveReservation',
        'updateReservationStatus',
        'deleteReservation',
        'saveCertification',
        'deleteCertification',
        'saveExperience',
        'deleteExperience',
        'saveCrmLead',
        'updateCrmStage',
        'deleteCrmLead',
        'submitContactInquiry',
      ];
      for (const fn of requiredFunctions) {
        assert.ok(
          storeContent.includes(`function ${fn}`),
          `data-store must export function: ${fn}`
        );
      }
    });

    it('STORE.2: should guard fetch functions against blanking cache on empty database responses', () => {
      assert.ok(storeContent.includes('if (error || !data || data.length === 0)'));
    });

    it('STORE.3: should propagate error messages in apiMutate for user alerts', () => {
      assert.ok(storeContent.includes('lastError'));
      assert.ok(storeContent.includes('throw lastError'));
    });

    it('STORE.4: should support both local event dispatch and cross-tab broadcast', () => {
      assert.ok(storeContent.includes('islam_store_sync'));
      assert.ok(storeContent.includes('islam_store_bus'));
      assert.ok(storeContent.includes('notifyLocal'));
      assert.ok(storeContent.includes('notifyCrossTab'));
    });
  });

  describe('3. Admin Dashboard & Subpage Deep-Linking (?create=true)', () => {
    it('DASH.1: Command Center must provide deep-link create buttons', () => {
      const adminPageContent = fs.readFileSync(path.resolve(rootDir, 'src/app/admin/page.tsx'), 'utf-8');
      assert.ok(adminPageContent.includes('/admin/projects?create=true'));
      assert.ok(adminPageContent.includes('/admin/pricing?create=true'));
      assert.ok(adminPageContent.includes('/admin/blog?create=true'));
      assert.ok(adminPageContent.includes('/admin/crm?create=true'));
    });

    it('DASH.2: Projects CMS page must auto-open create modal on ?create=true', () => {
      const content = fs.readFileSync(path.resolve(rootDir, 'src/app/admin/projects/page.tsx'), 'utf-8');
      assert.ok(content.includes("params.get('create') === 'true'"));
      assert.ok(content.includes('startCreate()'));
    });

    it('DASH.3: Pricing CMS page must auto-open create modal on ?create=true', () => {
      const content = fs.readFileSync(path.resolve(rootDir, 'src/app/admin/pricing/page.tsx'), 'utf-8');
      assert.ok(content.includes("params.get('create') === 'true'"));
      assert.ok(content.includes('startCreatePkg()'));
    });

    it('DASH.4: Blog CMS page must auto-open create modal on ?create=true', () => {
      const content = fs.readFileSync(path.resolve(rootDir, 'src/app/admin/blog/page.tsx'), 'utf-8');
      assert.ok(content.includes("params.get('create') === 'true'"));
      assert.ok(content.includes('startCreate()'));
    });

    it('DASH.5: CRM Pipeline page must auto-open create modal on ?create=true', () => {
      const content = fs.readFileSync(path.resolve(rootDir, 'src/app/admin/crm/page.tsx'), 'utf-8');
      assert.ok(content.includes("params.get('create') === 'true'"));
      assert.ok(content.includes('openCreateModal()'));
    });

    it('DASH.6: Reviews CMS page must auto-open create modal on ?create=true', () => {
      const content = fs.readFileSync(path.resolve(rootDir, 'src/app/admin/reviews/page.tsx'), 'utf-8');
      assert.ok(content.includes("params.get('create') === 'true'"));
      assert.ok(content.includes('startCreate()'));
    });

    it('DASH.7: Certifications CMS page must auto-open create modal on ?create=true', () => {
      const content = fs.readFileSync(path.resolve(rootDir, 'src/app/admin/certifications/page.tsx'), 'utf-8');
      assert.ok(content.includes("params.get('create') === 'true'"));
      assert.ok(content.includes('openCreateModal()'));
    });

    it('DASH.8: Experience CMS page must auto-open create modal on ?create=true', () => {
      const content = fs.readFileSync(path.resolve(rootDir, 'src/app/admin/experience/page.tsx'), 'utf-8');
      assert.ok(content.includes("params.get('create') === 'true'"));
      assert.ok(content.includes('openCreateModal()'));
    });

    it('DASH.9: Reservations Console page must auto-open create modal on ?create=true', () => {
      const content = fs.readFileSync(path.resolve(rootDir, 'src/app/admin/reservations/page.tsx'), 'utf-8');
      assert.ok(content.includes("params.get('create') === 'true'"));
      assert.ok(content.includes('openCreateModal()'));
    });
  });

  describe('4. Front-End Public Site Dynamic Hook Integration', () => {
    it('FRONT.1: Home page must synchronize live packages and projects via hooks', () => {
      const homeContent = fs.readFileSync(path.resolve(rootDir, 'src/app/page.tsx'), 'utf-8');
      assert.ok(homeContent.includes('useProjects()'));
      assert.ok(homeContent.includes('usePricing()'));
      assert.ok(homeContent.includes('CertificationsSection'));
      assert.ok(homeContent.includes('ExperienceTimelineSection'));
      assert.ok(homeContent.includes('ClientReviewsSection'));
    });

    it('FRONT.2: Dedicated Pricing page must synchronize live packages and consultation rates', () => {
      const pricingContent = fs.readFileSync(path.resolve(rootDir, 'src/app/pricing/page.tsx'), 'utf-8');
      assert.ok(pricingContent.includes('usePricing()'));
      assert.ok(pricingContent.includes('consultationRates'));
    });

    it('FRONT.3: Dedicated Projects page must synchronize live projects', () => {
      const projectsContent = fs.readFileSync(path.resolve(rootDir, 'src/app/projects/page.tsx'), 'utf-8');
      assert.ok(projectsContent.includes('useProjects()'));
    });

    it('FRONT.4: Dedicated Blog page must synchronize live publications', () => {
      const blogContent = fs.readFileSync(path.resolve(rootDir, 'src/app/blog/page.tsx'), 'utf-8');
      assert.ok(blogContent.includes('useArticles()'));
    });

    it('FRONT.5: Dedicated Reviews page must synchronize live endorsements', () => {
      const reviewsContent = fs.readFileSync(path.resolve(rootDir, 'src/app/reviews/page.tsx'), 'utf-8');
      assert.ok(reviewsContent.includes('useReviews()'));
    });
  });
});
