/**
 * tests/runner.mjs
 * 
 * Central Test Runner for Islam Samy Portfolio Showcase Overhaul
 * Executes Tiers 1-4 opaque-box test suites:
 * - Tier 1: Feature Coverage (105 tests across F1-F21)
 * - Tier 2: Boundary & Corner Cases (105 tests across F1-F21)
 * - Tier 3: Cross-Feature Combinations (20 pairwise tests)
 * - Tier 4: Real-World Application Scenarios (6 E2E workflow tests)
 * Total: 236 comprehensive automated test cases.
 */

import { run } from 'node:test';
import { spec } from 'node:test/reporters';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));

const testFiles = [
  resolve(__dirname, 'tier1-feature-coverage.test.mjs'),
  resolve(__dirname, 'tier2-boundary-corner.test.mjs'),
  resolve(__dirname, 'tier3-cross-feature.test.mjs'),
  resolve(__dirname, 'tier4-application-scenarios.test.mjs'),
  resolve(__dirname, 'crm-reviews-certifications-experience.test.mjs'),
  resolve(__dirname, 'backend-crud-production-readiness.test.mjs'),
];

console.log('================================================================');
console.log('  ISLAM SAMY PORTFOLIO SHOWCASE OVERHAUL — E2E TEST RUNNER');
console.log('================================================================');
console.log(`Discovered ${testFiles.length} Test Suites:`);
console.log('  [Tier 1] Feature Coverage (F1-F21 Happy Paths): >=105 tests');
console.log('  [Tier 2] Boundary & Corner Cases:              >=105 tests');
console.log('  [Tier 3] Cross-Feature Combinations:             20 tests');
console.log('  [Tier 4] Real-World Application Scenarios:        6 tests');
console.log('----------------------------------------------------------------\n');

let passCount = 0;
let failCount = 0;
let skipCount = 0;

const stream = run({
  files: testFiles,
  concurrency: 1,
});

stream.on('test:pass', () => { passCount++; });
stream.on('test:fail', () => { failCount++; });
stream.on('test:skip', () => { skipCount++; });

stream.compose(new spec()).pipe(process.stdout);

stream.on('end', () => {
  console.log('\n================================================================');
  console.log('                   E2E TEST SUITE SUMMARY');
  console.log('================================================================');
  console.log(`  Total Tests Run: ${passCount + failCount + skipCount}`);
  console.log(`  Passed:          ${passCount}`);
  console.log(`  Failed:          ${failCount}`);
  console.log(`  Skipped:         ${skipCount}`);
  console.log('----------------------------------------------------------------');
  if (failCount === 0) {
    console.log('  STATUS:          SUCCESS — 100% PASS RATE');
    console.log('  VERDICT:         TEST SUITE READY FOR VALIDATION (M5)');
  } else {
    console.log('  STATUS:          FAILURE — INVESTIGATE DEFECTS');
  }
  console.log('================================================================\n');

  if (failCount > 0) {
    process.exit(1);
  }
});
