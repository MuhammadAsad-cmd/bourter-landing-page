import { useState } from "react";
import { createInitialCompanyFormData } from "../utils/formDataUtils";

export const useCompanyRegistrationForm = (t) => {
  const [showLogin, setShowLogin] = useState(true);
  const [currentStep, setCurrentStep] = useState(1);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [userData, setUserData] = useState(null);
  const [token, setToken] = useState(null);
  const [companyId, setCompanyId] = useState(null);
  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });
  const [formData, setFormData] = useState(createInitialCompanyFormData());
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const steps = [
    { number: 1, title: t("companyPage.form.steps.account") },
    { number: 2, title: t("companyPage.form.steps.businessDetails") },
    { number: 3, title: t("companyPage.form.steps.verification") },
  ];

  const handleLoginChange = (e) => {
    const { name, value } = e.target;
    setLoginData((prev) => ({ ...prev, [name]: value }));
  };

  const handleInputChange = (e) => {
    const { name, value, files } = e.target;
    if (files && files[0]) {
      setFormData((prev) => ({ ...prev, [name]: files[0] }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleRegisterClick = () => {
    setShowLogin(false);
    setCurrentStep(1);
  };

  const handleAlreadyHaveAccountClick = () => {
    setLoginData((prev) => ({
      ...prev,
      email: formData.email || prev.email,
      password: "",
    }));
    setShowLogin(true);
    setCurrentStep(1);
  };

  const handleBack = () => {
    if (currentStep === 1) {
      setShowLogin(true);
      return;
    }
    setCurrentStep((s) => Math.max(1, s - 1));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setShowSuccessModal(true);
  };

  return {
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
  };
};


