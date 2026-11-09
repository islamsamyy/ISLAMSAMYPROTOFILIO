/**
 * tests/helpers/mock-dom.mjs
 * 
 * Lightweight, zero-dependency browser and DOM simulation environment for Node.js
 * Enables opaque-box testing of portfolio features:
 * - Theme switcher and local storage persistence
 * - Client data store and custom sync events (islam_store_sync)
 * - Canvas 2D lifecycle and RAF loop management
 * - Navigation state, route pills, and mobile drawer
 * - Dual booking system and reservation dossier
 * - Accessible Radix UI primitives and keyboard dismiss
 */

class MockLocalStorage {
  constructor() {
    this.store = new Map();
  }

  getItem(key) {
    return this.store.has(key) ? this.store.get(key) : null;
  }

  setItem(key, value) {
    this.store.set(String(key), String(value));
  }

  removeItem(key) {
    this.store.delete(String(key));
  }

  clear() {
    this.store.clear();
  }

  get length() {
    return this.store.size;
  }

  key(index) {
    const keys = Array.from(this.store.keys());
    return keys[index] || null;
  }
}

class MockClassList {
  constructor(element) {
    this.element = element;
    this.classes = new Set();
  }

  add(...classNames) {
    for (const c of classNames) {
      if (c) this.classes.add(c);
    }
  }

  remove(...classNames) {
    for (const c of classNames) {
      this.classes.delete(c);
    }
  }

  toggle(className, force) {
    if (force !== undefined) {
      if (force) {
        this.classes.add(className);
        return true;
      } else {
        this.classes.delete(className);
        return false;
      }
    }
    if (this.classes.has(className)) {
      this.classes.delete(className);
      return false;
    } else {
      this.classes.add(className);
      return true;
    }
  }

  contains(className) {
    return this.classes.has(className);
  }

  toString() {
    return Array.from(this.classes).join(' ');
  }
}

class MockElement {
  constructor(tagName = 'div') {
    this.tagName = tagName.toUpperCase();
    this.attributes = new Map();
    this.classList = new MockClassList(this);
    this.style = {};
    this.children = [];
    this.parentNode = null;
    this.textContent = '';
    this.listeners = new Map();
  }

  setAttribute(name, value) {
    this.attributes.set(name, String(value));
  }

  getAttribute(name) {
    return this.attributes.has(name) ? this.attributes.get(name) : null;
  }

  hasAttribute(name) {
    return this.attributes.has(name);
  }

  removeAttribute(name) {
    this.attributes.delete(name);
  }

  appendChild(child) {
    child.parentNode = this;
    this.children.push(child);
    return child;
  }

  removeChild(child) {
    const idx = this.children.indexOf(child);
    if (idx !== -1) {
      this.children.splice(idx, 1);
      child.parentNode = null;
    }
    return child;
  }

  addEventListener(type, listener) {
    if (!this.listeners.has(type)) {
      this.listeners.set(type, new Set());
    }
    this.listeners.get(type).add(listener);
  }

  removeEventListener(type, listener) {
    if (this.listeners.has(type)) {
      this.listeners.get(type).delete(listener);
    }
  }

  dispatchEvent(event) {
    event.target = this;
    if (this.listeners.has(event.type)) {
      for (const listener of this.listeners.get(event.type)) {
        listener.call(this, event);
      }
    }
    return !event.defaultPrevented;
  }
}

class MockCustomEvent {
  constructor(type, eventInitDict = {}) {
    this.type = type;
    this.detail = eventInitDict.detail || null;
    this.bubbles = !!eventInitDict.bubbles;
    this.cancelable = !!eventInitDict.cancelable;
    this.defaultPrevented = false;
    this.target = null;
  }

  preventDefault() {
    if (this.cancelable) {
      this.defaultPrevented = true;
    }
  }
}

export function setupMockEnvironment() {
  const localStorage = new MockLocalStorage();
  const documentElement = new MockElement('html');
  const body = new MockElement('body');
  documentElement.appendChild(body);

  const windowListeners = new Map();
  let rafCounter = 1;
  const activeRafs = new Map();

  const mockWindow = {
    localStorage,
    document: {
      documentElement,
      body,
      createElement: (tag) => new MockElement(tag),
      getElementById: (id) => null,
      querySelector: (selector) => null,
      querySelectorAll: (selector) => [],
    },
    addEventListener: (type, listener) => {
      if (!windowListeners.has(type)) {
        windowListeners.set(type, new Set());
      }
      windowListeners.get(type).add(listener);
    },
    removeEventListener: (type, listener) => {
      if (windowListeners.has(type)) {
        windowListeners.get(type).delete(listener);
      }
    },
    dispatchEvent: (event) => {
      if (windowListeners.has(event.type)) {
        for (const listener of windowListeners.get(event.type)) {
          listener.call(mockWindow, event);
        }
      }
      return !event.defaultPrevented;
    },
    requestAnimationFrame: (cb) => {
      const id = rafCounter++;
      const timer = setTimeout(() => {
        activeRafs.delete(id);
        cb(Date.now());
      }, 16);
      activeRafs.set(id, timer);
      return id;
    },
    cancelAnimationFrame: (id) => {
      if (activeRafs.has(id)) {
        clearTimeout(activeRafs.get(id));
        activeRafs.delete(id);
      }
    },
    devicePixelRatio: 2,
    matchMedia: (query) => ({
      matches: query.includes('dark'),
      media: query,
      onchange: null,
      addListener: () => {},
      removeListener: () => {},
      addEventListener: () => {},
      removeEventListener: () => {},
      dispatchEvent: () => false,
    }),
    CustomEvent: MockCustomEvent,
  };

  return {
    window: mockWindow,
    document: mockWindow.document,
    localStorage,
    CustomEvent: MockCustomEvent,
    getActiveRafCount: () => activeRafs.size,
    clearAllTimers: () => {
      for (const timer of activeRafs.values()) {
        clearTimeout(timer);
      }
      activeRafs.clear();
    }
  };
}

/**
 * Calculates current time in Cairo EET (UTC+2 standard or UTC+3 DST)
 */
export function getCairoTimeString(date = new Date()) {
  const formatter = new Intl.DateTimeFormat('en-US', {
    timeZone: 'Africa/Cairo',
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
  });
  return `${formatter.format(date)} EET`;
}

/**
 * Validates RGB space-separated variable syntax: "228 19% 8%" or "208 188 255"
 */
export function isValidRgbToken(tokenValue) {
  if (typeof tokenValue !== 'string') return false;
  const trimmed = tokenValue.trim();
  const parts = trimmed.split(/\s+/);
  return parts.length === 3;
}
