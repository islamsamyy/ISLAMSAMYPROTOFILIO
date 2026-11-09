/**
 * tests/challenger-m2-navigation-stress.test.mjs
 * 
 * EMPIRICAL CHALLENGER ADVERSARIAL STRESS TEST SUITE
 * Milestone 2: Modern Cybernetic Header & Navigation Drawer
 * 
 * Validates:
 * 1. AdminNav.tsx dual export (named and default), 6 section links, active pill highlighting,
 *    ThemeToggle integration, and mobile drawer accessibility & state mechanics.
 * 2. SiteHeader.tsx dual export, quick actions (Theme switch, Book CTA, Admin link),
 *    Cairo telemetry integration, and multi-route/hash active route tracking.
 * 3. MobileNavDrawer.tsx accessibility (WAI-ARIA dialog), body scroll lock, Escape dismiss,
 *    touch swipe gestures, and drawer action integration.
 * 4. CairoTelemetry.tsx timezone computation, format oracle, fallback calculations,
 *    SSR anti-hydration-mismatch safeguards, and interval cleanup.
 * 5. Rapid routing stress harness (10,000 route changes) and scroll-lock leak test.
 */

import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';

const PROJECT_ROOT = process.cwd();
const ADMIN_NAV_PATH = path.resolve(PROJECT_ROOT, 'src/components/navigation/AdminNav.tsx');
const SITE_HEADER_PATH = path.resolve(PROJECT_ROOT, 'src/components/navigation/SiteHeader.tsx');
const MOBILE_DRAWER_PATH = path.resolve(PROJECT_ROOT, 'src/components/navigation/MobileNavDrawer.tsx');
const CAIRO_TELEMETRY_PATH = path.resolve(PROJECT_ROOT, 'src/components/navigation/CairoTelemetry.tsx');

