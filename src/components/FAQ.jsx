"use client";

import React, { useState } from "react";

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState(1); // Start with item 02 open

  const faqs = [
    {
      id: 0,
      number: "01",
      question: "How do I book a ride?",
      answer:
        "It's simple. Open the Bourter app, enter your destination, and tap 'Request Ride'. You'll instantly see upfront pricing and be matched with the nearest available driver.",
    },
    {
      id: 1,
      number: "02",
      question: "What makes Bourter different?",
      answer:
        "Bourter prioritizes safety, transparency, and fairness. We rigorously vet our drivers, offer real-time tracking for every trip, and ensure competitive pricing for riders while providing better earnings for drivers.",
    },
    {
      id: 2,
      number: "03",
      question: "Is the app free to download?",
      answer:
        "Absolutely. The Bourter app is 100% free to download on both iOS and Android. You only pay for the rides you take, with no hidden subscription fees.",
    },
    {
      id: 3,
      number: "04",
      question: "How do I sign up as a driver?",
      answer:
        "Click 'Join as Driver' in the menu or download our Driver App. Fill in your details, upload your documents, and once verified, you can start accepting rides and earning immediately.",
    },
    {
      id: 4,
      number: "05",
      question: "What is the Company Panel?",
      answer:
        "The Company Panel is a powerful tool for fleet owners. It allows you to register your company, manage multiple drivers and vehicles, track daily earnings, and optimize your business operations from one dashboard.",
    },
  ];

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="bg-white py-12 md:py-20">
      <div className="container">
        {/* Heading */}
        <div className="text-center mb-8 md:mb-12">
          <h2 className="text-3xl md:text-4xl lg:text-[55px] font-semibold mb-4">
            <span className="text-focus font-bold">Frequently</span> Asked Questions!
          </h2>
          <p className="text-base md:text-[22px] text-black max-w-[824px] mx-auto">
            Find <strong>clear answers</strong> to the{" "}
            <strong>most common questions</strong> about booking rides,
            becoming a driver, or joining as a company on the{" "}
            <strong>Bourter platform</strong>.
          </p>
        </div>

        {/* FAQ Accordion */}
        <div className="max-w-4xl mx-auto space-y-4">
          {faqs.map((faq) => {
            const isOpen = openIndex === faq.id;
            return (
              <div
                key={faq.id}
                className={`rounded-[24px] transition-all duration-300 ease-in-out cursor-pointer border ${isOpen
                  ? "px-5 py-8 bg-primary/10 border-primary/50"
                  : "px-5 py-8 bg-white border-transparent"
                  }`}
              >
                {/* Question Row */}
                <button
                  onClick={() => toggleFAQ(faq.id)}
                  className="w-full flex items-center justify-between gap-4 text-left"
                >
                  <div className="flex items-center gap-4 md:gap-6 cursor-pointer">
                    {/* Number */}
                    <span
                      className={`text-xl md:text-2xl font-semibold transition-colors duration-300 ${isOpen ? "text-primary" : "text-black/60"
                        }`}
                    >
                      {faq.number}
                    </span>

                    {/* Question */}
                    <h3
                      className={`text-lg md:text-2xl font-semibold transition-colors duration-300 ${isOpen ? "text-primary" : "text-black"
                        }`}
                    >
                      {faq.question}
                    </h3>
                  </div>

                  {/* Icon */}
                  <div className="shrink-0 transition-transform duration-300 cursor-pointer">
                    {isOpen ? (
                      <svg
                        className="w-6 h-6 text-primary transition-all duration-300"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M6 18L18 6M6 6l12 12"
                        />
                      </svg>
                    ) : (
                      <svg
                        className="w-6 h-6 text-gray-400 transition-all duration-300"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M12 4v16m8-8H4"
                        />
                      </svg>
                    )}
                  </div>
                </button>

                {/* Answer */}
                <div
                  className={`overflow-hidden transition-all duration-300 ease-in-out ${isOpen
                    ? "max-h-96 opacity-100 mt-4"
                    : "max-h-0 opacity-0 mt-0"
                    }`}
                >
                  <div className="pl-12 md:pl-16">
                    <p className="text-base md:text-lg text-black leading-relaxed">
                      {faq.answer}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default FAQ;

