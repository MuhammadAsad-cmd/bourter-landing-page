import Image from "next/image";
import React from "react";

const HowItWorks = () => {
  const steps = [
    {
      number: "1",
      description: "Enter your destination to instantly view available rides, upfront pricing, and estimated arrival times.",
      action: "Request.",
    },
    {
      number: "2",
      description: "Get matched with a nearby, background-checked driver. View their profile, vehicle details, and rating.",
      action: "Match.",
    },
    {
      number: "3",
      description: "Watch your driver arrive in real-time. Hop in and enjoy a safe, comfortable journey to your destination.",
      action: "Ride.",
    },
    {
      number: "4",
      description: "Arrive safely and pay seamlessly. Rate your experience to help us maintain our high community standards.",
      action: "Arrive.",
    },
  ];

  return (
    <section className="bg-white py-12 md:py-20">
      <div className="container">
        <div className="text-center mb-8 md:mb-12">
          <h2 className="text-3xl md:text-4xl lg:text-[55px] font-semibold mb-4">
            How It <span className="text-focus font-bold">Works!</span>
          </h2>
          <p className="text-base md:text-[22px] text-black max-w-[664px] mx-auto">
            Our <strong>platform</strong> brings together riders and drivers
            seamlessly – helping you <strong>book faster</strong>,{" "}
            <strong>travel safer</strong>, and reach your destination{" "}
            <strong>with ease and convenience.</strong>
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

