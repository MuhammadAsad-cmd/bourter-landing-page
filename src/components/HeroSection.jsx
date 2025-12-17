"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import Image from "next/image";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import Link from "next/link";
import { useLanguage } from "@/lib/i18n/language-context";
import { getTranslations } from "@/lib/i18n/get-translations";
import { useTranslations } from "@/lib/i18n/use-translations";
import LanguageSwitcher from "./LanguageSwitcher";

export default function HeroSection() {
  const { locale } = useLanguage();
  const messages = getTranslations(locale);
  const { t } = useTranslations(messages);

  return (
    <section className="relative h-screen sm:h-[110vh] w-full overflow-hidden">
      <header className="absolute top-0 left-0 right-0 z-20 h-[90px] sm:h-24 flex items-center justify-between backdrop-blur-[20px] border border-b-[#E9EBEC1A]">
        <div className="container flex items-center justify-between ">
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
          <div className="flex items-center gap-2">
            <Link
              href="/join-as-driver"
              className=" rounded-lg px-2.5 sm:px-6 py-2 sm:py-2.5 cursor-pointer text-sm font-bold text-white transition-all hover:opacity-90"
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
              className=" rounded-lg px-2.5 sm:px-6 py-2 sm:py-2.5 cursor-pointer text-sm font-bold text-white transition-all hover:opacity-90"
              style={{
                background:
                  "linear-gradient(130.4deg, #0053A2 15.06%, #06294A 87.46%)",
                boxShadow:
                  "2px 2px 2px 0px #FFFFFF33 inset, -2px -2px 2px 0px #FFFFFF33 inset",
              }}
            >
              {t("navigation.joinCompany")}
            </Link>
            <LanguageSwitcher />
          </div>
        </div>
      </header>

      <Swiper
        key={locale} // Force re-render when language changes
        modules={[Navigation, Pagination, Autoplay]}
        spaceBetween={0}
        slidesPerView={1}
        loop={true}
        autoplay={{
          delay: 3000,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
          renderBullet: (index, className) => {
            return `<span class="${className} hero-pagination-bullet"></span>`;
          },
        }}
        className="h-full w-full pt-48 sm:pt-36 sm:pb-[46px]"
      >
        <SwiperSlide>
          <div className="relative h-full w-full">
            {/* Background Image */}
            <div className="absolute inset-0">
              <Image
                src="/images/heroimg/8.png"
                alt="Hero slide 2"
                width={1000}
                height={1000}
                className="object-cover w-full h-full"
              />
              <div className="absolute inset-0 bg-[#06294A] opacity-60"></div>
            </div>

            <div className="relative z-10 flex h-full flex-col justify-center">
              <div className="container flex flex-1 items-center">
                <div className="max-w-4xl">
                  <h1 className="mb-6 text-4xl font-bold leading-tight md:text-5xl lg:text-[56px] text-white">
                    <span>
                      {t("hero.slide1.title")}
                      <span className="text-[#E57F1D] font-black">
                        {" "}
                        {t("hero.slide1.titleHighlight1")}
                      </span>{" "}
                      {t("hero.slide1.subtitle")}
                      <span className="text-[#E57F1D] font-black">
                        {" "}
                        {t("hero.slide1.titleHighlight2")}
                      </span>
                    </span>
                  </h1>

                  {/* Description */}
                  <p className="mb-8 text-base sm:text-lg md:text-2xl text-white max-w-[664px]">
                    {t("hero.slide1.description")}
                  </p>

                  {/* App Download Buttons */}
                  <div className="flex items-center gap-6 w-full">
                    <Link href="#">
                      <Image
                        src="/images/btn.svg"
                        alt="Play Store"
                        width={200}
                        height={50}
                        className="object-contain w-full max-w-[261px] h-20"
                      />
                    </Link>
                    <Link
                      target="_blank"
                      href="https://play.google.com/store/apps/details?id=com.bitknit.global_zahir_guide"
                    >
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
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="relative h-full w-full">
            {/* Background Image */}
            <div className="absolute inset-0">
              <Image
                src="/images/heroimg/2.png"
                alt="Hero slide 1"
                width={1000}
                height={1000}
                className="object-cover w-full h-full"
              />
              <div className="absolute inset-0 bg-[#06294A] opacity-60"></div>
            </div>

            <div className="relative z-10 flex h-full flex-col justify-center">
              <div className="container flex flex-1 items-center">
                <div className="max-w-4xl">
                  <h1 className="mb-6 text-4xl font-bold leading-tight md:text-5xl lg:text-[56px] text-white">
                    <span>
                      {t("hero.slide2.title")}{" "}
                      <span className="text-[#E57F1D] font-black">
                        {" "}
                        {t("hero.slide2.titleHighlight1")}{" "}
                      </span>{" "}
                      {t("hero.slide2.subtitle")}{" "}
                      <span className="text-[#E57F1D] font-black">{t("hero.slide2.titleHighlight2")} </span>
                    </span>
                  </h1>

                  {/* Description */}
                  <p className="mb-8 text-base sm:text-lg md:text-2xl text-white max-w-[664px]">
                    {t("hero.slide2.description")}
                  </p>

                  {/* App Download Buttons */}
                  <div className="flex items-center gap-6 w-full">
                    <Link href="#">
                      <Image
                        src="/images/btn.svg"
                        alt="app Store"
                        width={200}
                        height={50}
                        className="object-contain w-full max-w-[261px] h-20"
                      />
                    </Link>
                    <Link
                      target="_blank"
                      href="https://play.google.com/store/apps/details?id=com.bitknit.global_zahir_guide"
                    >
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
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="relative h-full w-full">
            {/* Background Image */}
            <div className="absolute inset-0">
              <Image
                src="/images/heroimg/1.png"
                alt="Hero slide 3"
                width={1000}
                height={1000}
                className="object-cover w-full h-full"
              />
              <div className="absolute inset-0 bg-[#06294A] opacity-60"></div>
            </div>

            <div className="relative z-10 flex h-full flex-col justify-center">
              <div className="container flex flex-1 items-center">
                <div className="max-w-4xl">
                  <h1 className="mb-6 text-4xl font-bold leading-tight md:text-5xl lg:text-[56px] text-white">
                    <span>
                      {t("hero.slide3.title")}
                      <span className="text-[#E57F1D] font-black">
                        {" "}
                        {t("hero.slide3.titleHighlight1")}
                      </span>{" "}
                      {t("hero.slide3.subtitle")}
                      <span className="text-[#E57F1D] font-black"> {t("hero.slide3.titleHighlight2")} </span>
                    </span>
                  </h1>

                  {/* Description */}
                  <p className="mb-8 text-base sm:text-lg md:text-2xl text-white max-w-[664px]">
                    {t("hero.slide3.description")}
                  </p>

                  {/* App Download Buttons */}
                  <div className="flex items-center gap-6 w-full">
                    <Link href="#">
                      <Image
                        src="/images/btn.svg"
                        alt="Play Store"
                        width={200}
                        height={50}
                        className="object-contain w-full max-w-[261px] h-20"
                      />
                    </Link>
                    <Link href="https://play.google.com/store/apps/details?id=com.bitknit.global_zahir_guide">
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
          </div>
        </SwiperSlide>
      </Swiper>
    </section>
  );
}
