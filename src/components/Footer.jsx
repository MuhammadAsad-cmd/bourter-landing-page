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
                src="/images/logo2.svg"
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
          </div>

          <div className="flex flex-col gap-8 md:gap-12">
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
        <div className={`flex flex-col-reverse md:flex-row justify-between max-md:gap-12`}>
          <div>
            <div className={`flex items-center md:justify-start gap-7 mb-6`}>
              <Link
                href="https://www.instagram.com/bourter.bourter?igsh=MTBxd3c4eTFoZHpqNA%3D%3D&utm_source=qr"
                target="_blank"
                className="w-10 h-10 rounded-lg border border-white/20 flex items-center justify-center text-white hover:bg-primary transition-opacity"
                aria-label="Instagram"
              >
                <FaInstagram className="w-5 h-5" />
              </Link>

              <Link
                href="https://www.facebook.com/share/16ZT5N5tMs/?mibextid=wwXIfr"
                target="_blank"
                className="w-10 h-10 rounded-lg border border-white/20 flex items-center justify-center text-white hover:bg-primary transition-colors"
                aria-label="Facebook"
              >
                <FaFacebook className="w-5 h-5" />
              </Link>
              {/* <Link
                href="https://www.tiktok.com/@global.zair.guide?_r=1&_t=ZS-91JGZ7hG7n8"
                target="_blank"
                className="w-10 h-10 rounded-lg border border-white/20 flex items-center justify-center text-white hover:bg-primary transition-colors"
                aria-label="Tiktok"
              >
                <FaTiktok className="w-5 h-5" />
              </Link> */}
            </div>
            {/* Copyright */}
            <p className={`text-base text-white`}>
              <strong className="text-focus font-bold">
                {" "}
                {t("footer.copyright")}
              </strong>{" "}
              | {t("footer.allRightsReserved")}
            </p>
          </div>

          <div>
            <h3 className={`text-xl font-semibold text-white mb-4 md:mb-6`}>
              {t("footer.newsletter")}
            </h3>
            <form onSubmit={handleSubscribe} className={`flex`}>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder={t("footer.emailPlaceholder")}
                className={`flex-1 ${isRtl ? "rounded-r-[15px] border-r-[0.95px]" : "rounded-l-[15px] border-l-[0.95px]"} bg-white/10 border-y-[0.95px] border-white px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:border-primary transition-colors ${isRtl ? "text-right" : ""}`}
                required
              />
              <button
                type="submit"
                className={`${isRtl ? "rounded-l-[15px]" : "rounded-r-[15px]"} bg-primary border-y-[0.95px] border-white cursor-pointer px-6 py-3 text-lg font-semibold text-white hover:opacity-90 transition-opacity whitespace-nowrap shadow-[0px_3.81px_36.19px_0px_#FFFFFF40]`}
              >
                {t("footer.subscribe")}
              </button>
            </form>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
