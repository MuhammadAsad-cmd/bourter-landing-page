"use client";

import { Languages } from "lucide-react";
import { useLanguage } from "@/lib/i18n/language-context";
import { LOCALES } from "@/lib/i18n/types";
import { useEffect, useState, useRef } from "react";

const localeLabels = {
  en: "English",
  ar: "العربية",
};

export default function LanguageSwitcher({ theme = "dark" }) {
  const { locale, setLocale } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);
  const isDarkTheme = theme === "dark";
  // Both themes now use white text since light theme has dark background
  const textColor = "text-white";
  const hoverBg = "hover:bg-white/10";

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  const handleLanguageChange = (newLocale) => {
    setLocale(newLocale);
    setIsOpen(false);
  };

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`h-9 w-fit px-2 rounded-md flex items-center justify-center transition-colors cursor-pointer ${hoverBg}`}
        aria-label="Change language"
      >
        <Languages className={`h-4 w-4 ${textColor}`} />
        {/* show selected language */}
        <span className={`${textColor} text-sm`}>{localeLabels[locale]}</span>
      </button>

      {isOpen && (
        <div
          className={`absolute  mt-2 w-32 rounded-md shadow-lg bg-white border border-gray-200 z-50 ${
            locale === "ar" ? "left-0" : "right-0"
          }`}
        >
          <div className="py-1">
            {LOCALES.map((loc) => (
              <button
                key={loc}
                onClick={() => handleLanguageChange(loc)}
                className={`w-full text-left px-4 py-2 text-sm hover:bg-gray-100 transition-colors cursor-pointer ${
                  locale === loc ? "bg-gray-50 font-medium" : ""
                }`}
              >
                {localeLabels[loc]}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
