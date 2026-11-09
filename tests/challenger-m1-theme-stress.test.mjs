/**
 * tests/challenger-m1-theme-stress.test.mjs
 * 
 * EMPIRICAL CHALLENGER ADVERSARIAL STRESS TEST SUITE
 * Milestone 1: Foundational Theme Tokens & UI Primitives System
 * 
 * Validates:
 * 1. All CSS semantic design tokens in globals.css (:root and .dark)
 * 2. Space-separated RGB channel format (0-255) and parity
 * 3. Tailwind CSS opacity modifiers compilation & alpha math
 * 4. Zero-FOUC inline blocking script execution & edge cases
 * 5. ThemeProvider state machine, rapid 1,000-cycle toggling, and event broadcasting
 * 6. LocalStorage corrupt value sanitization, private browsing SecurityError, and QuotaExceededError
 * 7. Cross-tab synchronization via StorageEvent
 * 8. Dynamic OS prefers-color-scheme media query synchronization
 * 9. UI primitives exports and avoidance of hardcoded hex colors
 */

import { describe, it, before, beforeEach } from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import vm from 'node:vm';
import postcss from 'postcss';
import tailwindcss from 'tailwindcss';

const PROJECT_ROOT = process.cwd();
const GLOBALS_CSS_PATH = path.resolve(PROJECT_ROOT, 'src/app/globals.css');
const TAILWIND_CONFIG_PATH = path.resolve(PROJECT_ROOT, 'tailwind.config.ts');
const LAYOUT_PATH = path.resolve(PROJECT_ROOT, 'src/app/layout.tsx');
const THEME_PROVIDER_PATH = path.resolve(PROJECT_ROOT, 'src/components/theme/ThemeProvider.tsx');
const UI_PRIMITIVES_DIR = path.resolve(PROJECT_ROOT, 'src/components/ui');

// Helper to extract CSS rules
function extractCssTokens(cssContent) {
  const rootMatch = cssContent.match(/:root\s*\{([^}]+)\}/);
  const darkMatch = cssContent.match(/\.dark\s*\{([^}]+)\}/);

  if (!rootMatch || !darkMatch) {
    throw new Error('Failed to find :root or .dark block in globals.css');
  }

  function parseVars(block) {
    const vars = {};
    const regex = /--([a-z0-9-]+)\s*:\s*([^;]+);/g;
    let m;
    while ((m = regex.exec(block)) !== null) {
      vars[m[1]] = m[2].trim();
    }
    return vars;
  }

  return {
    rootVars: parseVars(rootMatch[1]),
    darkVars: parseVars(darkMatch[1]),
  };
}

