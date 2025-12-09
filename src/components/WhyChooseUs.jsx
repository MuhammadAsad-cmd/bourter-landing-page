import Image from "next/image";
import Link from "next/link";
import React from "react";

const WhyChooseUs = () => {
  return (
    <section className="bg-white py-12 md:py-20">
      <div className="container">
        {/* Why Choose Us Section */}
        <div className="mb-20 md:mb-32">
          {/* Heading */}
          <div className="text-center mb-8 md:mb-12">
            <h2 className="text-3xl md:text-4xl lg:text-[55px] font-semibold mb-4">
              Why Choose <span className="text-focus font-bold">Us!</span>
            </h2>
            <p className="text-base md:text-[22px] text-black max-w-2xl mx-auto">
              A <strong> trusted platform </strong> built to make{" "}
              <strong> every ride </strong> safe, convenient,{" "}
              <strong> and reliable. </strong>
            </p>
          </div>

          <div className="flex md:flex-row flex-col items-center justify-between gap-10">
            <div className="w-full md:w-[55%] bg-primary/10 rounded-[40px] border-2 border-primary/30 p-4 md:p-7 shadow-sm hover:shadow-md transition-shadow">
              <div className="bg-primary rounded-[24px] w-[88px] h-[88px] flex items-center justify-center mb-4 text-white">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="40"
                  height="40"
                  viewBox="0 0 40 40"
                  fill="none"
                >
                  <path
                    d="M30 13.3332C27.2147 12.2867 23.7522 11.6665 20 11.6665C16.2479 11.6665 12.7854 12.2867 10 13.3332"
                    stroke="white"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                  />
                  <path
                    d="M11.6163 13.3335L10.4005 10.9793C9.43584 9.11135 8.95351 8.17738 9.25728 7.35188C9.56106 6.5264 10.4958 6.23088 12.3654 5.63985L18.9832 3.54773C19.4348 3.40491 19.6608 3.3335 19.8925 3.3335C20.1243 3.3335 20.3503 3.40491 20.802 3.54773L27.8653 5.78071C29.5495 6.3131 30.3915 6.5793 30.7125 7.3266C31.0337 8.07391 30.6887 8.96451 29.9988 10.7457L28.9965 13.3335"
                    stroke="white"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                  />
                  <path
                    d="M11.6667 13.3335V16.2088C11.6667 19.1975 13.2025 21.9672 15.7125 23.5048L16.57 24.0302C18.6812 25.3235 21.3188 25.3235 23.43 24.0302L24.2875 23.5048C26.7975 21.9672 28.3333 19.1975 28.3333 16.2088V13.3335"
                    stroke="white"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                  />
                  <path
                    d="M25 23.3335L26.6667 28.3335M26.6667 28.3335L24.3853 30.3258C22.2955 32.151 21.2507 33.0635 20 33.0635C18.7493 33.0635 17.7045 32.151 15.6147 30.3258L13.3333 28.3335M26.6667 28.3335L29.5568 29.2968C31.2203 29.8513 32.052 30.1287 32.7903 30.5572C33.5132 30.9767 34.1687 31.5025 34.735 32.117C35.3135 32.7448 36.6667 35.0002 36.6667 36.6668M13.3333 28.3335L15 23.3335M13.3333 28.3335L10.4431 29.2968C8.77966 29.8513 7.94794 30.1287 7.20961 30.5572C6.48688 30.9767 5.83136 31.5025 5.26504 32.117C4.68651 32.7448 3.33333 35.0002 3.33333 36.6668"
                    stroke="white"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
              <h3 className="text-xl md:text-[28px] font-semibold text-black mb-3">
                Verified Drivers & Vehicles
              </h3>
              <p className="text-sm md:text-lg text-black">
                Every driver on our platform is verified, background-checked, and
                rated – giving you peace of mind while traveling safely.
              </p>
            </div>
            <div className="w-full md:w-[45%] bg-primary/10 rounded-[40px] border-2 border-primary/30 p-4 md:p-7 shadow-sm hover:shadow-md transition-shadow">
              <div className="bg-primary rounded-[24px] w-[88px] h-[88px] flex items-center justify-center mb-4 text-white">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="40"
                  height="40"
                  viewBox="0 0 40 40"
                  fill="none"
                >
                  <path
                    d="M26.6666 3.3335V10.0002M13.3333 3.3335V10.0002"
                    stroke="white"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M21.6667 6.6665H18.3333C12.0479 6.6665 8.90525 6.6665 6.95262 8.61912C5 10.5718 5 13.7144 5 19.9998V23.3332C5 29.6185 5 32.7613 6.95262 34.7138C8.90525 36.6665 12.0479 36.6665 18.3333 36.6665H21.6667C27.952 36.6665 31.0948 36.6665 33.0473 34.7138C35 32.7613 35 29.6185 35 23.3332V19.9998C35 13.7144 35 10.5718 33.0473 8.61912C31.0948 6.6665 27.952 6.6665 21.6667 6.6665Z"
                    stroke="white"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M5 16.6665H35"
                    stroke="white"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M19.9925 23.3335H20.0075M19.9925 30.0002H20.0075M26.6516 23.3335H26.6666M13.3333 23.3335H13.3483M13.3333 30.0002H13.3483"
                    stroke="white"
                    strokeWidth="3.33333"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
              <h3 className="text-xl md:text-[28px] font-semibold text-black mb-3">
                All-in-One Ride Platform
              </h3>
              <p className="text-sm md:text-lg text-black">
                From booking rides to tracking in real-time, secure payments, and
                managing your ride history.
              </p>
            </div>
          </div>
          {/*  */}
          <div className="flex md:flex-row flex-col items-center justify-between gap-10 mt-10">
            <div className="w-full md:w-[44%] bg-primary/10 rounded-[40px] border-2 border-primary/30 p-4 md:p-7 shadow-sm hover:shadow-md transition-shadow">
              <div className="bg-primary rounded-[24px] w-[88px] h-[88px] flex items-center justify-center mb-4 text-white">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="40"
                  height="39"
                  viewBox="0 0 40 39"
                  fill="none"
                >
                  <path
                    d="M18.4101 11.9985C17.68 11.0273 16.5174 10.3991 15.2082 10.3991C12.998 10.3991 11.2062 12.1892 11.2062 14.3974C11.2062 16.3319 12.5811 17.9453 14.4078 18.3159M15.1198 28.7914C14.7183 28.7914 14.3237 28.684 13.9747 28.4802C9.19553 25.4155 4.00278 21.004 4.00278 14.6223C4.00278 8.36218 9.10356 3.20215 15.1198 3.20215C18.2677 3.20215 21.165 4.61482 23.212 6.8586"
                    stroke="white"
                    strokeWidth="2.4"
                    strokeLinecap="round"
                  />
                  <path
                    d="M20.9912 24.8805C18.8147 22.2319 18.4434 19.572 21.5574 16.3424C24.8288 13.4233 26.7128 12.0427 27.2146 11.2119C27.7165 12.0427 29.631 13.4233 32.9024 16.3424C35.8674 18.988 35.6808 22.2319 33.5043 24.8805M20.9912 24.8805H20.1557M20.9912 24.8805H33.5043M33.5043 24.8805H34.2405M20.1557 24.8805H18.4434M20.1557 24.8805V33.7488C20.2195 34.8168 20.1557 35.3152 22.0923 35.1752H27.1845M34.2405 24.8805H35.9979M34.2405 24.8805V33.9112C34.4272 35.3616 33.2725 35.1072 32.5341 35.1752H27.1845M27.1845 35.1752L27.241 31.7611"
                    stroke="white"
                    strokeWidth="2.4"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
              <h3 className="text-xl md:text-[28px] font-semibold text-black mb-3">
                Safety Features, Always Active
              </h3>
              <p className="text-sm md:text-lg text-black">
                Access emergency assistance, share ride details with contacts,
                and enjoy 24/7 support — anytime, anywhere.
              </p>
            </div>
            <div className="w-full md:w-[56%] bg-primary/10 rounded-[40px] border-2 border-primary/30 p-4 md:p-7 shadow-sm hover:shadow-md transition-shadow">
              <div className="bg-primary rounded-[24px] w-[88px] h-[88px] flex items-center justify-center mb-4 text-white">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="40"
                  height="39"
                  viewBox="0 0 40 39"
                  fill="none"
                >
                  <path
                    d="M8.79999 33.6002H26.4C29.4169 33.6002 30.9254 33.6002 31.8627 32.6629C32.8 31.7256 32.8 30.2172 32.8 27.2002V17.6002C32.8 14.5832 32.8 13.0747 31.8627 12.1375C30.9254 11.2002 29.4169 11.2002 26.4 11.2002H13.6"
                    stroke="white"
                    strokeWidth="2.4"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M13.6 33.5999H7.2C5.43269 33.5999 4 32.1673 4 30.3999M4 30.3999C4 28.6325 5.43269 27.1999 7.2 27.1999C10.217 27.1999 11.7255 27.1999 12.6627 26.2626C13.6 25.3253 13.6 23.8169 13.6 20.7999V12.7999C13.6 9.78291 13.6 8.27441 12.6627 7.33717C11.7255 6.3999 10.217 6.3999 7.2 6.3999C5.43269 6.3999 4 7.83259 4 9.5999V30.3999Z"
                    stroke="white"
                    strokeWidth="2.4"
                    strokeLinecap="round"
                  />
                  <path
                    d="M18.4 26.1711H18.9296C19.3935 26.1711 19.6253 26.1711 19.8208 26.2171C20.0163 26.2631 20.3883 26.4492 21.1323 26.8215C23.6965 28.1049 25.4067 25.8601 26.8859 24.0438C27.6287 23.1316 28 22.6756 28 22.3999C28 22.1244 27.6287 21.6684 26.8858 20.7563C25.4067 18.9399 23.6965 16.6953 21.1323 17.9787C20.3883 18.351 20.0163 18.5371 19.8208 18.5831C19.6253 18.6291 19.3935 18.6291 18.9296 18.6291H18.4"
                    stroke="white"
                    strokeWidth="2.4"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M32.8 25.6001H36"
                    stroke="white"
                    strokeWidth="2.4"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M32.8 32H36"
                    stroke="white"
                    strokeWidth="2.4"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M32.8 19.2002H36"
                    stroke="white"
                    strokeWidth="2.4"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M32.8 12.7998H36"
                    stroke="white"
                    strokeWidth="2.4"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
              <h3 className="text-xl md:text-[28px] font-semibold text-black mb-3">
                Innovation Meets Reliability
              </h3>
              <p className="text-sm md:text-lg text-black">
                We combine cutting-edge technology with trusted service to ensure
                your ride is both convenient and completely hassle-free.
              </p>
            </div>
          </div>
        </div>


      </div>
    </section>
  );
};

export default WhyChooseUs;
