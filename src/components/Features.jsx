"use client";

import Image from "next/image";
import { useLanguage } from "@/lib/i18n/language-context";
import { getTranslations } from "@/lib/i18n/get-translations";
import { useTranslations } from "@/lib/i18n/use-translations";

const Features = () => {
  const { locale } = useLanguage();
  const messages = getTranslations(locale);
  const { t } = useTranslations(messages);

  return (
    <div className="container space-y-20 md:space-y-32 w-full md:py-16 py-10">
      <div className="flex flex-col items-center gap-12 lg:flex-row lg:items-center justify-between w-full">
        <div className="w-full lg:w-1/2 flex justify-start">
          <div className="relative">
            <Image
              src="/images/Group2.png"
              alt="Real-Time Ride Tracking & Navigation"
              width={416}
              height={560}
              className="object-contain"
              priority
            />
          </div>
        </div>
        <div className="w-full lg:w-1/2">
          <h2 className="mb-6 text-3xl font-semibold leading-tight text-black md:text-4xl lg:text-[55px]">
            {t("features.feature1Title")}
          </h2>
          <p className="mb-8 text-base text-black md:text-[22px]">
            {t("features.feature1Desc")}
          </p>
          <button
            className="rounded-xl px-10 py-5 text-xl cursor-pointer font-medium text-white transition-all hover:opacity-90"
            style={{
              background:
                "linear-gradient(130.4deg, #0053A2 15.06%, #06294A 87.46%)",
              boxShadow:
                "1.3px 1.3px 1.3px 0px #FFFFFF33 inset, -1.3px -1.3px 1.3px 0px #FFFFFF33 inset",
            }}
          >
            Track Your Ride
          </button>
        </div>
      </div>

      <div className="flex flex-col items-center gap-12 lg:flex-row-reverse lg:items-center justify-between w-full">
        <div className="w-full lg:w-1/2 flex justify-end">
          <div className="relative">
            <Image
              src="/images/Group3.png"
              alt="Choose Your Preferred Ride Type"
              width={416}
              height={560}
              className="object-contain"
              priority
            />
          </div>
        </div>

        <div className="w-full lg:w-1/2">
          <h2 className="mb-6 text-3xl font-semibold leading-tight text-black md:text-4xl lg:text-[55px]">
            {t("features.feature2Title")}
          </h2>
          <p className="mb-8 text-base text-black md:text-[22px]">
            {t("features.feature2Desc")}
          </p>
          <button
            className="rounded-xl px-10 py-5 text-xl cursor-pointer font-medium text-white transition-all hover:opacity-90"
            style={{
              background:
                "linear-gradient(130.4deg, #0053A2 15.06%, #06294A 87.46%)",
              boxShadow:
                "1.3px 1.3px 1.3px 0px #FFFFFF33 inset, -1.3px -1.3px 1.3px 0px #FFFFFF33 inset",
            }}
          >
            Book a Ride
          </button>
        </div>
      </div>

      <div className="flex flex-col items-center gap-12 lg:flex-row lg:items-center justify-between w-full">
        <div className="w-full lg:w-1/2 flex justify-start">
          <div className="relative">
            <Image
              src="/images/Group4.png"
              alt="Secure Payments & Easy Transactions"
              width={416}
              height={560}
              className="object-contain"
              priority
            />
          </div>
        </div>

        <div className="w-full lg:w-1/2">
          <h2 className="mb-6 text-3xl font-semibold leading-tight text-black md:text-4xl lg:text-[55px]">
            {t("features.feature3Title")}
          </h2>
          <p className="mb-8 text-base leading-relaxed text-black md:text-[22px]">
            {t("features.feature3Desc")}
          </p>
          <button
            className="rounded-xl px-10 py-5 text-xl cursor-pointer font-medium text-white transition-all hover:opacity-90"
            style={{
              background:
                "linear-gradient(130.4deg, #0053A2 15.06%, #06294A 87.46%)",
              boxShadow:
                "1.3px 1.3px 1.3px 0px #FFFFFF33 inset, -1.3px -1.3px 1.3px 0px #FFFFFF33 inset",
            }}
          >
            {t("common.learnMore")}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Features;
