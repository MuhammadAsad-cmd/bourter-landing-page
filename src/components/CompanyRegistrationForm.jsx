"use client";

import { useLanguage } from "@/lib/i18n/language-context";
import { getTranslations } from "@/lib/i18n/get-translations";
import { useTranslations } from "@/lib/i18n/use-translations";
import { useCompanyRegistrationForm } from "./company-registration/hooks/useCompanyRegistrationForm";
import { useCompanyRegistrationAPI } from "./company-registration/hooks/useCompanyRegistrationAPI";
import ProgressIndicator from "./driver-registration/ProgressIndicator";
import StepRenderer from "./company-registration/StepRenderer";
import LoginButtonSection from "./company-registration/LoginButtonSection";
import FormNavigation from "./company-registration/FormNavigation";
import SuccessModal from "./company-registration/SuccessModal";

const CompanyRegistrationForm = () => {
  const { locale } = useLanguage();
  const messages = getTranslations(locale);
  const { t } = useTranslations(messages);

  const {
    showLogin,
    setShowLogin,
    currentStep,
    setCurrentStep,
    showSuccessModal,
    setShowSuccessModal,
    userData,
    setUserData,
    token,
    setToken,
    companyId,
    setCompanyId,
    loginData,
    setLoginData,
    formData,
    setFormData,
    showPassword,
    setShowPassword,
    showConfirmPassword,
    setShowConfirmPassword,
    steps,
    handleLoginChange,
    handleInputChange,
    handleRegisterClick,
    handleAlreadyHaveAccountClick,
    handleBack,
    handleSubmit,
  } = useCompanyRegistrationForm(t);

  const { loading, error, setError, handleLogin, handleNext } =
    useCompanyRegistrationAPI({
      formData,
      loginData,
      userData,
      companyId,
      token,
      setFormData,
      setUserData,
      setCompanyId,
      setToken,
      setCurrentStep,
      setShowLogin,
      t,
    });

  const onNext = async () => {
    await handleNext(currentStep, setCurrentStep);
  };

  return (
    <div className="min-h-screen py-12 px-4 relative overflow-hidden">
      <div className="max-w-3xl mx-auto relative z-10">
        <div className="mb-10 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4 tracking-tight">
            {t("companyPage.form.createAccount")}{" "}
            <span className="text-primary">
              {t("companyPage.form.accountHighlight")}
            </span>
          </h1>
          <p className="text-lg md:text-xl text-gray-600 max-w-xl mx-auto leading-relaxed">
            {t("companyPage.form.joinCommunity")}
          </p>
        </div>

        {!showLogin && (
          <ProgressIndicator steps={steps} currentStep={currentStep} />
        )}

        <div className="bg-white/80 backdrop-blur-xl rounded-[32px] shadow-2xl border border-white/50 p-6 md:p-10 relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-1 bg-linear-to-r from-transparent via-primary/20 to-transparent opacity-50" />

          <form
            onSubmit={showLogin ? handleLogin : handleSubmit}
            className="relative z-10"
          >
            {error && !showLogin && (
              <div className="mb-6 bg-red-50 border-2 border-red-200 rounded-full px-4 py-3 text-red-700 text-sm font-medium">
                {error}
              </div>
            )}

            <StepRenderer
              showLogin={showLogin}
              currentStep={currentStep}
              loginData={loginData}
              formData={formData}
              handleLoginChange={handleLoginChange}
              handleInputChange={handleInputChange}
              showPassword={showPassword}
              setShowPassword={setShowPassword}
              showConfirmPassword={showConfirmPassword}
              setShowConfirmPassword={setShowConfirmPassword}
              setFormData={setFormData}
              onRegisterClick={handleRegisterClick}
              onLoginClick={handleAlreadyHaveAccountClick}
              error={error}
              loading={loading}
              companyId={companyId}
              userData={userData}
              setUserData={setUserData}
              token={token}
              setError={setError}
              setShowSuccessModal={setShowSuccessModal}
              t={t}
            />

            {showLogin ? (
              <LoginButtonSection
                loading={loading}
                onRegisterClick={handleRegisterClick}
                t={t}
              />
            ) : currentStep !== 3 ? (
              <FormNavigation
                currentStep={currentStep}
                handleBack={handleBack}
                handleNext={onNext}
                isLastStep={currentStep === steps.length}
                loading={loading}
                t={t}
              />
            ) : (
              <div className="flex items-center justify-between mt-10 pt-6 border-t border-gray-100">
                <div className="w-[120px]">
                  {currentStep > 1 ? (
                    <button
                      type="button"
                      onClick={handleBack}
                      disabled={loading}
                      className="group flex items-center gap-2 px-5 py-2.5 rounded-full text-gray-600 hover:text-primary font-semibold hover:bg-gray-50 transition-all cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      <svg
                        className="w-5 h-5 group-hover:-translate-x-1 transition-transform"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M15 19l-7-7 7-7"
                        />
                      </svg>
                      {t("companyPage.form.navigation.back")}
                    </button>
                  ) : (
                    <div />
                  )}
                </div>
                <div className="w-fit"></div>
              </div>
            )}
          </form>
        </div>
      </div>

      {showSuccessModal && (
        <SuccessModal onClose={() => setShowSuccessModal(false)} t={t} />
      )}
    </div>
  );
};

export default CompanyRegistrationForm;


