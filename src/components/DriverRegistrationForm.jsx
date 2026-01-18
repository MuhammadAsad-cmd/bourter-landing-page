"use client";

import { useLanguage } from "@/lib/i18n/language-context";
import { getTranslations } from "@/lib/i18n/get-translations";
import { useTranslations } from "@/lib/i18n/use-translations";
import { useDriverRegistrationForm } from "./driver-registration/hooks/useDriverRegistrationForm";
import { useDriverRegistrationAPI } from "./driver-registration/hooks/useDriverRegistrationAPI";
import ProgressIndicator from "./driver-registration/ProgressIndicator";
import StepRenderer from "./driver-registration/StepRenderer";
import LoginButtonSection from "./driver-registration/LoginButtonSection";
import FormNavigation from "./driver-registration/FormNavigation";
import SuccessModal from "./driver-registration/SuccessModal";

const DriverRegistrationForm = () => {
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
    userId,
    setUserId,
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
  } = useDriverRegistrationForm(t);

  const {
    loading,
    error,
    setError,
    handleLogin,
    handleRegister,
    handleVehicleDetails,
    handleNext,
  } = useDriverRegistrationAPI({
    formData,
    loginData,
    userData,
    userId,
    token,
    setFormData,
    setUserData,
    setUserId,
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
            {t("driverPage.form.createAccount")}{" "}
            <span className="text-primary">{t("driverPage.form.accountHighlight")}</span>
          </h1>
          <p className="text-lg md:text-xl text-gray-600 max-w-xl mx-auto leading-relaxed">
            {t("driverPage.form.joinCommunity")}
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
              userId={userId}
              setShowSuccessModal={setShowSuccessModal}
              setUserData={setUserData}
              t={t}
            />

            {showLogin ? (
              <LoginButtonSection
                loading={loading}
                onRegisterClick={handleRegisterClick}
                t={t}
              />
            ) : (
              <FormNavigation
                currentStep={currentStep}
                handleBack={handleBack}
                handleNext={onNext}
                isLastStep={currentStep === 4}
                loading={loading}
                t={t}
              />
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

export default DriverRegistrationForm;
