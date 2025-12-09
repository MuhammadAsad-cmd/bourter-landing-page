import Image from "next/image";
import Link from "next/link";
import React from "react";

const JoinSection = () => {
    return (
        <section className="bg-linear-to-b from-white to-gray-50 py-16 md:py-24">
            <div className="container">
                <div className="text-center mb-12 md:mb-16">
                    <h2 className="text-3xl md:text-4xl lg:text-[50px] font-bold mb-6 text-black">
                        Join the <span className="text-primary">Bourter</span> Community
                    </h2>
                    <p className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto">
                        Choose your path and start your journey with us. Whether you're driving yourself or managing a fleet, we have the right tools for you.
                    </p>
                </div>

                <div className="grid md:grid-cols-2 gap-8 lg:gap-12 items-stretch">
                    {/* Driver Card */}
                    <div className="relative group rounded-[32px] overflow-hidden bg-white border border-gray-100 shadow-xl hover:shadow-2xl transition-all duration-300 flex flex-col">
                        <div className="absolute inset-0 bg-linear-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />

                        <div className="p-8 md:p-12 flex flex-col h-full relative z-10">
                            <div className="mb-8 p-4 bg-primary/10 w-fit rounded-2xl">
                                <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary">
                                    <path d="M19 17h2c.6 0 1-.4 1-1v-3c0-.9-.7-1.7-1.5-1.9C18.7 10.6 16 10 16 10s-1.3-1.4-2.2-2.3c-.5-.4-1.1-.7-1.8-.7H5c-.6 0-1.1.4-1.4.9l-1.4 2.9A3.7 3.7 0 0 0 2 12v4c0 .6.4 1 1 1h2" />
                                    <circle cx="7" cy="17" r="2" />
                                    <path d="M9 17h6" />
                                    <circle cx="17" cy="17" r="2" />
                                </svg>
                            </div>

                            <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
                                Join as a Driver
                            </h3>

                            <div className="space-y-4 mb-8 grow">
                                <p className="text-gray-600 leading-relaxed">
                                    Be your own boss and earn on your schedule. Connect with passengers instantly and get paid quickly.
                                </p>
                                <ul className="space-y-3">
                                    {['Flexible Working Hours', 'Instant Ride Requests', 'Secure Payments', 'Keep 100% of Your Tips'].map((item, i) => (
                                        <li key={i} className="flex items-center text-gray-700">
                                            <div className="w-1.5 h-1.5 rounded-full bg-primary mr-3" />
                                            {item}
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            <Link
                                href="/join-as-driver"
                                className="w-full text-center py-4 rounded-xl font-bold text-white transition-all hover:scale-[1.02] active:scale-[0.98]"
                                style={{
                                    background: "linear-gradient(130.4deg, #0053A2 15.06%, #06294A 87.46%)",
                                    boxShadow: "2px 2px 2px 0px #FFFFFF33 inset, -2px -2px 2px 0px #FFFFFF33 inset",
                                }}
                            >
                                Become a Driver
                            </Link>
                        </div>
                    </div>

                    {/* Company Card */}
                    <div className="relative group rounded-[32px] overflow-hidden bg-white border border-gray-100 shadow-xl hover:shadow-2xl transition-all duration-300 flex flex-col">
                        <div className="absolute inset-0 bg-linear-to-br from-secondary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />

                        <div className="p-8 md:p-12 flex flex-col h-full relative z-10">
                            <div className="mb-8 p-4 bg-[#06294A]/10 w-fit rounded-2xl">
                                <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#06294A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <rect x="2" y="7" width="20" height="14" rx="2" ry="2" />
                                    <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
                                </svg>
                            </div>

                            <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
                                Join as a Company
                            </h3>

                            <div className="space-y-4 mb-8 grow">
                                <p className="text-gray-600 leading-relaxed">
                                    Scale your fleet business with our powerful management tools. Track drivers, manage earnings, and grow efficiently.
                                </p>
                                <ul className="space-y-3">
                                    {['Fleet Management Dashboard', 'Real-time Driver Tracking', 'Detailed Earning Reports', 'Business Support'].map((item, i) => (
                                        <li key={i} className="flex items-center text-gray-700">
                                            <div className="w-1.5 h-1.5 rounded-full bg-[#06294A] mr-3" />
                                            {item}
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            <Link
                                href="https://global-zair-guide-59937.web.app/"
                                target="_blank"
                                className="w-full text-center py-4 rounded-xl font-bold text-[#06294A] border-2 border-[#06294A] hover:bg-[#06294A] hover:text-white transition-all duration-300"
                            >
                                Register Company
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default JoinSection;
