import { createContext, useContext, useState, type ReactNode } from 'react';
import de from './de.json';
import en from './en.json';

export type Lang = 'de' | 'en';
type Dict = typeof de;

const dicts: Record<Lang, Dict> = { de, en };

interface I18nContextValue {
  lang: Lang;
  t: Dict;
  setLang: (lang: Lang) => void;
}

const I18nContext = createContext<I18nContextValue>({
  lang: 'de',
  t: de,
  setLang: () => {},
});

export function I18nProvider({ children }: { children: ReactNode }) {
  const [lang, setLang] = useState<Lang>('de');

  return (
    <I18nContext.Provider value={{ lang, t: dicts[lang], setLang }}>
      {children}
    </I18nContext.Provider>
  );
}

export function useI18n() {
  return useContext(I18nContext);
}
