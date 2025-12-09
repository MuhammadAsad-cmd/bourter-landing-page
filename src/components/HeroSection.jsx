"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import Image from "next/image";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import Link from "next/link";

export default function HeroSection() {
  return (
    <section className="relative h-screen sm:h-[130vh] w-full overflow-hidden">
      <header className="absolute top-0 left-0 right-0 z-20 h-24 flex items-center justify-between backdrop-blur-[20px] border border-b-[#E9EBEC1A]">
        <div className="container flex items-center justify-between ">
          <Link href="/" className="flex">
            <Image
              src="/images/logo.svg"
              alt="Bourter Logo"
              width={250}
              height={100}
              className="object-contain h-full w-[180px] sm:w-[250px]"
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
              Join as Driver
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
              Join as Company
            </Link>
          </div>
        </div>
      </header>

      <Swiper
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
        className="h-full w-full pt-40 sm:pt-36 sm:pb-[46px]"
      >
        <SwiperSlide>
          <div className="relative h-full w-full">
            {/* Background Image */}
            <div className="absolute inset-0">
              <Image
                src="/images/hero-slide-1.png"
                alt="Hero slide 1"
                width={1000}
                height={1000}
                className="object-cover w-full h-full"
              />
            </div>

            <div className="relative z-10 flex h-full flex-col justify-center">
              <div className="container flex flex-1 items-center">
                <div className="max-w-2xl">
                  <h1 className="mb-6 text-4xl font-bold leading-tight md:text-5xl lg:text-[56px] text-white">
                    <span>
                      Your Ride,{" "}
                      <span className="text-primary font-black">
                        {" "}
                        Your Way{" "}
                      </span>{" "}
                      Book Instantly,{" "}
                      <span className="text-primary font-black"> Travel Safely! </span>
                    </span>
                  </h1>

                  {/* Description */}
                  <p className="mb-8 text-2xl text-white max-w-[664px]">
                    Connect with <strong>verified drivers</strong>, book rides{" "}
                    <strong>instantly</strong>, and enjoy safe, convenient{" "}
                    <strong>transportation</strong> wherever you need to go.
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
                src="/images/hero-slide-2.png"
                alt="Hero slide 2"
                width={1000}
                height={1000}
                className="object-cover w-full h-full"
              />
            </div>

            <div className="relative z-10 flex h-full flex-col justify-center">
              <div className="container flex flex-1 items-center">
                <div className="max-w-2xl">
                  <h1 className="mb-6 text-4xl font-bold leading-tight md:text-5xl lg:text-[56px] text-white">
                    <span>
                      Fast, Safe, and
                      <span className="text-primary font-black">
                        {" "}
                        Reliable
                      </span>{" "}
                      Rides at Your
                      <span className="text-primary font-black">
                        {" "}
                        Fingertips!
                      </span>
                    </span>
                  </h1>

                  {/* Description */}
                  <p className="mb-8 text-2xl text-white max-w-[664px]">
                    Get <strong>instant ride matches</strong> with verified drivers,{" "}
                    track your ride in <strong>real-time</strong>, and enjoy{" "}
                    <strong>seamless payment</strong> options for a hassle-free journey.
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
                src="/images/hero-slide-3.png"
                alt="Hero slide 3"
                width={1000}
                height={1000}
                className="object-cover w-full h-full"
              />
            </div>

            <div className="relative z-10 flex h-full flex-col justify-center">
              <div className="container flex flex-1 items-center">
                <div className="max-w-2xl">
                  <h1 className="mb-6 text-4xl font-bold leading-tight md:text-5xl lg:text-[56px] text-white">
                    <span>
                      Join Thousands of
                      <span className="text-primary font-black">
                        {" "}
                        Drivers
                      </span>{" "}
                      Earning with
                      <span className="text-primary font-black"> Bourter! </span>
                    </span>
                  </h1>

                  {/* Description */}
                  <p className="mb-8 text-2xl text-white max-w-[664px]">
                    Start earning <strong>flexible income</strong> as a driver or{" "}
                    <strong>manage your fleet</strong> as a company — all with{" "}
                    <strong>transparent pricing</strong> and reliable support.
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
