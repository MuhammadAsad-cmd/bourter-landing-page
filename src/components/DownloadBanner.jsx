"use client";

import Image from "next/image";
import Link from "next/link";
import { useLanguage } from "@/lib/i18n/language-context";
import { getTranslations } from "@/lib/i18n/get-translations";
import { useTranslations } from "@/lib/i18n/use-translations";

const DownloadBanner = () => {
  const { locale } = useLanguage();
  const messages = getTranslations(locale);
  const { t } = useTranslations(messages);

  return (
    <section className="py-12 md:py-20">
      <div className="container">
        <div className="relative px-10 py-[50px] rounded-[40px] overflow-hidden bg-primary">
          {/* Background Frame Image */}
          <div className="absolute inset-0 z-999">
            <Image
              src="/images/Frame 1686555375.svg"
              alt="Frame Background"
              fill
              className="object-cover"
              priority
            />
          </div>

          {/* Green Gradient Overlay (Vector) */}
          <div className="absolute inset-0 backdrop-blur-[266.79168701171875px]">
            <Image
              src="/images/Vector 2.svg"
              alt="Green Gradient Overlay"
              fill
              className="object-cover"
              priority
            />
          </div>

          {/* Content */}
          <div className="relative z-9999 flex flex-col items-center text-center">
            {/* Headline */}
            <h2 className="text-3xl md:text-4xl lg:text-[49px] font-medium text-white mb-4 md:mb-6">
              {t("downloadBanner.title")}{" "}
              <span className="font-bold text-focus">
                {" "}
                {t("downloadBanner.titleHighlight")}{" "}
              </span>{" "}
            </h2>

            {/* Sub-headline */}
            <p className="text-base md:text-xl text-white mb-6 max-w-2xl opacity-90">
              {t("downloadBanner.description")}
            </p>

            {/* App Download Buttons */}
            <div className="flex items-center justify-center gap-6 w-full">
              <Link href="#" title="coming soon">
                <Image
                  src="/images/btn.svg"
                  alt="app Store"
                  width={200}
                  height={50}
                  className="object-contain w-full max-w-[261px] h-20"
                />
              </Link>
              <Link target="_blank" href="https://play.google.com/store/apps/details?id=com.bitknit.global_zahir_guide">
                <Image
                  src="/images/btn (1).svg"
                  alt="play Store"
                  width={200}
                  height={50}
                  className="object-contain w-full max-w-[261px] h-20"
                />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DownloadBanner;
