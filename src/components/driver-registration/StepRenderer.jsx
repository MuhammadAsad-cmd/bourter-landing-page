import LoginStep from "./LoginStep";
import PersonalInfoStep from "./PersonalInfoStep";
import VehicleInfoStep from "./VehicleInfoStep";
import DocumentsStep from "./DocumentsStep";
import PlanSelectionStep from "./PlanSelectionStep";

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
  userId,
  setShowSuccessModal,
  setUserData,
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
        <PersonalInfoStep
          formData={formData}
          handleInputChange={handleInputChange}
          showPassword={showPassword}
          setShowPassword={setShowPassword}
          showConfirmPassword={showConfirmPassword}
          setShowConfirmPassword={setShowConfirmPassword}
          setFormData={setFormData}
          onLoginClick={onLoginClick}
          t={t}
        />
      );
    case 2:
      return (
        <VehicleInfoStep
          formData={formData}
          handleInputChange={handleInputChange}
          t={t}
        />
      );
    case 3:
      return (
        <DocumentsStep
          formData={formData}
          handleInputChange={handleInputChange}
          setFormData={setFormData}
          t={t}
        />
      );
    case 4:
      return (
        <PlanSelectionStep
          formData={formData}
          setFormData={setFormData}
          userId={userId}
          t={t}
          setShowSuccessModal={setShowSuccessModal}
          setUserData={setUserData}
        />
      );
    default:
      return null;
  }
};

export default StepRenderer;

