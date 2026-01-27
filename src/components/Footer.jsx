"use client";

import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import {
  FaInstagram,
  FaTwitter,
  FaFacebook,
  FaYoutube,
  FaEnvelope,
  FaMapMarkerAlt,
  FaPhone,
  FaTiktok,
} from "react-icons/fa";
import { useLanguage } from "@/lib/i18n/language-context";
import { getTranslations } from "@/lib/i18n/get-translations";
import { useTranslations } from "@/lib/i18n/use-translations";

const Footer = () => {
  const { locale } = useLanguage();
  const messages = getTranslations(locale);
  const { t } = useTranslations(messages);
  const [email, setEmail] = useState("");
  const isRtl = locale === "ar";

  const handleSubscribe = (e) => {
    e.preventDefault();
    setEmail("");
  };

  return (
    <footer className="bg-black px-4 text-white">
      <div className="container py-12 md:py-16">
        <div className={`flex justify-between mb-8 md:mb-12 border-b border-[#737E9D]/40 pb-12 max-md:flex-col max-md:gap-12`}>
          <div className="flex flex-col">
            <div className="mb-6 flex">
              <Image
                src={locale === "en" ? "/images/logo_eng.png" : "/images/logo_arb_light.png"}
                alt="Bourter Logo"
                width={200}
                height={100}
                className="object-contain h-full"
                priority
              />
            </div>

            <p className={`text-base md:text-[22px] text-white mb-8 md:mb-12 ${isRtl ? "text-right" : ""}`}>
              {t("footer.companyDesc")}
            </p>
            {/* Social Media Icons */}
            <div className={`flex items-center gap-4 ${isRtl ? "justify-end" : "justify-start"}`}>
              <Link
                href="https://www.instagram.com/bourter.bourter?igsh=MTBxd3c4eTFoZHpqNA%3D%3D&utm_source=qr"
                target="_blank"
                className="w-12 h-12 rounded-xl border border-white/20 flex items-center justify-center text-white hover:bg-primary hover:border-primary transition-all duration-300 hover:scale-110"
                aria-label="Instagram"
              >
                <FaInstagram className="w-5 h-5" />
              </Link>

              <Link
                href="https://www.facebook.com/share/16ZT5N5tMs/?mibextid=wwXIfr"
                target="_blank"
                className="w-12 h-12 rounded-xl border border-white/20 flex items-center justify-center text-white hover:bg-primary hover:border-primary transition-all duration-300 hover:scale-110"
                aria-label="Facebook"
              >
                <FaFacebook className="w-5 h-5" />
              </Link>
            </div>
          </div>

          <div className="flex flex-col gap-8 md:gap-12">
            <div className="flex flex-col gap-2">
              <h3 className={`text-xl md:text-2xl font-bold text-white mb-4`}>
                {t("footer.newsletter")}
              </h3>
              <form onSubmit={handleSubscribe} className={`flex flex-col sm:flex-row gap-3`}>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder={t("footer.emailPlaceholder")}
                  className={`flex-1 ${isRtl ? "sm:rounded-r-[15px] sm:border-r-[0.95px] rounded-[15px]" : "sm:rounded-l-[15px] sm:border-l-[0.95px] rounded-[15px]"} bg-white/10 border-[0.95px] border-white/30 px-4 py-3.5 text-white placeholder-gray-400 focus:outline-none focus:border-primary focus:bg-white/15 transition-all ${isRtl ? "text-right" : "text-left"}`}
                  required
                />
                <button
                  type="submit"
                  className={`${isRtl ? "sm:rounded-l-[15px] rounded-[15px]" : "sm:rounded-r-[15px] rounded-[15px]"} bg-primary border-[0.95px] border-primary cursor-pointer px-6 py-3.5 text-base font-semibold text-white hover:opacity-90 hover:shadow-lg transition-all whitespace-nowrap shadow-[0px_3.81px_36.19px_0px_#FFFFFF40]`}
                >
                  {t("footer.subscribe")}
                </button>
              </form>
            </div>
            <div>
              <h3 className={`text-xl md:text-2xl font-bold text-white mb-4 md:mb-6`}>
                {t("footer.contactUs")}
              </h3>
              <div className="space-y-3 md:space-y-4">
                <div className={`flex items-center gap-3 text-base md:text-lg`}>
                  <FaEnvelope className="w-5 h-5 text-white shrink-0" />
                  <a
                    href="mailto:info@bourter.com"
                    className="text-white hover:text-focus transition-colors"
                  >
                    info@bourter.com
                  </a>
                </div>

                <div className={`flex items-center gap-3 text-base md:text-lg`}>
                  <FaPhone className="w-5 h-5 text-white shrink-0" />
                  <a
                    href="tel:03134001049"
                    className="text-white hover:text-focus transition-colors"
                    dir="ltr"
                  >
                    0313 4001 049
                  </a>
                </div>
                <div className={`flex items-center gap-3 text-base md:text-lg`}>
                  <FaMapMarkerAlt className="w-5 h-5 text-white shrink-0" />
                  <p
                    className="text-white hover:text-focus transition-colors"
                    dir="ltr"
                  >
                    Libya tripoly
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className={`flex flex-col lg:flex-row justify-between items-start lg:items-center gap-8 lg:gap-12`}>
          <div className={`flex flex-col gap-6 w-full lg:w-auto ${isRtl ? "lg:items-end" : "lg:items-start"}`}>
              <p className={`text-sm md:text-base text-white/80`}>
                <strong className="text-focus font-bold">
                  {t("footer.copyright")}
                </strong>{" "}
                <span className="text-white/60">|</span> {t("footer.allRightsReserved")}
              </p>
          </div>

          <div className={`w-full lg:w-auto lg:max-w-md ${isRtl ? "lg:text-right" : "lg:text-left"}`}>
            <Link
              href="/privacy-policy"
              className="text-white/80 hover:text-focus transition-colors text-sm md:text-base underline-offset-4 hover:underline"
            >
              {t("footer.privacyPolicy")}
            </Link>

          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