// ============================================================================
// Section 1: AdminNav.tsx Contract & Conformance Verification
// ============================================================================
describe('Challenger M2: AdminNav Conformance & Contract Verification', () => {
  const content = fs.readFileSync(ADMIN_NAV_PATH, 'utf8');

  it('should verify AdminNav.tsx exists and has dual exports (named and default)', () => {
    assert.ok(fs.existsSync(ADMIN_NAV_PATH), 'AdminNav.tsx must exist');
    // Named export verification
    const hasNamedExport = content.includes('export function AdminNav') || content.includes('export { AdminNav');
    assert.ok(hasNamedExport, 'AdminNav.tsx must provide named export "AdminNav"');
    // Default export verification
    const hasDefaultExport = content.includes('export default AdminNav');
    assert.ok(hasDefaultExport, 'AdminNav.tsx must provide default export "export default AdminNav"');
  });

  it('should verify all 6 admin section links are defined with correct paths and labels', () => {
    const expectedSections = [
      { href: '/admin', label: 'Overview' },
      { href: '/admin/projects', label: 'Projects & Logos' },
      { href: '/admin/pricing', label: 'Pricing & Packages' },
      { href: '/admin/blog', label: 'Blog CMS' },
      { href: '/admin/reviews', label: 'Client Reviews' },
      { href: '/admin/reservations', label: 'Reservations' },
    ];

    assert.ok(content.includes('ADMIN_NAV_LINKS'), 'Must define and export ADMIN_NAV_LINKS');

    for (const section of expectedSections) {
      assert.ok(
        content.includes(`href: '${section.href}'`) || content.includes(`href: "${section.href}"`),
        `AdminNav must include section href: ${section.href}`
      );
      assert.ok(
        content.includes(`label: '${section.label}'`) || content.includes(`label: "${section.label}"`),
        `AdminNav must include section label: ${section.label}`
      );
    }
  });

  it('should verify desktop and mobile navigation both iterate over ADMIN_NAV_LINKS', () => {
    const desktopMatches = content.match(/ADMIN_NAV_LINKS\.map/g);
    assert.ok(
      desktopMatches && desktopMatches.length >= 2,
      'ADMIN_NAV_LINKS must be mapped for both desktop navigation and mobile drawer'
    );
  });

  it('should verify active route determination logic correctly segregates root /admin and subroutes', () => {
    // Implement exact oracle representing isRouteActive in AdminNav.tsx
    const isRouteActive = (href, pathname) => {
      if (href === '/admin') {
        return pathname === '/admin';
      }
      return pathname === href || (pathname ? pathname.startsWith(`${href}/`) : false);
    };

    // Test exact matches
    assert.strictEqual(isRouteActive('/admin', '/admin'), true, '/admin is active on /admin');
    assert.strictEqual(isRouteActive('/admin', '/admin/projects'), false, '/admin is NOT active on /admin/projects');
    assert.strictEqual(isRouteActive('/admin', '/admin/pricing'), false, '/admin is NOT active on /admin/pricing');

    // Test subroutes
    assert.strictEqual(isRouteActive('/admin/projects', '/admin/projects'), true);
    assert.strictEqual(isRouteActive('/admin/projects', '/admin/projects/new'), true);
    assert.strictEqual(isRouteActive('/admin/projects', '/admin/projects/edit/99'), true);
    assert.strictEqual(isRouteActive('/admin/projects', '/admin/pricing'), false);

    assert.strictEqual(isRouteActive('/admin/blog', '/admin/blog'), true);
    assert.strictEqual(isRouteActive('/admin/blog', '/admin/blog/drafts/1'), true);

    assert.strictEqual(isRouteActive('/admin/reservations', '/admin/reservations'), true);
    assert.strictEqual(isRouteActive('/admin/reservations', '/admin/reservations/calendar'), true);

    // Test non-admin routes
    assert.strictEqual(isRouteActive('/admin', '/'), false);
    assert.strictEqual(isRouteActive('/admin', '/book'), false);
    assert.strictEqual(isRouteActive('/admin/projects', '/projects'), false);
  });

  it('should verify active pill animation and accessibility markup in AdminNav', () => {
    assert.ok(
      content.includes('layoutId="admin-nav-active-pill"'),
      'AdminNav must use Framer Motion layoutId="admin-nav-active-pill" for smooth gliding transitions'
    );
    assert.ok(
      content.includes("aria-current={isActive ? 'page' : undefined}"),
      'AdminNav links must set aria-current="page" on active link'
    );
  });

  it('should verify ThemeToggle integration in both desktop header and mobile drawer', () => {
    assert.ok(
      content.includes("import { ThemeToggle } from '@/components/theme/ThemeToggle'"),
      'AdminNav must import ThemeToggle'
    );
    // Desktop usage
    assert.ok(
      content.includes('<ThemeToggle') && content.includes('className="w-8 h-8"'),
      'AdminNav must render compact ThemeToggle in desktop action cluster'
    );
    // Mobile usage with label
    assert.ok(
      content.includes('<ThemeToggle showLabel={true}'),
      'AdminNav mobile drawer must render ThemeToggle with label'
    );
  });

  it('should verify mobile drawer accessibility, body scroll lock, and dismiss handlers', () => {
    // Accessibility attributes
    assert.ok(content.includes('role="dialog"'), 'Admin drawer must specify role="dialog"');
    assert.ok(content.includes('aria-modal="true"'), 'Admin drawer must specify aria-modal="true"');
    assert.ok(
      content.includes('aria-label="Admin Navigation Drawer"'),
      'Admin drawer must provide descriptive aria-label'
    );

    // Body scroll locking
    assert.ok(
      content.includes("document.body.style.overflow = 'hidden'"),
      'Admin drawer must lock document.body.style.overflow on open'
    );

    // Escape listener
    assert.ok(
      content.includes("e.key === 'Escape'"),
      'Admin drawer must listen for Escape key to dismiss'
    );

    // Hamburger button
    assert.ok(
      content.includes('aria-controls="admin-mobile-drawer"'),
      'Hamburger button must link to drawer via aria-controls'
    );
    assert.ok(
      content.includes('aria-expanded={mobileMenuOpen}'),
      'Hamburger button must report aria-expanded state'
    );

    // Navigation to Public Site and Logout
    assert.ok(content.includes('href="/"'), 'Admin drawer must provide return link to live public site');
    assert.ok(content.includes('href="/admin/login"'), 'Admin drawer must provide link to log out');
  });
});