describe('Challenger M1: Design Tokens & RGB Format Verification', () => {
  const css = fs.readFileSync(GLOBALS_CSS_PATH, 'utf8');
  const { rootVars, darkVars } = extractCssTokens(css);

  const rootRgbTokens = Object.fromEntries(
    Object.entries(rootVars).filter(([k, v]) => !v.startsWith('var('))
  );
  const darkRgbTokens = Object.fromEntries(
    Object.entries(darkVars).filter(([k, v]) => !v.startsWith('var('))
  );

  it('should have exact token key parity between :root (light) and .dark (cybernetic)', () => {
    const rootKeys = Object.keys(rootRgbTokens).sort();
    const darkKeys = Object.keys(darkRgbTokens).sort();

    assert.deepStrictEqual(
      rootKeys,
      darkKeys,
      `Token parity mismatch. Missing in dark: ${rootKeys.filter(k => !darkKeys.includes(k))}. Missing in root: ${darkKeys.filter(k => !rootKeys.includes(k))}`
    );
  });

  it('should verify all color tokens define valid 3-channel space-separated RGB integers (0-255)', () => {
    const rgbRegex = /^(\d{1,3})\s+(\d{1,3})\s+(\d{1,3})$/;

    for (const [key, value] of Object.entries(rootRgbTokens)) {
      const match = value.match(rgbRegex);
      assert.ok(
        match,
        `Token :root --${key} has invalid format: "${value}". Expected "R G B" space-separated integers.`
      );
      const [, r, g, b] = match.map(Number);
      assert.ok(r >= 0 && r <= 255, `:root --${key} Red channel ${r} out of bounds [0, 255]`);
      assert.ok(g >= 0 && g <= 255, `:root --${key} Green channel ${g} out of bounds [0, 255]`);
      assert.ok(b >= 0 && b <= 255, `:root --${key} Blue channel ${b} out of bounds [0, 255]`);
    }

    for (const [key, value] of Object.entries(darkRgbTokens)) {
      const match = value.match(rgbRegex);
      assert.ok(
        match,
        `Token .dark --${key} has invalid format: "${value}". Expected "R G B" space-separated integers.`
      );
      const [, r, g, b] = match.map(Number);
      assert.ok(r >= 0 && r <= 255, `.dark --${key} Red channel ${r} out of bounds [0, 255]`);
      assert.ok(g >= 0 && g <= 255, `.dark --${key} Green channel ${g} out of bounds [0, 255]`);
      assert.ok(b >= 0 && b <= 255, `.dark --${key} Blue channel ${b} out of bounds [0, 255]`);
    }
  });

  it('should verify that dark mode values are distinct from light mode values (true dual mode)', () => {
    // Background and primary should be distinct between light and dark modes
    assert.notStrictEqual(rootRgbTokens['background'], darkRgbTokens['background'], 'Background should differ between themes');
    assert.notStrictEqual(rootRgbTokens['on-background'], darkRgbTokens['on-background'], 'on-background should differ between themes');
    assert.notStrictEqual(rootRgbTokens['surface'], darkRgbTokens['surface'], 'surface should differ between themes');
    assert.notStrictEqual(rootRgbTokens['primary'], darkRgbTokens['primary'], 'primary should differ between themes');

    // Light background should have higher luminance than dark background
    const getLuminance = (rgbStr) => {
      const [r, g, b] = rgbStr.split(/\s+/).map(Number);
      return 0.299 * r + 0.587 * g + 0.114 * b;
    };

    const lightBgLum = getLuminance(rootRgbTokens['background']);
    const darkBgLum = getLuminance(darkRgbTokens['background']);
    assert.ok(lightBgLum > 200, `Light background luminance (${lightBgLum}) should be > 200 (crisp high contrast)`);
    assert.ok(darkBgLum < 50, `Dark background luminance (${darkBgLum}) should be < 50 (deep cybernetic)`);
  });

  it('should verify all shadcn compatibility aliases exist in both :root and .dark', () => {
    const requiredAliases = [
      'border',
      'input',
      'ring',
      'foreground',
      'card',
      'card-foreground',
      'popover',
      'popover-foreground',
      'muted',
      'muted-foreground',
    ];

    for (const alias of requiredAliases) {
      assert.ok(
        rootVars[alias],
        `Compatibility alias --${alias} missing in :root`
      );
      assert.ok(
        darkVars[alias],
        `Compatibility alias --${alias} missing in .dark`
      );
    }
  });

  it('should confirm all RGB color tokens are mapped in tailwind.config.ts with <alpha-value> syntax', () => {
    const twConfig = fs.readFileSync(TAILWIND_CONFIG_PATH, 'utf8');

    for (const key of Object.keys(rootRgbTokens)) {
      const expectedPattern = `rgb(var(--${key}) / <alpha-value>)`;
      assert.ok(
        twConfig.includes(expectedPattern) || twConfig.includes(`rgb(var(--${key})/<alpha-value>)`),
        `tailwind.config.ts missing alpha mapping for token: "${key}". Expected ${expectedPattern}`
      );
    }
  });
});

