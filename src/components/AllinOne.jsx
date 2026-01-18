"use client";

import Image from "next/image";
import Link from "next/link";
import { useLanguage } from "@/lib/i18n/language-context";
import { getTranslations } from "@/lib/i18n/get-translations";
import { useTranslations } from "@/lib/i18n/use-translations";

const AllinOne = () => {
  const { locale } = useLanguage();
  const messages = getTranslations(locale);
  const { t } = useTranslations(messages);

  return (
    <div className="container flex items-center justify-between gap-12 my-[30px] md:my-[60px]">
      <div className="w-full lg:w-[60%]">
        <h2 className="mb-4 text-4xl font-bold leading-tight md:text-5xl lg:text-6xl">
          {t("allInOne.title")} <span className="text-primary">{t("allInOne.titleHighlight")}</span>{" "}
        </h2>

        <p className="mb-8 text-base leading-relaxed text-black md:text-lg">
          {t("allInOne.description")}
        </p>

        <div className="flex items-center gap-6 w-full">
          <Link href="#">
            <Image
              src="/images/pbtn.svg"
              alt="Play Store"
              width={200}
              height={50}
              className="object-contain w-[261px] h-20"
            />
          </Link>
          <Link target="_blank" href="">
            <Image
              src="/images/pbtn (1).svg"
              alt="App Store"
              width={200}
              height={50}
              className="object-contain w-[261px] h-20"
            />
          </Link>
        </div>
      </div>

      <div className="hidden w-full lg:block lg:w-[40%]">
        <div className="relative w-full h-full">
          <Image
            src="/images/Group1.png"
            alt="All in One App Mockups"
            width={416}
            height={560}
            className="object-contain w-full h-full"
          />
        </div>
      </div>
    </div>
  );
};

export default AllinOne;
