import Image from "next/image";
import Link from "next/link";
import React from "react";

const AllinOne = () => {
  return (

    <div className="container flex items-center justify-between gap-12 my-[30px] md:my-[60px]">
      <div className="w-full lg:w-[60%]">
        <h2 className="mb-4 text-4xl font-bold leading-tight md:text-5xl lg:text-6xl">
          Your All-In-One <span className="text-primary">Ride-Sharing</span>{" "}
          Platform!
        </h2>

        <p className="mb-6 text-lg text-black md:text-xl">
          Book rides, connect with drivers, and travel with confidence.
        </p>

        <p className="mb-8 text-base leading-relaxed text-black md:text-lg">
          Experience the future of transportation with Bourter. We connect you with top-rated drivers instantly, offering a seamless blend of comfort, reliability, and advanced technology. From precision tracking to effortless payments, elevate your daily travel experience.
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
          <Link target="_blank" href="https://play.google.com/store/apps/details?id=com.bitknit.global_zahir_guide">
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
