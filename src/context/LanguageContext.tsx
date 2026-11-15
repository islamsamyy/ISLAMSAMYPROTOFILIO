'use client';

import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  useCallback,
  useMemo,
} from 'react';
import { Language, getTranslation } from '@/i18n/translations';

export interface LanguageContextType {
  language: Language;
  isRTL: boolean;
  setLanguage: (lang: Language) => void;
  toggleLanguage: () => void;
  t: (key: string, fallback?: string) => string;
  mounted: boolean;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LANGUAGE_STORAGE_KEY = 'islam_language_v1';

function applyDomLanguage(lang: Language) {
  if (typeof document === 'undefined') return;
  const root = document.documentElement;
  const isRTL = lang === 'ar';

  root.setAttribute('lang', lang);
  root.setAttribute('dir', isRTL ? 'rtl' : 'ltr');

  if (isRTL) {
    root.classList.add('rtl');
    root.classList.remove('ltr');
  } else {
    root.classList.add('ltr');
    root.classList.remove('rtl');
  }

  if (typeof window !== 'undefined') {
    window.dispatchEvent(
      new CustomEvent('islam_language_change', {
        detail: { language: lang, isRTL },
      })
    );
  }
}

export function LanguageProvider({
  children,
  defaultLanguage = 'en',
}: {
  children: React.ReactNode;
  defaultLanguage?: Language;
}) {
  const [language, setLanguageState] = useState<Language>(defaultLanguage);
  const [mounted, setMounted] = useState<boolean>(false);

  useEffect(() => {
    try {
      const stored = localStorage.getItem(LANGUAGE_STORAGE_KEY) as Language | null;
      if (stored === 'en' || stored === 'ar') {
        setLanguageState(stored);
        applyDomLanguage(stored);
      } else {
        // Optional: Detect browser language preference
        const navLang = navigator.language?.toLowerCase() || '';
        const initial = navLang.startsWith('ar') ? 'ar' : defaultLanguage;
        setLanguageState(initial);
        applyDomLanguage(initial);
      }
    } catch {
      applyDomLanguage(defaultLanguage);
    } finally {
      setMounted(true);
    }
  }, [defaultLanguage]);

  // Multi-tab synchronization
  useEffect(() => {
    if (typeof window === 'undefined') return;

    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === LANGUAGE_STORAGE_KEY && (e.newValue === 'en' || e.newValue === 'ar')) {
        const nextLang = e.newValue as Language;
        setLanguageState(nextLang);
        applyDomLanguage(nextLang);
      }
    };

    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  const setLanguage = useCallback((newLang: Language) => {
    setLanguageState(newLang);
    applyDomLanguage(newLang);
    try {
      localStorage.setItem(LANGUAGE_STORAGE_KEY, newLang);
    } catch {}
  }, []);

  const toggleLanguage = useCallback(() => {
    setLanguage(language === 'en' ? 'ar' : 'en');
  }, [language, setLanguage]);

  const t = useCallback(
    (key: string, fallback?: string) => {
      return getTranslation(language, key, fallback);
    },
    [language]
  );

  const value = useMemo<LanguageContextType>(
    () => ({
      language,
      isRTL: language === 'ar',
      setLanguage,
      toggleLanguage,
      t,
      mounted,
    }),
    [language, setLanguage, toggleLanguage, t, mounted]
  );

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}

export function useLanguage(): LanguageContextType {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}
