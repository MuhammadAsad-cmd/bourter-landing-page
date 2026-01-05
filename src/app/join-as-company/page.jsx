"use client";

import CompanyRegistrationForm from "@/components/CompanyRegistrationForm";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import { motion } from "framer-motion";
import { useLanguage } from "@/lib/i18n/language-context";
import { getTranslations } from "@/lib/i18n/get-translations";
import { useTranslations } from "@/lib/i18n/use-translations";

export default function JoinAsCompanyPage() {
  const { locale } = useLanguage();
  const messages = getTranslations(locale);
  const { t } = useTranslations(messages);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  };

  return (
    <div className="min-h-screen overflow-x-hidden font-sans">
      <Header theme="light" />

      <section className="relative pt-10 pb-32 overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-10 bg-white">
          <div className="absolute top-[-20%] right-[-10%] w-[800px] h-[800px] rounded-full bg-linear-to-br from-[#06294A]/10 via-[#06294A]/5 to-transparent blur-[120px]" />
          <div className="absolute top-[20%] left-[-20%] w-[600px] h-[600px] rounded-full bg-linear-to-tr from-[#D46E16]/10 via-[#E57F1D]/5 to-transparent blur-[120px]" />
          <div className="absolute bottom-[-10%] right-[20%] w-[500px] h-[500px] rounded-full bg-linear-to-t from-[#06294A]/5 to-transparent blur-[100px]" />
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            className="text-center max-w-5xl mx-auto mb-16"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            <motion.div
              variants={itemVariants}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white/80 backdrop-blur-md border border-[#06294A]/10 shadow-sm mb-8"
            >
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-green-500"></span>
              </span>
              <span className="text-sm font-semibold text-[#06294A] tracking-wide">
                {t("companyPage.hero.badge")}
              </span>
            </motion.div>

            <motion.h1
              variants={itemVariants}
              className="text-5xl md:text-7xl lg:text-[80px] font-bold text-[#06294A] mb-8 tracking-tight leading-[1.1]"
            >
              {t("companyPage.hero.title")}{" "}
              <span className="relative inline-block">
                {t("companyPage.hero.titleHighlight")}
                <svg
                  className={`absolute w-full h-4 -bottom-1 ${
                    locale === "ar" ? "right-0" : "left-0"
                  } text-[#D46E16] opacity-80`}
                  viewBox="0 0 100 10"
                  preserveAspectRatio="none"
                >
                  <path
                    d="M0 5 Q 50 10 100 5"
                    stroke="currentColor"
                    strokeWidth="8"
                    fill="none"
                  />
                </svg>
              </span>
            </motion.h1>

            <motion.p
              variants={itemVariants}
              className="text-xl md:text-2xl text-gray-600 mb-12 max-w-3xl mx-auto leading-relaxed"
            >
              {t("companyPage.hero.description")}{" "}
              <span className="text-[#D46E16] font-semibold">
                {t("companyPage.hero.highlight")}
              </span>
              .
            </motion.p>

            <motion.div
              variants={itemVariants}
              className="flex flex-col sm:flex-row items-center justify-center gap-6"
            >
              <button
                onClick={() =>
                  document
                    .getElementById("company-registration-form")
                    .scrollIntoView({ behavior: "smooth" })
                }
                className="group relative px-8 py-4 rounded-full bg-[#06294A] text-white font-bold text-lg overflow-hidden shadow-lg shadow-[#06294A]/25 transition-all hover:scale-105 active:scale-95 cursor-pointer"
              >
                <div className="absolute inset-0 w-full h-full bg-linear-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
                {t("companyPage.hero.cta")}
              </button>

              <div className="flex items-center gap-4 px-6 py-4 rounded-full bg-white/60 backdrop-blur-sm border border-white/50 shadow-sm transition-all hover:bg-white/80">
                <div className="flex -space-x-4">
                  {[
                    "https://i.pravatar.cc/100?img=5",
                    "https://i.pravatar.cc/100?img=6",
                    "https://i.pravatar.cc/100?img=7",
                    "https://i.pravatar.cc/100?img=8",
                  ].map((src, i) => (
                    <div
                      key={i}
                      className="w-10 h-10 rounded-full border-2 border-white overflow-hidden relative shadow-sm"
                    >
                      <img
                        src={src}
                        alt="Company"
                        className="w-full h-full object-cover"
                      />
                    </div>
                  ))}
                </div>
                <div className={locale === "ar" ? "text-right" : "text-left"}>
                  <p className="text-sm font-bold text-[#06294A]">
                    {t("companyPage.hero.companiesCount")}
                  </p>
                  <p className="text-xs text-gray-500 font-medium">
                    {t("companyPage.hero.joinedThisMonth")}
                  </p>
                </div>
              </div>
            </motion.div>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {[
              {
                title: t("companyPage.features.management.title"),
                desc: t("companyPage.features.management.description"),
                icon: (
                  <svg
                    className="w-7 h-7"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 17v-6a2 2 0 012-2h2a2 2 0 012 2v6m-8 0h8"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                    />
                  </svg>
                ),
                delay: 0.4,
              },
              {
                title: t("companyPage.features.optimization.title"),
                desc: t("companyPage.features.optimization.description"),
                icon: (
                  <svg
                    className="w-7 h-7"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8V7m0 1v8m0 0v1"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                ),
                delay: 0.5,
              },
              {
                title: t("companyPage.features.support.title"),
                desc: t("companyPage.features.support.description"),
                icon: (
                  <svg
                    className="w-7 h-7"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 9v2m0 4h.01"
                    />
                  </svg>
                ),
                delay: 0.6,
              },
            ].map((feature, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: feature.delay }}
                className="group bg-white/60 backdrop-blur-xl p-8 rounded-[32px] border border-white/60 shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_8px_30px_rgb(6,41,74,0.08)] hover:-translate-y-2 transition-all duration-300"
              >
                <div className="w-14 h-14 bg-white rounded-2xl shadow-sm flex items-center justify-center text-[#D46E16] mb-6 group-hover:bg-[#06294A] group-hover:text-white transition-colors duration-300">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-bold text-[#06294A] mb-3">
                  {feature.title}
                </h3>
                <p className="text-gray-600 leading-relaxed font-medium">
                  {feature.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section
        id="company-registration-form"
        className="relative pb-24 bg-white overflow-hidden"
      >
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
          <div className="absolute top-[5%] left-[-5%] w-[500px] h-[500px] rounded-full bg-[#06294A]/5 blur-[120px]" />
          <div className="absolute top-[40%] right-[-10%] w-[600px] h-[600px] rounded-full bg-[#D46E16]/5 blur-[120px]" />
        </div>
        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="max-w-4xl mx-auto"
          >
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-5xl font-bold text-[#06294A] mb-4">
                {t("companyPage.formSection.title")}
              </h2>
              <p className="text-gray-600 text-lg max-w-xl mx-auto">
                {t("companyPage.formSection.description")}
              </p>
            </div>

            <CompanyRegistrationForm />
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
}


