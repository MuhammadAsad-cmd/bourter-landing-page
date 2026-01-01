"use client";
import { LanguageProvider } from "@/lib/i18n/language-context";

export default function MainLayout({ children }) {
  return (
    <LanguageProvider>{children}</LanguageProvider>
  );
}
