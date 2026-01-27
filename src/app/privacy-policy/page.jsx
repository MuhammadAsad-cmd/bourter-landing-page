"use client";

import Footer from "@/components/Footer";
import Header from "@/components/Header";
import { motion } from "framer-motion";
import { useLanguage } from "@/lib/i18n/language-context";
import { getTranslations } from "@/lib/i18n/get-translations";
import { useTranslations } from "@/lib/i18n/use-translations";

export default function PrivacyPolicyPage() {
  const { locale } = useLanguage();
  const messages = getTranslations(locale);
  const { t } = useTranslations(messages);
  const isRtl = locale === "ar";

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 },
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
            className="text-center max-w-4xl mx-auto mb-16"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            <motion.h1
              variants={itemVariants}
              className={`text-4xl md:text-6xl lg:text-[72px] font-bold text-[#06294A] mb-6 tracking-tight leading-[1.1] ${isRtl ? "text-right" : "text-left"}`}
            >
              {t("privacyPolicy.title")}
            </motion.h1>

            <motion.p
              variants={itemVariants}
              className={`text-lg md:text-xl text-gray-600 mb-4 ${isRtl ? "text-right" : "text-left"}`}
            >
              {t("privacyPolicy.subtitle")}
            </motion.p>

            <motion.p
              variants={itemVariants}
              className={`text-sm md:text-base text-gray-500 ${isRtl ? "text-right" : "text-left"}`}
            >
              {t("privacyPolicy.lastUpdated")}: {t("privacyPolicy.updateDate")}
            </motion.p>
          </motion.div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="max-w-4xl mx-auto"
          >
            <div className="bg-white/60 backdrop-blur-xl rounded-[32px] border border-white/60 shadow-[0_8px_30px_rgb(0,0,0,0.04)] p-8 md:p-12">
              <motion.div
                variants={itemVariants}
                className="max-w-none"
              >
                <p className={`text-gray-700 mb-8 leading-relaxed ${isRtl ? "text-right" : "text-left"}`}>
                  {t("privacyPolicy.introduction")}
                </p>

                <div className="space-y-8">
                  {/* Section 1 */}
                  <motion.div variants={itemVariants}>
                    <h2 className={`text-2xl md:text-3xl font-bold text-[#06294A] mb-4 ${isRtl ? "text-right" : "text-left"}`}>
                      {t("privacyPolicy.section1.title")}
                    </h2>
                    <div className={`space-y-4 text-gray-700 ${isRtl ? "text-right" : "text-left"}`}>
                      <div>
                        <h3 className={`font-semibold text-lg text-[#06294A] mb-2 ${isRtl ? "text-right" : "text-left"}`}>
                          {t("privacyPolicy.section1.subsectionA.title")}
                        </h3>
                        <ul className={`list-disc list-inside space-y-1 ml-4 ${isRtl ? "mr-4 ml-0" : ""}`}>
                          <li>{t("privacyPolicy.section1.subsectionA.item1")}</li>
                          <li>{t("privacyPolicy.section1.subsectionA.item2")}</li>
                          <li>{t("privacyPolicy.section1.subsectionA.item3")}</li>
                          <li>{t("privacyPolicy.section1.subsectionA.item4")}</li>
                        </ul>
                      </div>
                      <div>
                        <h3 className={`font-semibold text-lg text-[#06294A] mb-2 ${isRtl ? "text-right" : "text-left"}`}>
                          {t("privacyPolicy.section1.subsectionB.title")}
                        </h3>
                        <p>{t("privacyPolicy.section1.subsectionB.content")}</p>
                      </div>
                      <div>
                        <h3 className={`font-semibold text-lg text-[#06294A] mb-2 ${isRtl ? "text-right" : "text-left"}`}>
                          {t("privacyPolicy.section1.subsectionC.title")}
                        </h3>
                        <ul className={`list-disc list-inside space-y-1 ml-4 ${isRtl ? "mr-4 ml-0" : ""}`}>
                          <li>{t("privacyPolicy.section1.subsectionC.item1")}</li>
                          <li>{t("privacyPolicy.section1.subsectionC.item2")}</li>
                          <li>{t("privacyPolicy.section1.subsectionC.item3")}</li>
                          <li>{t("privacyPolicy.section1.subsectionC.item4")}</li>
                        </ul>
                      </div>
                      <div>
                        <h3 className={`font-semibold text-lg text-[#06294A] mb-2 ${isRtl ? "text-right" : "text-left"}`}>
                          {t("privacyPolicy.section1.subsectionD.title")}
                        </h3>
                        <ul className={`list-disc list-inside space-y-1 ml-4 ${isRtl ? "mr-4 ml-0" : ""}`}>
                          <li>{t("privacyPolicy.section1.subsectionD.item1")}</li>
                          <li>{t("privacyPolicy.section1.subsectionD.item2")}</li>
                          <li>{t("privacyPolicy.section1.subsectionD.item3")}</li>
                        </ul>
                        <p className="mt-2">{t("privacyPolicy.section1.subsectionD.note")}</p>
                      </div>
                      <div>
                        <h3 className={`font-semibold text-lg text-[#06294A] mb-2 ${isRtl ? "text-right" : "text-left"}`}>
                          {t("privacyPolicy.section1.subsectionE.title")}
                        </h3>
                        <ul className={`list-disc list-inside space-y-1 ml-4 ${isRtl ? "mr-4 ml-0" : ""}`}>
                          <li>{t("privacyPolicy.section1.subsectionE.item1")}</li>
                          <li>{t("privacyPolicy.section1.subsectionE.item2")}</li>
                          <li>{t("privacyPolicy.section1.subsectionE.item3")}</li>
                        </ul>
                      </div>
                      <div>
                        <h3 className={`font-semibold text-lg text-[#06294A] mb-2 ${isRtl ? "text-right" : "text-left"}`}>
                          {t("privacyPolicy.section1.subsectionF.title")}
                        </h3>
                        <ul className={`list-disc list-inside space-y-1 ml-4 ${isRtl ? "mr-4 ml-0" : ""}`}>
                          <li>{t("privacyPolicy.section1.subsectionF.item1")}</li>
                          <li>{t("privacyPolicy.section1.subsectionF.item2")}</li>
                          <li>{t("privacyPolicy.section1.subsectionF.item3")}</li>
                        </ul>
                      </div>
                    </div>
                  </motion.div>

                  {/* Section 2 */}
                  <motion.div variants={itemVariants}>
                    <h2 className={`text-2xl md:text-3xl font-bold text-[#06294A] mb-4 ${isRtl ? "text-right" : "text-left"}`}>
                      {t("privacyPolicy.section2.title")}
                    </h2>
                    <ul className={`list-disc list-inside space-y-2 text-gray-700 ml-4 ${isRtl ? "mr-4 ml-0" : ""}`}>
                      <li>{t("privacyPolicy.section2.item1")}</li>
                      <li>{t("privacyPolicy.section2.item2")}</li>
                      <li>{t("privacyPolicy.section2.item3")}</li>
                      <li>{t("privacyPolicy.section2.item4")}</li>
                      <li>{t("privacyPolicy.section2.item5")}</li>
                      <li>{t("privacyPolicy.section2.item6")}</li>
                    </ul>
                  </motion.div>

                  {/* Section 3 */}
                  <motion.div variants={itemVariants}>
                    <h2 className={`text-2xl md:text-3xl font-bold text-[#06294A] mb-4 ${isRtl ? "text-right" : "text-left"}`}>
                      {t("privacyPolicy.section3.title")}
                    </h2>
                    <p className={`text-gray-700 mb-4 ${isRtl ? "text-right" : "text-left"}`}>
                      {t("privacyPolicy.section3.intro")}
                    </p>
                    <ul className={`list-disc list-inside space-y-2 text-gray-700 ml-4 ${isRtl ? "mr-4 ml-0" : ""}`}>
                      <li>{t("privacyPolicy.section3.item1")}</li>
                      <li>{t("privacyPolicy.section3.item2")}</li>
                      <li>{t("privacyPolicy.section3.item3")}</li>
                    </ul>
                  </motion.div>

                  {/* Section 4 */}
                  <motion.div variants={itemVariants}>
                    <h2 className={`text-2xl md:text-3xl font-bold text-[#06294A] mb-4 ${isRtl ? "text-right" : "text-left"}`}>
                      {t("privacyPolicy.section4.title")}
                    </h2>
                    <ul className={`list-disc list-inside space-y-2 text-gray-700 ml-4 ${isRtl ? "mr-4 ml-0" : ""}`}>
                      <li>{t("privacyPolicy.section4.item1")}</li>
                      <li>{t("privacyPolicy.section4.item2")}</li>
                      <li>{t("privacyPolicy.section4.item3")}</li>
                      <li>{t("privacyPolicy.section4.item4")}</li>
                    </ul>
                  </motion.div>

                  {/* Section 5 */}
                  <motion.div variants={itemVariants}>
                    <h2 className={`text-2xl md:text-3xl font-bold text-[#06294A] mb-4 ${isRtl ? "text-right" : "text-left"}`}>
                      {t("privacyPolicy.section5.title")}
                    </h2>
                    <ul className={`list-disc list-inside space-y-2 text-gray-700 ml-4 ${isRtl ? "mr-4 ml-0" : ""}`}>
                      <li>{t("privacyPolicy.section5.item1")}</li>
                      <li>{t("privacyPolicy.section5.item2")}</li>
                      <li>{t("privacyPolicy.section5.item3")}</li>
                    </ul>
                    <p className={`mt-4 text-gray-700 ${isRtl ? "text-right" : "text-left"}`}>
                      {t("privacyPolicy.section5.note")}
                    </p>
                  </motion.div>

                  {/* Section 6 */}
                  <motion.div variants={itemVariants}>
                    <h2 className={`text-2xl md:text-3xl font-bold text-[#06294A] mb-4 ${isRtl ? "text-right" : "text-left"}`}>
                      {t("privacyPolicy.section6.title")}
                    </h2>
                    <ul className={`list-disc list-inside space-y-2 text-gray-700 ml-4 ${isRtl ? "mr-4 ml-0" : ""}`}>
                      <li>{t("privacyPolicy.section6.item1")}</li>
                      <li>{t("privacyPolicy.section6.item2")}</li>
                      <li>{t("privacyPolicy.section6.item3")}</li>
                      <li>{t("privacyPolicy.section6.item4")}</li>
                    </ul>
                  </motion.div>

                  {/* Section 7 */}
                  <motion.div variants={itemVariants}>
                    <h2 className={`text-2xl md:text-3xl font-bold text-[#06294A] mb-4 ${isRtl ? "text-right" : "text-left"}`}>
                      {t("privacyPolicy.section7.title")}
                    </h2>
                    <p className={`text-gray-700 mb-4 ${isRtl ? "text-right" : "text-left"}`}>
                      {t("privacyPolicy.section7.intro")}
                    </p>
                    <ul className={`list-disc list-inside space-y-2 text-gray-700 ml-4 ${isRtl ? "mr-4 ml-0" : ""}`}>
                      <li>{t("privacyPolicy.section7.item1")}</li>
                      <li>{t("privacyPolicy.section7.item2")}</li>
                    </ul>
                    <p className={`mt-4 text-gray-700 ${isRtl ? "text-right" : "text-left"}`}>
                      {t("privacyPolicy.section7.note")}
                    </p>
                  </motion.div>

                  {/* Section 8 */}
                  <motion.div variants={itemVariants}>
                    <h2 className={`text-2xl md:text-3xl font-bold text-[#06294A] mb-4 ${isRtl ? "text-right" : "text-left"}`}>
                      {t("privacyPolicy.section8.title")}
                    </h2>
                    <p className={`text-gray-700 ${isRtl ? "text-right" : "text-left"}`}>
                      {t("privacyPolicy.section8.content")}
                    </p>
                  </motion.div>

                  {/* Section 9 */}
                  <motion.div variants={itemVariants}>
                    <h2 className={`text-2xl md:text-3xl font-bold text-[#06294A] mb-4 ${isRtl ? "text-right" : "text-left"}`}>
                      {t("privacyPolicy.section9.title")}
                    </h2>
                    <p className={`text-gray-700 ${isRtl ? "text-right" : "text-left"}`}>
                      {t("privacyPolicy.section9.content")}
                    </p>
                  </motion.div>

                  {/* Section 10 */}
                  <motion.div variants={itemVariants}>
                    <h2 className={`text-2xl md:text-3xl font-bold text-[#06294A] mb-4 ${isRtl ? "text-right" : "text-left"}`}>
                      {t("privacyPolicy.section10.title")}
                    </h2>
                    <p className={`text-gray-700 mb-4 ${isRtl ? "text-right" : "text-left"}`}>
                      {t("privacyPolicy.section10.intro")}
                    </p>
                    <ul className={`list-disc list-inside space-y-2 text-gray-700 ml-4 ${isRtl ? "mr-4 ml-0" : ""}`}>
                      <li>{t("privacyPolicy.section10.item1")}</li>
                      <li>{t("privacyPolicy.section10.item2")}</li>
                    </ul>
                  </motion.div>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
