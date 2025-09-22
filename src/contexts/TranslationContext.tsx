import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

// Translation types
export type Language = 'en' | 'hi' | 'ta' | 'te' | 'bn';

export interface TranslationContextType {
  language: Language;
  setLanguage: (language: Language) => void;
  t: (key: string, params?: Record<string, string | number>) => string;
  isLoading: boolean;
}

// Translation files will be imported dynamically
const translations: Record<Language, Record<string, any>> = {
  en: {},
  hi: {},
  ta: {},
  te: {},
  bn: {}
};

const TranslationContext = createContext<TranslationContextType | undefined>(undefined);

export const useTranslation = () => {
  const context = useContext(TranslationContext);
  if (!context) {
    throw new Error('useTranslation must be used within a TranslationProvider');
  }
  return context;
};

interface TranslationProviderProps {
  children: ReactNode;
  defaultLanguage?: Language;
  storageKey?: string;
}

export const TranslationProvider: React.FC<TranslationProviderProps> = ({
  children,
  defaultLanguage = 'en',
  storageKey = 'disaster-ed-language',
}) => {
  const [language, setLanguageState] = useState<Language>(() => {
    if (typeof window !== 'undefined') {
      return (localStorage.getItem(storageKey) as Language) || defaultLanguage;
    }
    return defaultLanguage;
  });

  const [currentTranslations, setCurrentTranslations] = useState<Record<string, any>>({});
  const [isLoading, setIsLoading] = useState(true);

  // Load translations for the current language
  useEffect(() => {
    const loadTranslations = async () => {
      setIsLoading(true);
      try {
        // Dynamically import translation files
        const translationModule = await import(`../locales/${language}.json`);
        setCurrentTranslations(translationModule.default);
      } catch (error) {
        console.error(`Failed to load translations for ${language}:`, error);
        // Fallback to English if translation file doesn't exist
        if (language !== 'en') {
          const englishModule = await import('../locales/en.json');
          setCurrentTranslations(englishModule.default);
        }
      } finally {
        setIsLoading(false);
      }
    };

    loadTranslations();
  }, [language]);

  const setLanguage = (newLanguage: Language) => {
    setLanguageState(newLanguage);
    localStorage.setItem(storageKey, newLanguage);
  };

  // Translation function with parameter interpolation
  const t = (key: string, params?: Record<string, string | number>): string => {
    const keys = key.split('.');
    let value: any = currentTranslations;

    // Navigate through nested object structure
    for (const k of keys) {
      value = value?.[k];
    }

    // If translation not found, return the key
    if (value === undefined) {
      console.warn(`Translation missing for key: ${key}`);
      return key;
    }

    // Handle parameter interpolation
    if (params && typeof value === 'string') {
      return Object.entries(params).reduce((str, [paramKey, paramValue]) => {
        return str.replace(new RegExp(`{{${paramKey}}}`, 'g'), String(paramValue));
      }, value);
    }

    return String(value);
  };

  const value: TranslationContextType = {
    language,
    setLanguage,
    t,
    isLoading,
  };

  return (
    <TranslationContext.Provider value={value}>
      {children}
    </TranslationContext.Provider>
  );
};