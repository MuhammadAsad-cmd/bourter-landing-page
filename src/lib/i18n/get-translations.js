import enTranslations from "@/locales/en.json";
import arTranslations from "@/locales/ar.json";

const translations = {
  en: enTranslations,
  ar: arTranslations,
};

/**
 * Get translations for a specific locale
 * @param {string} locale - The locale to get translations for
 * @returns {object} Translation messages for the locale
 */
export function getTranslations(locale) {
  return translations[locale] || translations.en;
}

/**
 * Get nested value from an object using dot notation path
 * @param {object} obj - The object to search in
 * @param {string} path - Dot notation path (e.g., "common.welcome")
 * @returns {string|undefined} The value at the path if it's a string, otherwise undefined
 */
export function getNestedValue(obj, path) {
  const result = path
    .split(".")
    .reduce((current, prop) => current?.[prop], obj);
  return typeof result === "string" ? result : undefined;
}

/**
 * Type-safe translation getter
 * @param {object} messages - Translation messages object
 * @param {string} key - Translation key in dot notation
 * @param {string} defaultValue - Optional default value if key not found
 * @returns {string} Translated string
 */
export function t(messages, key, defaultValue) {
  const value = getNestedValue(messages, key);
  return value ?? defaultValue ?? key;
}
