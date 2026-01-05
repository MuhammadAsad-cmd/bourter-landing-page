import { useState } from "react";
import { createInitialFormData } from "../utils/formDataUtils";

export const useDriverRegistrationForm = (t) => {
  const [showLogin, setShowLogin] = useState(true);
  const [currentStep, setCurrentStep] = useState(1);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [userData, setUserData] = useState(null);
  const [token, setToken] = useState(null);
  const [userId, setUserId] = useState(null);
  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });
  const [formData, setFormData] = useState(createInitialFormData());
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const steps = [
    { number: 1, title: t("driverPage.form.steps.personalInfo") },
    { number: 2, title: t("driverPage.form.steps.vehicleInfo") },
    { number: 3, title: t("driverPage.form.steps.uploadDocuments") },
    { number: 4, title: t("driverPage.form.steps.choosePlan") },
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
    if (currentStep === 1 || currentStep === 4) {
      setShowLogin(true);
    } else if (currentStep === 2) {
      setCurrentStep(1);
    } else if (currentStep === 3) {
      setCurrentStep(2);
    }
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
  };
};

