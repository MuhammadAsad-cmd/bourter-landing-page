import LoginStep from "./steps/LoginStep";
import AccountInfoStep from "./steps/AccountInfoStep";
import CompanyDetailsStep from "./steps/CompanyDetailsStep";
import VerificationStep from "./steps/VerificationStep";
import PlanSelectionStep from "./steps/PlanSelectionStep";

const StepRenderer = ({
  showLogin,
  currentStep,
  loginData,
  formData,
  handleLoginChange,
  handleInputChange,
  showPassword,
  setShowPassword,
  showConfirmPassword,
  setShowConfirmPassword,
  setFormData,
  onRegisterClick,
  onLoginClick,
  error,
  loading,
  companyId,
  userData,
  setUserData,
  token,
  setError,
  setShowSuccessModal,
  t,
}) => {
  if (showLogin) {
    return (
      <LoginStep
        loginData={loginData}
        handleLoginChange={handleLoginChange}
        showPassword={showPassword}
        setShowPassword={setShowPassword}
        onRegisterClick={onRegisterClick}
        error={error}
        loading={loading}
        t={t}
      />
    );
  }

  switch (currentStep) {
    case 1:
      return (
        <AccountInfoStep
          formData={formData}
          handleInputChange={handleInputChange}
          showPassword={showPassword}
          setShowPassword={setShowPassword}
          showConfirmPassword={showConfirmPassword}
          setShowConfirmPassword={setShowConfirmPassword}
          setFormData={setFormData}
          onLoginClick={onLoginClick}
          setError={setError}
          t={t}
        />
      );
    case 2:
      return (
        <CompanyDetailsStep
          formData={formData}
          handleInputChange={handleInputChange}
          setFormData={setFormData}
          companyId={companyId}
          t={t}
        />
      );
    case 3:
      // Don't show verification step if already verified
      if (userData?.accountVerify) {
        // If verified, check what's missing and redirect
        // This shouldn't happen if determineNextCompanyStep works correctly,
        // but as a safety check, move to plan selection if missing package
        if (!userData?.packageDetails) {
          return (
            <PlanSelectionStep
              formData={formData}
              setFormData={setFormData}
              companyId={companyId}
              token={token}
              t={t}
              setError={setError}
              error={error}
              setUserData={setUserData}
              setShowSuccessModal={setShowSuccessModal}
            />
          );
        }
        // If everything is complete, show account step
        return null;
      }
      return <VerificationStep userData={userData} t={t} />;
    case 4:
      return (
        <PlanSelectionStep
          formData={formData}
          setFormData={setFormData}
          companyId={companyId}
          token={token}
          t={t}
          setError={setError}
          error={error}
          setUserData={setUserData}
          setShowSuccessModal={setShowSuccessModal}
        />
      );
    default:
      return null;
  }
};

export default StepRenderer;