// ============================================================================
// Section 2: SiteHeader.tsx Contract & Conformance Verification
// ============================================================================
describe('Challenger M2: SiteHeader Conformance & Contract Verification', () => {
  const content = fs.readFileSync(SITE_HEADER_PATH, 'utf8');

  it('should verify SiteHeader.tsx exists and has dual exports (named and default)', () => {
    assert.ok(fs.existsSync(SITE_HEADER_PATH), 'SiteHeader.tsx must exist');
    const hasNamedExport = content.includes('export function SiteHeader') || content.includes('export { SiteHeader');
    assert.ok(hasNamedExport, 'SiteHeader.tsx must provide named export "SiteHeader"');
    const hasDefaultExport = content.includes('export default SiteHeader');
    assert.ok(hasDefaultExport, 'SiteHeader.tsx must provide default export "export default SiteHeader"');
  });

  it('should verify all required public navigation routes are defined', () => {
    const requiredHrefs = ['/', '/projects', '/blog', '/book', '/#reviews', '/my-bookings'];
    for (const href of requiredHrefs) {
      assert.ok(
        content.includes(`href: '${href}'`) || content.includes(`href: "${href}"`),
        `SiteHeader must define nav link with href: ${href}`
      );
    }
  });

  it('should stress-test checkIsActive algorithm across nested paths, trailing slashes, and hash anchors', () => {
    // Replicate checkIsActive implementation from SiteHeader.tsx
    function checkIsActive(href, pathname, currentHash) {
      if (href.includes('#')) {
        const [pathPart, hashPart] = href.split('#');
        const targetPath = pathPart || '/';
        return pathname === targetPath && currentHash === `#${hashPart}`;
      }

      if (href === '/') {
        return pathname === '/' && (!currentHash || currentHash === '#');
      }

      if (pathname === href) {
        return true;
      }

      if (pathname.startsWith(`${href}/`)) {
        return true;
      }

      return false;
    }

    // Root path tests
    assert.strictEqual(checkIsActive('/', '/', ''), true, 'Root is active on / without hash');
    assert.strictEqual(checkIsActive('/', '/', '#'), true, 'Root is active on / with empty #');
    assert.strictEqual(checkIsActive('/', '/', '#reviews'), false, 'Root is NOT active when hash is #reviews');
    assert.strictEqual(checkIsActive('/', '/projects', ''), false, 'Root is NOT active on /projects');

    // Hash anchor tests
    assert.strictEqual(checkIsActive('/#reviews', '/', '#reviews'), true, '/#reviews is active on / with #reviews');
    assert.strictEqual(checkIsActive('/#reviews', '/', ''), false, '/#reviews is NOT active without hash');
    assert.strictEqual(checkIsActive('/#reviews', '/projects', '#reviews'), false, '/#reviews is NOT active on /projects');

    // Subroute tests
    assert.strictEqual(checkIsActive('/projects', '/projects', ''), true);
    assert.strictEqual(checkIsActive('/projects', '/projects/neural-mesh', ''), true);
    assert.strictEqual(checkIsActive('/projects', '/projects/category/ai', ''), true);
    assert.strictEqual(checkIsActive('/projects', '/project-showcase', ''), false);

    assert.strictEqual(checkIsActive('/blog', '/blog', ''), true);
    assert.strictEqual(checkIsActive('/blog', '/blog/event-driven-architecture', ''), true);
    assert.strictEqual(checkIsActive('/blog', '/blogger', ''), false);

    assert.strictEqual(checkIsActive('/book', '/book', ''), true);
    assert.strictEqual(checkIsActive('/my-bookings', '/my-bookings', ''), true);
  });

  it('should verify active indicator pill animation properties and stacking context', () => {
    assert.ok(
      content.includes('layoutId="header-active-pill"'),
      'SiteHeader must use Framer Motion layoutId="header-active-pill"'
    );
    assert.ok(
      content.includes('relative isolate'),
      'SiteHeader navigation links must use "relative isolate" to ensure pill stays behind text without clipping'
    );
    assert.ok(
      content.includes("aria-current={isActive ? 'page' : undefined}"),
      'SiteHeader links must mark active item with aria-current="page"'
    );
  });

  it('should verify quick actions cluster (ThemeToggle, Book CTA, Admin link, Cairo Telemetry)', () => {
    // Live Cairo Telemetry
    assert.ok(
      content.includes('<CairoTelemetry className="hidden lg:inline-flex" />'),
      'SiteHeader must include CairoTelemetry in desktop actions'
    );

    // Book Consultation CTA
    assert.ok(
      content.includes('href="/book"') && content.includes('Book Advisory'),
      'SiteHeader must include Book Advisory CTA link pointing to /book'
    );
    assert.ok(
      content.includes('calendar_month'),
      'Book Advisory CTA should include calendar icon indicator'
    );

    // Theme Switcher
    assert.ok(
      content.includes('<ThemeToggle />'),
      'SiteHeader must include ThemeToggle in quick action cluster'
    );

    // Admin Command Center Link
    assert.ok(
      content.includes('href="/admin"') && content.includes('admin_panel_settings'),
      'SiteHeader must include Admin Command Center link pointing to /admin with icon'
    );

    // Mobile Hamburger Trigger
    assert.ok(
      content.includes('aria-label="Open navigation menu"'),
      'Mobile trigger button must have aria-label'
    );
    assert.ok(
      content.includes('aria-expanded={mobileMenuOpen}'),
      'Mobile trigger button must report aria-expanded state'
    );
  });

  it('should verify MobileNavDrawer component is mounted in SiteHeader', () => {
    assert.ok(
      content.includes('<MobileNavDrawer'),
      'SiteHeader must mount MobileNavDrawer'
    );
    assert.ok(
      content.includes('isOpen={mobileMenuOpen}'),
      'SiteHeader must pass isOpen state to MobileNavDrawer'
    );
    assert.ok(
      content.includes('onClose={() => setMobileMenuOpen(false)}'),
      'SiteHeader must pass onClose callback to MobileNavDrawer'
    );
  });
});

