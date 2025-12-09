import Image from "next/image";
import React from "react";

const Features = () => {
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
        {/* Content - Right */}
        <div className="w-full lg:w-1/2">
          <h2 className="mb-6 text-3xl font-semibold leading-tight text-black md:text-4xl lg:text-[55px]">
            Real-Time Ride <br />
            <span className="text-focus font-bold">
              {" "}
              {""} Tracking <br /> & Navigation!
            </span>
          </h2>
          <p className="mb-8 text-base text-black md:text-[22px]">
            Never wonder where your ride is. With our precision GPS tracking, monitor your driver's exact location, route, and ETA in real-time. Share your trip status with loved ones for added security.
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
        {/* Image - Right */}
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

        {/* Content - Left */}
        <div className="w-full lg:w-1/2">
          <h2 className="mb-6 text-3xl font-semibold leading-tight text-black md:text-4xl lg:text-[55px]">
            Choose Your Preferred{" "}
            <span className="text-focus font-bold">
              {" "}
              Ride Type!
            </span>
          </h2>
          <p className="mb-8 text-base text-black md:text-[22px]">
            Ride your way. Choose from Economy for everyday value, Comfort for extra room, or Luxury so you can arrive in style. Filter by price, vehicle size, and driver rating to match your exact needs.
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
        {/* Image - Left */}
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

        {/* Content - Right */}
        <div className="w-full lg:w-1/2">
          <h2 className="mb-6 text-3xl font-semibold leading-tight text-black md:text-4xl lg:text-[55px]">
            Secure Payments &{" "}
            <span className="text-focus font-bold">Easy Transactions!</span>
          </h2>
          <p className="mb-8 text-base leading-relaxed text-black md:text-[22px]">
            Pay your way, securely. Whether you prefer cash, credit card, or digital wallet, we've got you covered. Our encrypted payment system ensures every transaction is safe, transparent, and instant.
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
            Learn More
          </button>
        </div>
      </div>
    </div>
  );
};

export default Features;
