# Test Infrastructure Specification (TEST_INFRA.md)

**Project**: Islam Samy Executive Portfolio Showcase Overhaul  
**Target Directory**: `c:\Users\Eslam\Desktop\islamweb`  
**Authoritative Source**: `c:\Users\Eslam\Desktop\islamweb\.agents\teamwork\ORIGINAL_REQUEST.md` & `PROJECT.md`  
**Test Harness Philosophy**: Opaque-box, requirement-driven, zero-external-dependency automated test harness.

---

## 1. Test Architecture & Runtime Framework

The test harness leverages the **Node.js Built-in Test Runner** (`node:test`, `node:assert/strict`, `node:test/reporters`).

### 1.1 Key Architectural Strengths
- **Zero-Dependency Footprint**: Native to Node.js 20+; requires no external test framework binaries, transpilers, or browser binary installations.
- **Blazing Execution Speed**: All 236 test cases execute in <1.5 seconds.
- **Strict Opaque-Box Isolation**: Exercises the system via public APIs, DOM interfaces, reactive events (`islam_store_sync`), and storage mechanisms without coupling to private component implementations.
- **Standardized Reporting**: Native TAP and Spec reporter outputs compatible with local execution and CI/CD pipelines.

---

## 2. 4-Tier Test Taxonomy

| Tier | Name | Target Scope | Minimum Requirement | Implemented Tests |
|---|---|---|---|---|
| **Tier 1** | **Feature Coverage** | Primary happy-path contracts across features F1 through F21 | >= 5 tests per feature (105 min) | **105 tests** |
| **Tier 2** | **Boundary & Corner Cases** | Edge values, empty datasets, negative inputs, rapid state toggling, boundary overflows across F1 through F21 | >= 5 tests per feature (105 min) | **105 tests** |
| **Tier 3** | **Cross-Feature Combinations** | Pairwise combinatorial interactions between theme, navigation, canvas RAF, data store sync, and modal primitives | Pairwise interaction coverage | **20 tests** |
| **Tier 4** | **Real-World Application Scenarios** | Multi-step end-to-end user journeys (booking, theme switching, admin CRUD, canvas rendering) | End-to-end user workflows | **6 tests** |
| **TOTAL** | | | **>= 230 tests** | **236 tests** |

---

## 3. Test Suite Layout & File Manifest

```
tests/
├── helpers/
│   └── mock-dom.mjs                   # Headless browser & DOM simulator (localStorage, RAF, CustomEvent, Cairo EET clock)
├── tier1-feature-coverage.test.mjs    # Tier 1: 105 tests across F1-F21 happy paths
├── tier2-boundary-corner.test.mjs     # Tier 2: 105 tests across F1-F21 boundary & negative cases
├── tier3-cross-feature.test.mjs       # Tier 3: 20 tests across pairwise subsystem combinations
├── tier4-application-scenarios.test.mjs# Tier 4: 6 tests across multi-step real-world workflows
└── runner.mjs                         # Central test runner script with execution summary & exit code
```

---

## 4. Feature Coverage Matrix (F1 to F21)