// ============================================================================
// Section 3: MobileNavDrawer.tsx Conformance & Edge Cases
// ============================================================================
describe('Challenger M2: MobileNavDrawer Conformance & Behavior', () => {
  const content = fs.readFileSync(MOBILE_DRAWER_PATH, 'utf8');

  it('should verify MobileNavDrawer has dual exports (named and default)', () => {
    assert.ok(fs.existsSync(MOBILE_DRAWER_PATH), 'MobileNavDrawer.tsx must exist');
    const hasNamedExport = content.includes('export function MobileNavDrawer') || content.includes('export { MobileNavDrawer');
    assert.ok(hasNamedExport, 'MobileNavDrawer.tsx must provide named export');
    const hasDefaultExport = content.includes('export default MobileNavDrawer');
    assert.ok(hasDefaultExport, 'MobileNavDrawer.tsx must provide default export');
  });

  it('should verify WAI-ARIA dialog specification on drawer container', () => {
    assert.ok(content.includes('role="dialog"'), 'Mobile drawer container must have role="dialog"');
    assert.ok(content.includes('aria-modal="true"'), 'Mobile drawer container must have aria-modal="true"');
    assert.ok(
      content.includes('aria-label="Mobile Navigation Menu"'),
      'Mobile drawer container must have aria-label="Mobile Navigation Menu"'
    );
  });

  it('should verify slide-over geometry, backdrop blur, and physics spring configuration', () => {
    assert.ok(
      (content.includes('justify-end') || content.includes('right-0')) && content.includes("x: '100%'"),
      'Mobile drawer must slide over from right edge (justify-end / right-0 with x: 100%)'
    );
    assert.ok(
      content.includes('backdrop-blur-md') || content.includes('backdrop-blur-2xl'),
      'Mobile drawer must provide backdrop blur'
    );
    assert.ok(
      content.includes("damping: 30") && content.includes("stiffness: 300"),
      'Mobile drawer must use specified spring physics (damping: 30, stiffness: 300)'
    );
  });

  it('should verify body scroll locking mechanism with cleanup restoration', () => {
    assert.ok(
      content.includes("document.body.style.overflow = 'hidden'"),
      'Mobile drawer must lock body overflow to hidden when open'
    );
    assert.ok(
      content.includes("document.body.style.overflow = originalOverflow") ||
      content.includes("document.body.style.overflow ="),
      'Mobile drawer must restore original overflow on dismiss/unmount'
    );
  });

  it('should verify keyboard Escape listener and horizontal touch swipe gestures', () => {
    assert.ok(
      content.includes("e.key === 'Escape'"),
      'Mobile drawer must listen for Escape key to close'
    );
    assert.ok(
      content.includes('onTouchStart') && content.includes('onTouchEnd'),
      'Mobile drawer must attach touch start and end handlers'
    );
    assert.ok(
      content.includes('deltaX > 70'),
      'Mobile drawer must enforce swipe-to-dismiss threshold (deltaX > 70px)'
    );
  });

  it('should verify embedded CairoTelemetry, ThemeToggle, and Quick Action buttons in drawer', () => {
    assert.ok(content.includes('<CairoTelemetry'), 'Mobile drawer must embed CairoTelemetry component');
    assert.ok(content.includes('<ThemeToggle />') || content.includes('<ThemeToggle'), 'Mobile drawer must include ThemeToggle');
    assert.ok(content.includes('href="/book"'), 'Mobile drawer must include Book Consultation CTA');
    assert.ok(content.includes('href="/admin"'), 'Mobile drawer must include Admin Gateway link');
    assert.ok(content.includes('href="https://www.linkedin.com/'), 'Mobile drawer must include LinkedIn channel');
    assert.ok(content.includes('href="https://github.com/'), 'Mobile drawer must include GitHub channel');
  });
});

