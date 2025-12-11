"use client";

import Image from "next/image";
import { useLanguage } from "@/lib/i18n/language-context";
import { getTranslations } from "@/lib/i18n/get-translations";
import { useTranslations } from "@/lib/i18n/use-translations";

const HowItWorks = () => {
  const { locale } = useLanguage();
  const messages = getTranslations(locale);
  const { t } = useTranslations(messages);

  const steps = [
    {
      number: "1",
      description: t("howItWorks.step1.description"),
      action: t("howItWorks.step1.action"),
    },
    {
      number: "2",
      description: t("howItWorks.step2.description"),
      action: t("howItWorks.step2.action"),
    },
    {
      number: "3",
      description: t("howItWorks.step3.description"),
      action: t("howItWorks.step3.action"),
    },
    {
      number: "4",
      description: t("howItWorks.step4.description"),
      action: t("howItWorks.step4.action"),
    },
  ];

  return (
    <section className="bg-white py-12 md:py-20">
      <div className="container">
        <div className="text-center mb-8 md:mb-12">
          <h2 className="text-3xl md:text-4xl lg:text-[55px] font-semibold mb-4">
            {t("howItWorks.title")} <span className="text-focus font-bold">{t("howItWorks.titleHighlight")}</span>
          </h2>
          <p className="text-base md:text-[22px] text-black max-w-[664px] mx-auto">
            {t("howItWorks.description")}
          </p>
        </div>

        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-16">
          <div className="w-full lg:w-1/2 flex justify-center lg:justify-start">
            <div className="relative">
              <Image
                src="/images/arabic man.svg"
                alt="Arabic Man"
                width={500}
                height={700}
                className="object-contain"
                priority
              />
            </div>
          </div>

          <div className="w-full lg:w-1/2 space-y-4 md:space-y-6">
            {steps.map((step, index) => (
              <div
                key={index}
                className="relative rounded-[28px] p-4"
                style={{
                  background:
                    "linear-gradient(180deg, rgba(6, 41, 74, 0.2) 0%, rgba(6, 41, 74, 0.04) 100%)",
                  backdropFilter: "blur(27.953615188598633px)",
                }}
              >
                <div className="absolute right-4 top-1/2 -translate-y-1/2">
                  <span
                    className="text-5xl md:text-[74px] font-medium"
                    style={{
                      background:
                        "linear-gradient(180deg, #06294A 20.76%, #E57F1D 50%, rgba(6, 41, 74, 0) 76.17%)",
                      WebkitBackgroundClip: "text",
                      WebkitTextFillColor: "transparent",
                      backgroundClip: "text",
                      color: "transparent",
                    }}
                  >
                    {step.number}
                  </span>
                </div>

                <div className="relative z-10 pr-20 md:pr-24">
                  <p className="text-base md:text-xl text-black mb-2 leading-relaxed">
                    {step.description}
                  </p>
                  <p className="text-base md:text-[31px] font-semibold text-primary">
                    {step.action}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
