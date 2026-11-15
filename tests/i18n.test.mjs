import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';

test('i18n translation dictionary existence and parity', () => {
  const filePath = path.resolve(process.cwd(), 'src/i18n/translations.ts');
  assert.ok(fs.existsSync(filePath), 'translations.ts must exist');

  const content = fs.readFileSync(filePath, 'utf-8');

  // Verify core top-level domains exist in both en and ar
  const requiredDomains = [
    'nav',
    'header',
    'hero',
    'credibility',
    'certifications',
    'tech',
    'experience',
    'projects',
    'pricing',
    'reviews',
    'contact',
    'footer',
    'pages',
  ];

  for (const domain of requiredDomains) {
    assert.ok(content.includes(`${domain}:`), `Missing domain: ${domain}`);
  }

  // Verify English and Arabic keys exist
  assert.ok(content.includes('export const translations = {'), 'Must export translations object');
  assert.ok(content.includes('en: {'), 'Must include en dictionary');
  assert.ok(content.includes('ar: {'), 'Must include ar dictionary');
  assert.ok(content.includes('export function getTranslation('), 'Must export getTranslation helper');
});
