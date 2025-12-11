"use client";

import { createContext, useContext, useState, useEffect } from "react";
import { DEFAULT_LOCALE } from "@/lib/i18n/types";

const LanguageContext = createContext(undefined);

export function LanguageProvider({ children }) {
    const [locale, setLocaleState] = useState(() => {
        // Use default locale on initial render to avoid hydration mismatch
        return DEFAULT_LOCALE;
    });

    // Load from localStorage after mount (client-side only)
    useEffect(() => {
        const stored = localStorage.getItem("locale");
        if (stored && (stored === "en" || stored === "ar")) {
            setLocaleState(stored);
        }
    }, []);

    const setLocale = (newLocale) => {
        setLocaleState(newLocale);
        localStorage.setItem("locale", newLocale);

        // Update document direction and language immediately
        if (newLocale === "ar") {
            document.documentElement.dir = "rtl";
        } else {
            document.documentElement.dir = "ltr";
        }
        document.documentElement.lang = newLocale;
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
