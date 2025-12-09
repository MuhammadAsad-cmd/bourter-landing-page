"use client";

import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import {
  FaInstagram,
  FaTwitter,
  FaFacebook,
  FaYoutube,
  FaEnvelope,
  FaMapMarkerAlt,
  FaPhone,
  FaTiktok,
} from "react-icons/fa";

const Footer = () => {
  const [email, setEmail] = useState("");

  const handleSubscribe = (e) => {
    e.preventDefault();
    // Handle newsletter subscription
    console.log("Subscribed:", email);
    setEmail("");
  };

  return (
    <footer className="bg-black px-4 text-white">
      <div className="container py-12 md:py-16">
        <div className="flex justify-between mb-8 md:mb-12 border-b border-[#737E9D]/40 pb-12 max-md:flex-col max-md:gap-12">
          <div className="flex flex-col">
            <div className="mb-6 flex">
              <Image
                src="/images/logo2.svg"
                alt="Bourter Logo"
                width={200}
                height={100}
                className="object-contain h-full"
                priority
              />
            </div>

            <p className="text-base md:text-[22px] text-white mb-8 md:mb-12">
              Your Reliable Ride-Sharing <br /> Partner
            </p>
          </div>

          <div className="flex flex-col gap-8 md:gap-12">
            <div>
              <h3 className="text-xl md:text-2xl font-bold text-white mb-4 md:mb-6">
                Contact Us
              </h3>
              <div className="space-y-3 md:space-y-4">
                <div className="flex items-center gap-3 text-base md:text-lg">
                  <FaEnvelope className="w-5 h-5 text-white shrink-0" />
                  <a
                    href="mailto:info@bourte.io"
                    className="text-white hover:text-focus transition-colors"
                  >
                    info@bourte.io
                  </a>
                </div>

                {/* <div className="flex items-center gap-3 text-base md:text-lg">
                  <FaMapMarkerAlt className="w-5 h-5 text-white shrink-0" />
                  <span className="text-white">Minnesota, Pa</span>
                </div> */}

                <div className="flex items-center gap-3 text-base md:text-lg">
                  <FaPhone className="w-5 h-5 text-white shrink-0" />
                  <a
                    href="tel:03134001049"
                    className="text-white hover:text-focus transition-colors"
                  >
                    0313 4001 049
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-col-reverse md:flex-row justify-between max-md:gap-12">
          <div>
            <div className="flex items-center md:justify-start gap-7 mb-6">
              <Link
                href="https://www.instagram.com/global.zair.guide?igsh=ODFncWxtanlmODNw"
                target="_blank"
                className="w-10 h-10 rounded-lg border border-white/20 flex items-center justify-center text-white hover:bg-primary transition-opacity"
                aria-label="Instagram"
              >
                <FaInstagram className="w-5 h-5" />
              </Link>

              <Link
                href="https://www.facebook.com/share/19pxqz83hZ/"
                target="_blank"
                className="w-10 h-10 rounded-lg border border-white/20 flex items-center justify-center text-white hover:bg-primary transition-colors"
                aria-label="Facebook"
              >
                <FaFacebook className="w-5 h-5" />
              </Link>
              <Link
                href="https://www.tiktok.com/@global.zair.guide?_r=1&_t=ZS-91JGZ7hG7n8"
                target="_blank"
                className="w-10 h-10 rounded-lg border border-white/20 flex items-center justify-center text-white hover:bg-primary transition-colors"
                aria-label="Tiktok"
              >
                <FaTiktok className="w-5 h-5" />
              </Link>
            </div>
            {/* Copyright */}
            <p className="text-base text-white">
              <strong className="text-focus font-bold">
                {" "}
                @2025 Bourter
              </strong>{" "}
              | All Rights Reserved
            </p>
          </div>

          <div>
            <h3 className="text-xl font-semibold text-white mb-4 md:mb-6">
              Newsletter
            </h3>
            <form onSubmit={handleSubscribe} className="flex flex-row">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                className="flex-1 rounded-l-[15px] bg-white/10 border-l-[0.95px] border-y-[0.95px] border-white px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:border-primary transition-colors"
                required
              />
              <button
                type="submit"
                className="rounded-r-[15px] bg-primary border-y-[0.95px] border-white cursor-pointer px-6 py-3 text-lg font-semibold text-white hover:opacity-90 transition-opacity whitespace-nowrap shadow-[0px_3.81px_36.19px_0px_#FFFFFF40]"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