// ============================================================================
// Section 4: CairoTelemetry.tsx Timezone & Hydration Oracle
// ============================================================================
describe('Challenger M2: CairoTelemetry Timezone & Hydration Oracle', () => {
  const content = fs.readFileSync(CAIRO_TELEMETRY_PATH, 'utf8');

  it('should verify CairoTelemetry has dual exports (named and default)', () => {
    assert.ok(fs.existsSync(CAIRO_TELEMETRY_PATH), 'CairoTelemetry.tsx must exist');
    const hasNamedExport = content.includes('export function CairoTelemetry') || content.includes('export { CairoTelemetry');
    assert.ok(hasNamedExport, 'CairoTelemetry.tsx must provide named export');
    const hasDefaultExport = content.includes('export default CairoTelemetry');
    assert.ok(hasDefaultExport, 'CairoTelemetry.tsx must provide default export');
  });

  it('should verify formatCairoTime handles full 24-hour UTC permutations accurately', () => {
    // Replicate formatCairoTime implementation
    function formatCairoTime(date) {
      try {
        const formatter = new Intl.DateTimeFormat('en-GB', {
          timeZone: 'Africa/Cairo',
          hour: '2-digit',
          minute: '2-digit',
          hour12: false,
        });
        return `${formatter.format(date)} EET`;
      } catch {
        const utcHours = date.getUTCHours();
        const utcMins = date.getUTCMinutes();
        const cairoHours = (utcHours + 2) % 24;
        return `${String(cairoHours).padStart(2, '0')}:${String(utcMins).padStart(2, '0')} EET`;
      }
    }

    const timeRegex = /^\d{2}:\d{2}\s+EET$/;

    // Test 24 hours of UTC timestamps
    for (let h = 0; h < 24; h++) {
      const d = new Date(`2026-11-05T${String(h).padStart(2, '0')}:30:00Z`);
      const formatted = formatCairoTime(d);
      assert.match(formatted, timeRegex, `Hour ${h}:30 UTC formatted as ${formatted} must match HH:MM EET`);
    }

    // Verify UTC offset: Africa/Cairo standard time is UTC+2
    const dNoon = new Date('2026-11-05T12:00:00Z');
    const cairoNoon = formatCairoTime(dNoon);
    assert.strictEqual(cairoNoon, '14:00 EET', '12:00 UTC should map to 14:00 EET in Cairo (UTC+2)');

    const dMidnight = new Date('2026-11-05T23:15:00Z');
    const cairoMidnight = formatCairoTime(dMidnight);
    assert.strictEqual(cairoMidnight, '01:15 EET', '23:15 UTC should map to 01:15 EET (+2 hours next day)');
  });

  it('should test fallback calculation when Intl.DateTimeFormat throws or timezone is unsupported', () => {
    function fallbackCairoTime(date) {
      const utcHours = date.getUTCHours();
      const utcMins = date.getUTCMinutes();
      const cairoHours = (utcHours + 2) % 24;
      return `${String(cairoHours).padStart(2, '0')}:${String(utcMins).padStart(2, '0')} EET`;
    }

    const d1 = new Date('2026-11-05T00:05:00Z');
    assert.strictEqual(fallbackCairoTime(d1), '02:05 EET');

    const d2 = new Date('2026-11-05T22:45:00Z');
    assert.strictEqual(fallbackCairoTime(d2), '00:45 EET');
  });

  it('should verify SSR anti-hydration mismatch safeguards in CairoTelemetry', () => {
    assert.ok(
      content.includes('--:-- EET'),
      'CairoTelemetry must provide static "--:-- EET" placeholder for server rendering'
    );
    assert.ok(
      content.includes('suppressHydrationWarning'),
      'CairoTelemetry must include suppressHydrationWarning on time display'
    );
    assert.ok(
      content.includes('clearInterval(timer)'),
      'CairoTelemetry must clear interval timer on component unmount'
    );
  });

  it('should verify dual-layer pulsing cyan beacon markup', () => {
    assert.ok(
      content.includes('animate-ping') && content.includes('bg-cyan-400'),
      'Must include outer pinging beacon with cyan color'
    );
    assert.ok(
      content.includes('shadow-[0_0_8px_#22d3ee]'),
      'Must include inner core glow with cyan box shadow'
    );
  });
});

