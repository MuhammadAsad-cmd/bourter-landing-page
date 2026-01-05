import LoginStep from "./steps/LoginStep";
import AccountInfoStep from "./steps/AccountInfoStep";
import CompanyDetailsStep from "./steps/CompanyDetailsStep";
import VerificationStep from "./steps/VerificationStep";

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
  setError,
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
      return <VerificationStep userData={userData} t={t} />;
    default:
      return null;
  }
};

export default StepRenderer;


