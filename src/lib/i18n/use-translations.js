"use client";

import { useCallback, useMemo } from "react";
import { getNestedValue } from "./get-translations";

/**
 * Custom hook for type-safe translations
 * @param {object} messages - Translation messages object
 * @returns {object} Object with translation function `t`
 */
export function useTranslations(messages) {
  const t = useCallback(
    (key, defaultValue) => {
      const value = getNestedValue(messages, key);
      return typeof value === "string" ? value : defaultValue || key;
    },
    [messages]
  );

  return useMemo(() => ({ t }), [t]);
}
