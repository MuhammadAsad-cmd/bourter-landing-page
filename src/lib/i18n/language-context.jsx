"use client";

import { createContext, useContext, useState, useEffect } from "react";
import { DEFAULT_LOCALE } from "@/lib/i18n/types";

const LanguageContext = createContext(undefined);

export function LanguageProvider({ children }) {
    const [locale, setLocaleState] = useState(() => {
        // Use default locale on initial render to avoid hydration mismatch
        return DEFAULT_LOCALE;
    });

    const applyLocaleToDocument = (nextLocale) => {
        if (typeof document === "undefined") return;

        document.documentElement.dir = nextLocale === "ar" ? "rtl" : "ltr";
        document.documentElement.lang = nextLocale;
    };

    // Load from localStorage after mount (client-side only)
    useEffect(() => {
        const stored = localStorage.getItem("locale");
        const nextLocale =
            stored && (stored === "en" || stored === "ar")
                ? stored
                : DEFAULT_LOCALE;

        // Keep `document.dir/lang` in sync BEFORE locale-driven components (e.g. Swiper)
        // mount/re-mount, to avoid RTL/LTR initialization issues on refresh.
        applyLocaleToDocument(nextLocale);
        setLocaleState(nextLocale);
    }, []);

    const setLocale = (newLocale) => {
        setLocaleState(newLocale);
        localStorage.setItem("locale", newLocale);

        // Update document direction and language immediately
        applyLocaleToDocument(newLocale);
    };

    return (
        <LanguageContext.Provider value={{ locale, setLocale }}>
            {children}
        </LanguageContext.Provider>
    );
}

export function useLanguage() {
    const context = useContext(LanguageContext);
    if (!context) {
        throw new Error("useLanguage must be used within LanguageProvider");
    }
    return context;
}