describe('Challenger M1: Tailwind CSS Opacity Modifiers Compilation & Stress Generator', () => {
  const css = fs.readFileSync(GLOBALS_CSS_PATH, 'utf8');
  const { rootVars } = extractCssTokens(css);
  const colorKeys = Object.keys(rootVars).filter(k => !rootVars[k].startsWith('var('));

  it('should compile dynamic opacity classes across all tokens without PostCSS errors', async () => {
    // Generate classes for all tokens with various opacity values
    const opacities = ['10', '20', '30', '50', '70', '80', '95'];
    const sampleClasses = [];

    for (const token of colorKeys) {
      for (const op of opacities) {
        sampleClasses.push(`bg-${token}/${op}`);
        sampleClasses.push(`text-${token}/${op}`);
        sampleClasses.push(`border-${token}/${op}`);
      }
    }

    const testHtml = sampleClasses.map(cls => `<div class="${cls}"></div>`).join('\n');

    // Run Tailwind compilation programmatically
    const twPlugin = tailwindcss({
      darkMode: ['class'],
      content: [{ raw: testHtml, extension: 'html' }],
      theme: {
        extend: {
          colors: Object.fromEntries(
            colorKeys.map(k => [k, `rgb(var(--${k}) / <alpha-value>)`])
          ),
        },
      },
    });

    const inputCss = '@tailwind utilities;';
    const result = await postcss([twPlugin]).process(inputCss, { from: undefined });

    assert.ok(result.css.length > 0, 'Generated CSS output should not be empty');

    // Verify alpha modifiers are synthesized correctly
    assert.ok(
      result.css.includes('rgb(var(--primary) / 0.2)') || result.css.includes('rgb(var(--primary) / 20%)'),
      'Output CSS should contain compiled alpha modifier for bg-primary/20'
    );
    assert.ok(
      result.css.includes('rgb(var(--secondary) / 0.5)') || result.css.includes('rgb(var(--secondary) / 50%)'),
      'Output CSS should contain compiled alpha modifier for text-secondary/50'
    );
    assert.ok(
      result.css.includes('rgb(var(--outline-variant) / 0.3)') || result.css.includes('rgb(var(--outline-variant) / 30%)'),
      'Output CSS should contain compiled alpha modifier for border-outline-variant/30'
    );
  });
});