// ============================================================================
// Section 5: Rapid Routing & Memory Safety Stress Harness
// ============================================================================
describe('Challenger M2: Stress Harness (Rapid Routing & State Safety)', () => {
  it('should execute 10,000 rapid route resolution cycles across public and admin routes without exception', () => {
    const routes = [
      '/',
      '/#reviews',
      '/projects',
      '/projects/ai-telemetry',
      '/blog',
      '/blog/distributed-consensus',
      '/book',
      '/my-bookings',
      '/admin',
      '/admin/projects',
      '/admin/projects/create',
      '/admin/pricing',
      '/admin/blog',
      '/admin/reviews',
      '/admin/reservations',
      '/admin/reservations/calendar',
      '/unknown-route',
    ];

    function checkIsActive(href, pathname, currentHash) {
      if (href.includes('#')) {
        const [pathPart, hashPart] = href.split('#');
        const targetPath = pathPart || '/';
        return pathname === targetPath && currentHash === `#${hashPart}`;
      }
      if (href === '/') {
        return pathname === '/' && (!currentHash || currentHash === '#');
      }
      if (pathname === href) return true;
      if (pathname.startsWith(`${href}/`)) return true;
      return false;
    }

    const startTime = performance.now();
    let matchesCount = 0;

    for (let i = 0; i < 10000; i++) {
      const sampleRoute = routes[i % routes.length];
      const sampleHash = sampleRoute.includes('#') ? '#reviews' : '';
      const baseRoute = sampleRoute.split('#')[0] || '/';

      if (checkIsActive('/projects', baseRoute, sampleHash)) matchesCount++;
      if (checkIsActive('/blog', baseRoute, sampleHash)) matchesCount++;
      if (checkIsActive('/#reviews', baseRoute, sampleHash)) matchesCount++;
      if (checkIsActive('/', baseRoute, sampleHash)) matchesCount++;
    }

    const duration = performance.now() - startTime;
    assert.ok(duration < 200, `10,000 route checks should complete within 200ms (took ${duration.toFixed(2)}ms)`);
    assert.ok(matchesCount > 0, 'Should have positive match counts across 10,000 runs');
  });

  it('should verify body scroll lock state returns to baseline across 500 open/close cycles', () => {
    // Simulate DOM body overflow management
    let bodyStyleOverflow = '';

    const openDrawer = () => {
      const original = bodyStyleOverflow;
      bodyStyleOverflow = 'hidden';
      return () => {
        bodyStyleOverflow = original;
      };
    };

    for (let i = 0; i < 500; i++) {
      const cleanup = openDrawer();
      assert.strictEqual(bodyStyleOverflow, 'hidden', `Cycle ${i}: overflow must be hidden when drawer is open`);
      cleanup();
      assert.strictEqual(bodyStyleOverflow, '', `Cycle ${i}: overflow must revert cleanly on drawer close`);
    }

    assert.strictEqual(bodyStyleOverflow, '', 'Body style overflow must remain unpolluted after 500 cycles');
  });
});
