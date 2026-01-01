"use client";

import Image from "next/image";
import Link from "next/link";
import { useLanguage } from "@/lib/i18n/language-context";
import { getTranslations } from "@/lib/i18n/get-translations";
import { useTranslations } from "@/lib/i18n/use-translations";
import LanguageSwitcher from "./LanguageSwitcher";
import { Menu, X } from "lucide-react";
import { useState, useEffect, useRef } from "react";

export default function Header({ theme = "dark" }) {
  const { locale } = useLanguage();
  const messages = getTranslations(locale);
  const { t } = useTranslations(messages);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const mobileMenuRef = useRef(null);

  // Close mobile menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (mobileMenuRef.current && !mobileMenuRef.current.contains(event.target)) {
        setIsMobileMenuOpen(false);
      }
    };

    if (isMobileMenuOpen) {
      setTimeout(() => {
        document.addEventListener("mousedown", handleClickOutside);
      }, 100);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isMobileMenuOpen]);

  const isDarkTheme = theme === "dark";
  const headerBg = isDarkTheme 
    ? "backdrop-blur-[20px] border-b-[#E9EBEC1A]" 
    : "bg-[#06294A] backdrop-blur-xl border-b-[#06294A]/20 shadow-lg";
  const textColor = isDarkTheme ? "text-white" : "text-white";
  const hoverBg = isDarkTheme ? "hover:bg-white/10" : "hover:bg-white/10";
  const mobileMenuBg = isDarkTheme 
    ? "bg-white/10 backdrop-blur-lg border-gray-200" 
    : "bg-[#06294A]/95 backdrop-blur-md border-white/10";

  return (
    <header className={`sticky top-0 left-0 right-0 z-50 ${headerBg} border`} ref={mobileMenuRef}>
      <div className="h-[90px] sm:h-24 flex items-center justify-between">
        <div className="container flex items-center justify-between">
          <Link href="/" className="flex">
            <Image
              src={locale === "en" ? "/images/logo_eng.png" : "/images/logo_arb_light.png"}
              alt="Bourter Logo"
              width={150}
              height={100}
              className="object-contain w-full h-full"
              priority
            />
          </Link>
          {/* Desktop Navigation - Hidden on small screens */}
          <div className="hidden sm:flex items-center gap-2">
            <Link
              href="/join-as-driver"
              className="rounded-lg px-2.5 sm:px-6 py-2 sm:py-2.5 cursor-pointer text-sm font-bold transition-all hover:opacity-90"
              style={{
                background:
                  "linear-gradient(130.4deg, #0053A2 15.06%, #06294A 87.46%)",
                color: "white",
                boxShadow:
                  "2px 2px 2px 0px #FFFFFF33 inset, -2px -2px 2px 0px #FFFFFF33 inset",
              }}
            >
              {t("navigation.joinDriver")}
            </Link>
            <Link
              target="_blank"
              href="#"
              className="rounded-lg px-2.5 sm:px-6 py-2 sm:py-2.5 cursor-pointer text-sm font-bold transition-all hover:opacity-90"
              style={{
                background:
                  "linear-gradient(130.4deg, #0053A2 15.06%, #06294A 87.46%)",
                color: "white",
                boxShadow:
                  "2px 2px 2px 0px #FFFFFF33 inset, -2px -2px 2px 0px #FFFFFF33 inset",
              }}
            >
              {t("navigation.joinCompany")}
            </Link>
            <LanguageSwitcher theme={theme} />
          </div>

          {/* Mobile Navigation - Visible on small screens */}
          <div className="flex sm:hidden items-center gap-2">
            <LanguageSwitcher theme={theme} />
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className={`h-9 w-9 rounded-md flex items-center justify-center transition-colors cursor-pointer ${hoverBg}`}
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? (
                <X className={`h-5 w-5 ${textColor}`} />
              ) : (
                <Menu className={`h-5 w-5 ${textColor}`} />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Expanded - Full Width */}
      <div
        className={`sm:hidden w-full ${mobileMenuBg} border-t shadow-lg transition-all duration-300 ease-in-out overflow-hidden ${
          isMobileMenuOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="container py-6 px-4">
          <div className="flex flex-col gap-4">
            <Link
              href="/join-as-driver"
              onClick={() => setIsMobileMenuOpen(false)}
              className="w-full rounded-lg px-6 py-4 text-base font-bold text-white transition-all hover:opacity-90 active:scale-[0.98] text-center shadow-md"
              style={{
                background:
                  "linear-gradient(130.4deg, #0053A2 15.06%, #06294A 87.46%)",
                boxShadow:
                  "2px 2px 2px 0px #FFFFFF33 inset, -2px -2px 2px 0px #FFFFFF33 inset",
              }}
            >
              {t("navigation.joinDriver")}
            </Link>
            <Link
              target="_blank"
              href="#"
              onClick={() => setIsMobileMenuOpen(false)}
              className="w-full rounded-lg px-6 py-4 text-base font-bold text-white transition-all hover:opacity-90 active:scale-[0.98] text-center shadow-md"
              style={{
                background:
                  "linear-gradient(130.4deg, #0053A2 15.06%, #06294A 87.46%)",
                boxShadow:
                  "2px 2px 2px 0px #FFFFFF33 inset, -2px -2px 2px 0px #FFFFFF33 inset",
              }}
            >
              {t("navigation.joinCompany")}
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}

