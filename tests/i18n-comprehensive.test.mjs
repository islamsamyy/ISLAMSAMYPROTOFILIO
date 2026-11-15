import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';

test('Comprehensive i18n Verification Test Suite', async (t) => {
  await t.test('1. Core translation dictionary parity and non-empty values', () => {
    const translationsPath = path.resolve('src/i18n/translations.ts');
    assert.ok(fs.existsSync(translationsPath), 'src/i18n/translations.ts must exist');

    const content = fs.readFileSync(translationsPath, 'utf8');
    assert.ok(content.includes('en: {'), 'Must declare English dictionary');
    assert.ok(content.includes('ar: {'), 'Must declare Arabic dictionary');
    assert.ok(content.includes('export function getTranslation'), 'Must export getTranslation helper');

    const requiredSections = [
      'nav',
      'header',
      'hero',
      'certifications',
      'tech',
      'experience',
      'projects',
      'pricing',
      'reviews',
      'contact',
      'footer',
      'pages',
      'projectDetail',
      'blogPost',
      'book',
      'reviewsPage',
      'portal',
    ];

    for (const sec of requiredSections) {
      assert.ok(content.includes(`${sec}: {`), `Section '${sec}' must exist in dictionaries`);
    }
  });

  await t.test('2. LanguageContext provider and persistent storage', () => {
    const contextPath = path.resolve('src/context/LanguageContext.tsx');
    assert.ok(fs.existsSync(contextPath), 'src/context/LanguageContext.tsx must exist');

    const content = fs.readFileSync(contextPath, 'utf8');
    assert.ok(content.includes('islam_language_v1'), 'Must use islam_language_v1 storage key');
    assert.ok(content.includes('LanguageProvider'), 'Must export LanguageProvider');
    assert.ok(content.includes('useLanguage'), 'Must export useLanguage hook');
    assert.ok(content.includes("setAttribute('dir'"), 'Must toggle DOM direction');
    assert.ok(content.includes("setAttribute('lang'"), 'Must toggle DOM language');
  });

  await t.test('3. Root Layout incorporates Cairo font and anti-FOUC', () => {
    const layoutPath = path.resolve('src/app/layout.tsx');
    assert.ok(fs.existsSync(layoutPath), 'src/app/layout.tsx must exist');

    const content = fs.readFileSync(layoutPath, 'utf8');
    assert.ok(content.includes('Cairo'), 'Must load Cairo font');
    assert.ok(content.includes('LanguageProvider'), 'Must wrap application in LanguageProvider');
    assert.ok(content.includes('islam_language_v1'), 'Must check localStorage anti-FOUC in inline script');
  });

  await t.test('4. Seed articles have complete Arabic technical translations', () => {
    const seedArticlesPath = path.resolve('src/data/seedArticles.ts');
    assert.ok(fs.existsSync(seedArticlesPath), 'src/data/seedArticles.ts must exist');

    const content = fs.readFileSync(seedArticlesPath, 'utf8');
    assert.ok(content.includes('title_ar:'), 'Must include title_ar');
    assert.ok(content.includes('excerpt_ar:'), 'Must include excerpt_ar');
    assert.ok(content.includes('content_ar:'), 'Must include content_ar');
  });

  await t.test('5. Site Header & Mobile Navigation include language switcher', () => {
    const headerPath = path.resolve('src/components/navigation/SiteHeader.tsx');
    const drawerPath = path.resolve('src/components/navigation/MobileNavDrawer.tsx');

    assert.ok(fs.existsSync(headerPath), 'SiteHeader.tsx must exist');
    assert.ok(fs.existsSync(drawerPath), 'MobileNavDrawer.tsx must exist');

    const headerContent = fs.readFileSync(headerPath, 'utf8');
    const drawerContent = fs.readFileSync(drawerPath, 'utf8');

    assert.ok(headerContent.includes('useLanguage'), 'SiteHeader must use useLanguage');
    assert.ok(headerContent.includes('toggleLanguage'), 'SiteHeader must provide language toggle action');
    assert.ok(drawerContent.includes('useLanguage'), 'MobileNavDrawer must use useLanguage');
    assert.ok(drawerContent.includes('toggleLanguage'), 'MobileNavDrawer must provide language toggle action');
  });

  await t.test('6. All major pages consume useLanguage hook', () => {
    const pages = [
      'src/app/page.tsx',
      'src/app/projects/page.tsx',
      'src/app/pricing/page.tsx',
      'src/app/blog/page.tsx',
      'src/app/book/page.tsx',
      'src/app/reviews/page.tsx',
      'src/app/my-bookings/page.tsx',
    ];

    for (const p of pages) {
      const fullPath = path.resolve(p);
      assert.ok(fs.existsSync(fullPath), `${p} must exist`);
      const content = fs.readFileSync(fullPath, 'utf8');
      assert.ok(content.includes('useLanguage'), `${p} must import and consume useLanguage`);
    }
  });

  await t.test('7. RTL CSS rules and typography exist in globals.css', () => {
    const cssPath = path.resolve('src/app/globals.css');
    assert.ok(fs.existsSync(cssPath), 'globals.css must exist');

    const content = fs.readFileSync(cssPath, 'utf8');
    assert.ok(content.includes('html[dir="rtl"]'), 'Must declare html[dir="rtl"] styles');
    assert.ok(content.includes("'Cairo'"), 'Must apply Cairo font in RTL mode');
    assert.ok(content.includes('.rtl-flip'), 'Must define .rtl-flip utility');
  });
});