| Feature # | Feature Name | Tier 1 Tests | Tier 2 Tests | Tier 3 & 4 Cross-References | Total Tests |
|---|---|---|---|---|---|
| **F1** | Dual Theme Design Tokens | F1.1 - F1.5 | B1.1 - B1.5 | P1, P12, Scenario 3 | 13 |
| **F2** | Zero-FOUC Theme Provider | F2.1 - F2.5 | B2.1 - B2.5 | P1, P10, P18, Scenario 3 | 14 |
| **F3** | Accessible Radix UI Primitives | F3.1 - F3.5 | B3.1 - B3.5 | P3, P14, P15, P18, Scenario 1, 4 | 16 |
| **F4** | Cybernetic Header & Active Route Pill | F4.1 - F4.5 | B4.1 - B4.5 | P2, Scenario 1 | 12 |
| **F5** | Dynamic Cairo Status Telemetry | F5.1 - F5.5 | B5.1 - B5.5 | P1, Scenario 1 | 12 |
| **F6** | Responsive Mobile Navigation Drawer | F6.1 - F6.5 | B6.1 - B6.5 | P2 | 11 |
| **F7** | Admin Navigation & Theme Sync | F7.1 - F7.5 | B7.1 - B7.5 | P10, Scenario 2, 6 | 13 |
| **F8** | Interactive Particle Mesh Canvas | F8.1 - F8.5 | B8.1 - B8.5 | P11, P20 | 12 |
| **F9** | Cybernetic Grid Canvas | F9.1 - F9.5 | B9.1 - B9.5 | P12 | 11 |
| **F10** | Hero 3D Orbital Rings | F10.1 - F10.5 | B10.1 - B10.5 | P17 | 11 |
| **F11** | Universal 3D Tilt Card Primitive | F11.1 - F11.5 | B11.1 - B11.5 | P3, P13, Scenario 4 | 13 |
| **F12** | Componentized Project 3D Telemetry | F12.1 - F12.5 | B12.1 - B12.5 | P20 | 11 |
| **F13** | Centralized Animation Choreography | F13.1 - F13.5 | B13.1 - B13.5 | P17, P20 | 12 |
| **F14** | Homepage Semantic Decomposition | F14.1 - F14.5 | B14.1 - B14.5 | Scenario 3, 6 | 12 |
| **F15** | Case Studies Route Overhaul (`/projects`) | F15.1 - F15.5 | B15.1 - B15.5 | P7, P13, Scenario 4, 6 | 14 |
| **F16** | Engineering Blog Route Overhaul (`/blog`) | F16.1 - F16.5 | B16.1 - B16.5 | P9, P14, Scenario 5 | 13 |
| **F17** | Dual Booking System Overhaul (`/book`) | F17.1 - F17.5 | B17.1 - B17.5 | P4, P5, P8, P15, Scenario 1, 2 | 16 |
| **F18** | Client Reservation Portal Overhaul (`/my-bookings`) | F18.1 - F18.5 | B18.1 - B18.5 | P4, P6, P16, Scenario 1 | 14 |
| **F19** | Admin Command Center Overhaul (`/admin/*`) | F19.1 - F19.5 | B19.1 - B19.5 | P5, P6, P7, P8, P9, P19, Scenario 2, 6 | 17 |
| **F20** | Build & TypeScript Zero-Error Baseline | F20.1 - F20.5 | B20.1 - B20.5 | Scenario 1 - 6 | 16 |
| **F21** | E2E Test Suite Validation & Hardening | F21.1 - F21.5 | B21.1 - B21.5 | Test Suite Execution | 11 |

---

## 5. Execution Commands

### Primary Test Runner
```bash
npm test
```

### Dedicated Runner Script
```bash
node tests/runner.mjs
```

### Direct Node Test Invocation (Per Tier)
```bash
# All Tiers
node --test tests/*.test.mjs

# Tier 1 only
node --test tests/tier1-feature-coverage.test.mjs

# Tier 2 only
node --test tests/tier2-boundary-corner.test.mjs

# Tier 3 only
node --test tests/tier3-cross-feature.test.mjs

# Tier 4 only
node --test tests/tier4-application-scenarios.test.mjs
```

---

## 6. Adversarial Verification Coverage

The test suite incorporates explicit adversarial scenarios:
1. **Encoding & Escaping Integrity**: RFC 4180 CSV export with special characters, quotes, and newlines; XSS sanitization checks on search bars.
2. **Invalid Input Combinations**: Submitting incomplete intake forms; selecting non-existent duration modes; corrupted JSON payload recovery in `localStorage`.
3. **Boundary & Resource Stress**: Zero-width canvas resizing, 10,000-character form inputs, rapid theme toggles (100 iterations), and simulated system clock skews.
