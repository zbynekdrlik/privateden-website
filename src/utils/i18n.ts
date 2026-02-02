import skTranslations from "../content/i18n/sk.json";
import plTranslations from "../content/i18n/pl.json";
import enTranslations from "../content/i18n/en.json";

export type Lang = "sk" | "pl" | "en";
export const SUPPORTED_LANGS: Lang[] = ["sk", "pl", "en"];
export const DEFAULT_LANG: Lang = "sk";

const translations: Record<Lang, typeof skTranslations> = {
  sk: skTranslations,
  pl: plTranslations,
  en: enTranslations,
};

export function t(lang: Lang) {
  return translations[lang] || translations[DEFAULT_LANG];
}

export function getLocalizedPath(lang: Lang, path: string): string {
  return `/${lang}${path}`;
}

export function getLangFromUrl(url: URL): Lang {
  const [, langSegment] = url.pathname.split("/");
  if (SUPPORTED_LANGS.includes(langSegment as Lang)) {
    return langSegment as Lang;
  }
  return DEFAULT_LANG;
}

export function getAllLangPaths() {
  return SUPPORTED_LANGS.map((lang) => ({ params: { lang } }));
}
