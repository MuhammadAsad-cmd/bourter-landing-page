import LoginStep from "./steps/LoginStep";
import AccountInfoStep from "./steps/AccountInfoStep";
import CompanyDetailsStep from "./steps/CompanyDetailsStep";
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


