"use client";
import { useEffect } from "react";
import { LanguageProvider } from "@/lib/i18n/language-context";
import { APIProvider } from "@vis.gl/react-google-maps";

export default function MainLayout({ children }) {
  useEffect(() => {
    // Load Places library if not already loaded
    if (typeof window !== "undefined" && !window.google?.maps?.places) {
      const script = document.createElement("script");
      script.src = `https://maps.googleapis.com/maps/api/js?key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}&libraries=places`;
      script.async = true;
      script.defer = true;
      // Only add if not already present
      if (!document.querySelector(`script[src*="libraries=places"]`)) {
        document.head.appendChild(script);
      }
    }
  }, []);

  return (
    <APIProvider apiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || ""}>
      <LanguageProvider>{children}</LanguageProvider>
    </APIProvider>
  );
}
