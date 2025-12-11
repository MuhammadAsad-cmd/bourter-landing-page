"use client";

import Image from "next/image";
import Link from "next/link";
import { useLanguage } from "@/lib/i18n/language-context";
import { getTranslations } from "@/lib/i18n/get-translations";
import { useTranslations } from "@/lib/i18n/use-translations";

const JoinSection = () => {
    const { locale } = useLanguage();
    const messages = getTranslations(locale);
    const { t } = useTranslations(messages);

    const driverFeatures = [
        t("joinSection.driverFeature1"),
        t("joinSection.driverFeature2"),
        t("joinSection.driverFeature3"),
        t("joinSection.driverFeature4"),
    ];

    const companyFeatures = [
        t("joinSection.companyFeature1"),
        t("joinSection.companyFeature2"),
        t("joinSection.companyFeature3"),
        t("joinSection.companyFeature4"),
    ];

    return (
        <section className="bg-linear-to-b from-white to-gray-50 py-16 md:py-24">
            <div className="container">
                <div className="text-center mb-12 md:mb-16">
                    <h2 className="text-3xl md:text-4xl lg:text-[50px] font-bold mb-6 text-black">
                        {t("joinSection.title")} <span className="text-primary">{t("joinSection.titleHighlight")}</span>
                    </h2>
                    <p className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto">
                        {t("joinSection.description")}
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
                                {t("joinSection.driverTitle")}
                            </h3>

                            <div className="space-y-4 mb-8 grow">
                                <p className="text-gray-600 leading-relaxed">
                                    {t("joinSection.driverDesc")}
                                </p>
                                <ul className="space-y-3">
                                    {driverFeatures.map((item, i) => (
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
                                {t("joinSection.driverButton")}
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
                                {t("joinSection.companyTitle")}
                            </h3>

                            <div className="space-y-4 mb-8 grow">
                                <p className="text-gray-600 leading-relaxed">
                                    {t("joinSection.companyDesc")}
                                </p>
                                <ul className="space-y-3">
                                    {companyFeatures.map((item, i) => (
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
                                {t("joinSection.companyButton")}
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default JoinSection;