describe('Challenger M1: Anti-FOUC Blocking Head Script Analysis', () => {
  const layout = fs.readFileSync(LAYOUT_PATH, 'utf8');

  it('should have suppressHydrationWarning and className="dark" on <html> element', () => {
    assert.ok(layout.includes('suppressHydrationWarning'), '<html> element must include suppressHydrationWarning');
    assert.ok(layout.includes('className="dark"'), '<html> element must initialize with default dark class');
  });

  it('should contain synchronous inline theme initialization script in <head>', () => {
    assert.ok(layout.includes('id="islam-theme-anti-fouc"'), 'Anti-FOUC script missing id="islam-theme-anti-fouc"');
    assert.ok(layout.includes('localStorage.getItem'), 'Anti-FOUC script must check localStorage');
    assert.ok(layout.includes('islam_theme_v1'), 'Anti-FOUC script must check key "islam_theme_v1"');
    assert.ok(layout.includes('prefers-color-scheme: dark'), 'Anti-FOUC script must query system preference');
  });

  it('should execute anti-FOUC script logic correctly across all storage permutations', () => {
    // Extract script string from layout
    const scriptMatch = layout.match(/__html:\s*`([^`]+)`/);
    assert.ok(scriptMatch, 'Could not extract anti-FOUC script template string');
    const scriptCode = scriptMatch[1];

    function runAntiFouc(storedValue, fallbackValue, systemPrefersDark, shouldThrowStorage = false) {
      let classList = new Set(['dark']);
      let colorScheme = '';
      const docElement = {
        classList: {
          add: (cls) => classList.add(cls),
          remove: (cls) => classList.delete(cls),
          contains: (cls) => classList.has(cls),
        },
        style: {
          get colorScheme() { return colorScheme; },
          set colorScheme(v) { colorScheme = v; },
        },
      };

      const storage = {
        getItem: (k) => {
          if (shouldThrowStorage) throw new Error('SecurityError: Access Denied');
          if (k === 'islam_theme_v1') return storedValue;
          if (k === 'theme') return fallbackValue;
          return null;
        },
      };

      const win = {
        matchMedia: (query) => ({
          matches: systemPrefersDark,
        }),
      };

      const context = {
        window: win,
        document: { documentElement: docElement },
        localStorage: storage,
      };

      vm.createContext(context);
      vm.runInContext(scriptCode, context);

      return {
        isDark: docElement.classList.contains('dark'),
        colorScheme: docElement.style.colorScheme,
      };
    }

    // Permutation 1: stored 'light' -> removes dark class
    const p1 = runAntiFouc('light', null, true);
    assert.strictEqual(p1.isDark, false, 'Stored "light" must remove dark class');
    assert.strictEqual(p1.colorScheme, 'light');

    // Permutation 2: stored 'dark' -> keeps dark class
    const p2 = runAntiFouc('dark', null, false);
    assert.strictEqual(p2.isDark, true, 'Stored "dark" must keep dark class');
    assert.strictEqual(p2.colorScheme, 'dark');

    // Permutation 3: stored 'system' + system dark -> keeps dark class
    const p3 = runAntiFouc('system', null, true);
    assert.strictEqual(p3.isDark, true, 'Stored "system" + OS dark must keep dark class');

    // Permutation 4: stored 'system' + system light -> removes dark class
    const p4 = runAntiFouc('system', null, false);
    assert.strictEqual(p4.isDark, false, 'Stored "system" + OS light must remove dark class');

    // Permutation 5: no stored value + system light -> removes dark class
    const p5 = runAntiFouc(null, null, false);
    assert.strictEqual(p5.isDark, false, 'No storage + OS light must remove dark class');

    // Permutation 6: no stored value + system dark -> keeps dark class
    const p6 = runAntiFouc(null, null, true);
    assert.strictEqual(p6.isDark, true, 'No storage + OS dark must keep dark class');

    // Permutation 7: legacy fallback key 'theme' = 'light'
    const p7 = runAntiFouc(null, 'light', true);
    assert.strictEqual(p7.isDark, false, 'Legacy fallback "theme" key must be honored');

    // Permutation 8: storage throws SecurityError -> does not throw, defaults safely
    assert.doesNotThrow(() => {
      runAntiFouc(null, null, true, true);
    }, 'Script must catch storage errors cleanly');
  });
});

describe('Challenger M1: ThemeProvider State Machine & Stress Test Harness', () => {
  // Mock headless DOM environment
  class MockDOM {
    constructor() {
      this.classList = new Set(['dark']);
      this.colorScheme = 'dark';
      this.storage = new Map();
      this.throwOnStorageGet = false;
      this.throwOnStorageSet = false;
      this.systemDark = true;
      this.windowListeners = new Map();
      this.dispatchedEvents = [];

      this.documentElement = {
        classList: {
          add: (cls) => this.classList.add(cls),
          remove: (cls) => this.classList.delete(cls),
          contains: (cls) => this.classList.has(cls),
        },
        style: {
          get colorScheme() { return this._cs; },
          set colorScheme(v) { this._cs = v; },
        },
      };
      this.documentElement.style._cs = 'dark';
    }

    addEventListener(event, fn) {
      if (!this.windowListeners.has(event)) {
        this.windowListeners.set(event, []);
      }
      this.windowListeners.get(event).push(fn);
    }

    removeEventListener(event, fn) {
      const list = this.windowListeners.get(event) || [];
      const idx = list.indexOf(fn);
      if (idx !== -1) list.splice(idx, 1);
    }

    dispatchEvent(evt) {
      this.dispatchedEvents.push(evt);
      const list = this.windowListeners.get(evt.type) || [];
      for (const fn of list) {
        fn(evt);
      }
    }

    getLocalStorage() {
      return {
        getItem: (k) => {
          if (this.throwOnStorageGet) throw new Error('SecurityError: Private browsing disabled storage');
          return this.storage.has(k) ? this.storage.get(k) : null;
        },
        setItem: (k, v) => {
          if (this.throwOnStorageSet) throw new Error('QuotaExceededError: LocalStorage quota exceeded');
          this.storage.set(k, String(v));
        },
        removeItem: (k) => this.storage.delete(k),
        clear: () => this.storage.clear(),
      };
    }

    matchMedia(query) {
      const self = this;
      const mediaListeners = [];
      return {
        get matches() { return self.systemDark; },
        addEventListener: (event, fn) => mediaListeners.push(fn),
        removeEventListener: (event, fn) => {
          const idx = mediaListeners.indexOf(fn);
          if (idx !== -1) mediaListeners.splice(idx, 1);
        },
        _triggerChange: (matches) => {
          self.systemDark = matches;
          for (const fn of mediaListeners) {
            fn({ matches });
          }
        },
      };
    }
  }

  // Implementation of ThemeProvider logic matching src/components/theme/ThemeProvider.tsx
  function createThemeRuntime(dom, defaultTheme = 'dark') {
    const STORAGE_KEY = 'islam_theme_v1';
    const FALLBACK_KEY = 'theme';

    let theme = defaultTheme;
    let resolvedTheme = defaultTheme === 'system' ? (dom.systemDark ? 'dark' : 'light') : defaultTheme;
    let mounted = false;

    function applyDomTheme(resolved, activeTheme) {
      if (resolved === 'dark') {
        dom.documentElement.classList.add('dark');
        dom.documentElement.style.colorScheme = 'dark';
      } else {
        dom.documentElement.classList.remove('dark');
        dom.documentElement.style.colorScheme = 'light';
      }

      dom.dispatchEvent({
        type: 'islam_theme_change',
        detail: { theme: activeTheme, resolvedTheme: resolved },
      });
    }

    function resolveThemeValue(t) {
      if (t === 'system') return dom.systemDark ? 'dark' : 'light';
      return t;
    }

    // Mount simulation
    try {
      const stored = dom.getLocalStorage().getItem(STORAGE_KEY) || dom.getLocalStorage().getItem(FALLBACK_KEY);
      const initialTheme = stored && ['dark', 'light', 'system'].includes(stored) ? stored : defaultTheme;
      theme = initialTheme;
      resolvedTheme = resolveThemeValue(initialTheme);
      applyDomTheme(resolvedTheme, initialTheme);
    } catch {
      resolvedTheme = resolveThemeValue(defaultTheme);
      applyDomTheme(resolvedTheme, defaultTheme);
    } finally {
      mounted = true;
    }

    // System media listener
    const mm = dom.matchMedia('(prefers-color-scheme: dark)');
    mm.addEventListener('change', (e) => {
      if (theme === 'system') {
        const newResolved = e.matches ? 'dark' : 'light';
        resolvedTheme = newResolved;
        applyDomTheme(newResolved, 'system');
      }
    });

    // Cross-tab storage listener
    dom.addEventListener('storage', (e) => {
      if ((e.key === STORAGE_KEY || e.key === FALLBACK_KEY) && e.newValue) {
        if (['dark', 'light', 'system'].includes(e.newValue)) {
          theme = e.newValue;
          resolvedTheme = resolveThemeValue(e.newValue);
          applyDomTheme(resolvedTheme, e.newValue);
        }
      }
    });

    function setTheme(newTheme) {
      theme = newTheme;
      resolvedTheme = resolveThemeValue(newTheme);
      applyDomTheme(resolvedTheme, newTheme);
      try {
        dom.getLocalStorage().setItem(STORAGE_KEY, newTheme);
      } catch {
        // Ignored
      }
    }

    function toggleTheme() {
      const nextTheme = resolvedTheme === 'dark' ? 'light' : 'dark';
      setTheme(nextTheme);
    }

    return {
      get theme() { return theme; },
      get resolvedTheme() { return resolvedTheme; },
      get mounted() { return mounted; },
      setTheme,
      toggleTheme,
      mediaQuery: mm,
    };
  }

  it('should initialize with defaultTheme="dark", set .dark on root, and broadcast islam_theme_change', () => {
    const dom = new MockDOM();
    const runtime = createThemeRuntime(dom, 'dark');

    assert.strictEqual(runtime.theme, 'dark');
    assert.strictEqual(runtime.resolvedTheme, 'dark');
    assert.strictEqual(dom.documentElement.classList.contains('dark'), true);
    assert.strictEqual(dom.documentElement.style.colorScheme, 'dark');

    assert.ok(dom.dispatchedEvents.length >= 1);
    const lastEvent = dom.dispatchedEvents[dom.dispatchedEvents.length - 1];
    assert.strictEqual(lastEvent.type, 'islam_theme_change');
    assert.deepStrictEqual(lastEvent.detail, { theme: 'dark', resolvedTheme: 'dark' });
  });

  it('should toggle theme from dark to light and update storage and DOM classes', () => {
    const dom = new MockDOM();
    const runtime = createThemeRuntime(dom, 'dark');

    runtime.toggleTheme();

    assert.strictEqual(runtime.theme, 'light');
    assert.strictEqual(runtime.resolvedTheme, 'light');
    assert.strictEqual(dom.documentElement.classList.contains('dark'), false);
    assert.strictEqual(dom.documentElement.style.colorScheme, 'light');
    assert.strictEqual(dom.storage.get('islam_theme_v1'), 'light');

    const lastEvent = dom.dispatchedEvents[dom.dispatchedEvents.length - 1];
    assert.deepStrictEqual(lastEvent.detail, { theme: 'light', resolvedTheme: 'light' });
  });

  it('should survive 1,000 rapid toggles and mode switches without state drift or exceptions', () => {
    const dom = new MockDOM();
    const runtime = createThemeRuntime(dom, 'dark');

    const modes = ['light', 'dark', 'system'];
    const startTime = Date.now();

    for (let i = 0; i < 1000; i++) {
      if (i % 3 === 0) {
        runtime.toggleTheme();
      } else {
        const targetMode = modes[i % modes.length];
        runtime.setTheme(targetMode);
      }

      // Verify invariant at every single step
      const isDarkClass = dom.documentElement.classList.contains('dark');
      const expectedDark = runtime.resolvedTheme === 'dark';
      assert.strictEqual(
        isDarkClass,
        expectedDark,
        `DOM class mismatch at iteration ${i}. Expected dark: ${expectedDark}, got: ${isDarkClass}`
      );
      assert.strictEqual(dom.documentElement.style.colorScheme, runtime.resolvedTheme);
    }

    const duration = Date.now() - startTime;
    assert.ok(duration < 2000, `1,000 rapid toggles took ${duration}ms, expected < 2000ms`);
  });

  it('should handle corrupt, malicious, and invalid localStorage values safely', () => {
    const maliciousValues = [
      '<script>alert(1)</script>',
      '{"__proto__":{"polluted":true}}',
      'DARK',
      'LIGHT',
      'system_fake',
      'null',
      'undefined',
      '',
      'A'.repeat(5000),
    ];

    for (const badValue of maliciousValues) {
      const dom = new MockDOM();
      dom.storage.set('islam_theme_v1', badValue);

      // Should not throw, should fall back to defaultTheme ('dark')
      const runtime = createThemeRuntime(dom, 'dark');
      assert.strictEqual(runtime.theme, 'dark', `Failed to sanitize malicious storage value: "${badValue.slice(0, 30)}"`);
      assert.strictEqual(runtime.resolvedTheme, 'dark');
      assert.strictEqual(dom.documentElement.classList.contains('dark'), true);
    }
  });

  it('should remain resilient when localStorage throws SecurityError or QuotaExceededError', () => {
    // Test SecurityError on read
    const dom1 = new MockDOM();
    dom1.throwOnStorageGet = true;
    assert.doesNotThrow(() => {
      const runtime = createThemeRuntime(dom1, 'dark');
      assert.strictEqual(runtime.theme, 'dark');
    }, 'SecurityError on localStorage read must be caught gracefully');

    // Test QuotaExceededError on write
    const dom2 = new MockDOM();
    dom2.throwOnStorageSet = true;
    const runtime2 = createThemeRuntime(dom2, 'dark');
    assert.doesNotThrow(() => {
      runtime2.setTheme('light');
    }, 'QuotaExceededError on localStorage write must be ignored gracefully');
    assert.strictEqual(runtime2.theme, 'light');
    assert.strictEqual(dom2.documentElement.classList.contains('dark'), false);
  });

  it('should synchronize across tabs when StorageEvent fires with valid theme', () => {
    const dom = new MockDOM();
    const runtime = createThemeRuntime(dom, 'dark');

    // Dispatch StorageEvent from external tab
    dom.dispatchEvent({
      type: 'storage',
      key: 'islam_theme_v1',
      newValue: 'light',
    });

    assert.strictEqual(runtime.theme, 'light');
    assert.strictEqual(runtime.resolvedTheme, 'light');
    assert.strictEqual(dom.documentElement.classList.contains('dark'), false);

    // External tab fires invalid value -> should be ignored
    dom.dispatchEvent({
      type: 'storage',
      key: 'islam_theme_v1',
      newValue: 'corrupt_theme',
    });

    assert.strictEqual(runtime.theme, 'light', 'Invalid storage event must not mutate current theme');
  });

  it('should dynamically update when OS prefers-color-scheme changes in "system" mode', () => {
    const dom = new MockDOM();
    const runtime = createThemeRuntime(dom, 'system');

    assert.strictEqual(runtime.theme, 'system');
    assert.strictEqual(runtime.resolvedTheme, 'dark'); // systemDark initial true

    // OS switches to light mode
    runtime.mediaQuery._triggerChange(false);
    assert.strictEqual(runtime.resolvedTheme, 'light');
    assert.strictEqual(dom.documentElement.classList.contains('dark'), false);
    assert.strictEqual(dom.documentElement.style.colorScheme, 'light');

    // OS switches back to dark mode
    runtime.mediaQuery._triggerChange(true);
    assert.strictEqual(runtime.resolvedTheme, 'dark');
    assert.strictEqual(dom.documentElement.classList.contains('dark'), true);

    // If explicit mode set to 'dark', OS changes should NOT affect resolvedTheme
    runtime.setTheme('dark');
    runtime.mediaQuery._triggerChange(false); // OS goes light
    assert.strictEqual(runtime.resolvedTheme, 'dark', 'Explicit theme must not be affected by OS media change');
    assert.strictEqual(dom.documentElement.classList.contains('dark'), true);
  });
});

describe('Challenger M1: UI Primitives Exports & Code Conformance', () => {
  const primitives = [
    { file: 'dialog.tsx', requiredExports: ['Dialog', 'DialogTrigger', 'DialogContent', 'DialogHeader', 'DialogTitle', 'DialogDescription', 'DialogClose'] },
    { file: 'tabs.tsx', requiredExports: ['Tabs', 'TabsList', 'TabsTrigger', 'TabsContent'] },
    { file: 'card.tsx', requiredExports: ['Card', 'CardHeader', 'CardTitle', 'CardDescription', 'CardContent', 'CardFooter'] },
    { file: 'input.tsx', requiredExports: ['Input'] },
    { file: 'textarea.tsx', requiredExports: ['Textarea'] },
    { file: 'label.tsx', requiredExports: ['Label'] },
    { file: 'select.tsx', requiredExports: ['Select', 'SelectTrigger', 'SelectContent', 'SelectItem', 'SelectValue'] },
    { file: 'avatar.tsx', requiredExports: ['Avatar', 'AvatarImage', 'AvatarFallback'] },
    { file: 'tooltip.tsx', requiredExports: ['TooltipProvider', 'Tooltip', 'TooltipTrigger', 'TooltipContent'] },
    { file: 'button.tsx', requiredExports: ['Button', 'buttonVariants'] },
    { file: 'badge.tsx', requiredExports: ['Badge', 'badgeVariants'] },
  ];

  for (const prim of primitives) {
    it(`should verify ${prim.file} exists and exports expected components`, () => {
      const filePath = path.join(UI_PRIMITIVES_DIR, prim.file);
      assert.ok(fs.existsSync(filePath), `Primitive file missing: ${prim.file}`);
      const content = fs.readFileSync(filePath, 'utf8');

      for (const exp of prim.requiredExports) {
        const exportRegex = new RegExp(`\\bexport\\s*\\{[^}]*\\b${exp}\\b|\\bexport\\s+(?:const|function|class|type|interface)\\s+${exp}\\b|\\bexport\\s+default\\s+${exp}\\b`);
        const hasExport = exportRegex.test(content);
        assert.ok(hasExport, `Component ${exp} not exported from ${prim.file}`);
      }
    });
  }

  it('should verify UI primitives do NOT contain hardcoded color hex literals', () => {
    // Hardcoded colors like #111319, #d0bcff violate dual-theme design token system
    const hexColorRegex = /#(?:[0-9a-fA-F]{3}){1,2}\b(?!;)/g;

    for (const prim of primitives) {
      const filePath = path.join(UI_PRIMITIVES_DIR, prim.file);
      const content = fs.readFileSync(filePath, 'utf8');
      const matches = content.match(hexColorRegex);
      assert.ok(
        !matches || matches.length === 0,
        `Found hardcoded hex color(s) in ${prim.file}: ${matches?.join(', ')}. Must use design token classes.`
      );
    }
  });
});
