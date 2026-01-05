"use client";

import { useState } from "react";
import Link from "next/link";
import axios from "axios";
import ProgressIndicator from "./driver-registration/ProgressIndicator";
import LoginStep from "./driver-registration/LoginStep";
import PersonalInfoStep from "./driver-registration/PersonalInfoStep";
import VehicleInfoStep from "./driver-registration/VehicleInfoStep";
import DocumentsStep from "./driver-registration/DocumentsStep";
import PlanSelectionStep from "./driver-registration/PlanSelectionStep";
import SuccessModal from "./driver-registration/SuccessModal";
import FormNavigation from "./driver-registration/FormNavigation";
import { useLanguage } from "@/lib/i18n/language-context";
import { getTranslations } from "@/lib/i18n/get-translations";
import { useTranslations } from "@/lib/i18n/use-translations";

const DriverRegistrationForm = () => {
  const { locale } = useLanguage();
  const messages = getTranslations(locale);
  const { t } = useTranslations(messages);
  const [showLogin, setShowLogin] = useState(true);
  const [currentStep, setCurrentStep] = useState(1);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [userData, setUserData] = useState(null);
  const [token, setToken] = useState(null);
  const [userId, setUserId] = useState(null);

  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });

  const [formData, setFormData] = useState({
    // Personal Information
    name: "",
    phone: "",
    email: "",
    address: "",
    password: "",
    confirmPassword: "",
    profilePicture: null,
    country: "",
    city: "",

    // Vehicle Information
    vehicleType: "",
    vehicleModel: "",
    vehicleNumber: "",
    color: "",

    // Documents
    idCard: null,
    drivingLicense: null,
    vehicleRegistration: null,
    vehicleImage: null,

    // Plan
    selectedPlan: "",
    planType: "monthly", // monthly or yearly
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const steps = [
    { number: 1, title: t("driverPage.form.steps.personalInfo") },
    { number: 2, title: t("driverPage.form.steps.vehicleInfo") },
    { number: 3, title: t("driverPage.form.steps.uploadDocuments") },
    { number: 4, title: t("driverPage.form.steps.choosePlan") },
  ];

  // Backend onboarding steps come back on 401 from /rider/login:
  // - step 0 => user needs to register => UI step 1 (Personal Information)
  // - step 1 => vehicle details remaining => UI step 2 (Vehicle Information)
  // - step 2 => payment incomplete => UI step 4 (Plans)
  const apiStepToUiStep = (apiStep) => {
    switch (Number(apiStep)) {
      case 0:
        return 1;
      case 1:
        return 2;
      case 2:
        return 4;
      default:
        return 1;
    }
  };

  // Determine which step to show based on user data
  const determineNextStep = (user) => {
    // If user doesn't have basic info, start at step 1
    if (!user.name || !user.phone || !user.address || !user.email) {
      return 1;
    }
    // If user doesn't have city or country, start at step 1
    if (!user.city || !user.country) {
      return 1;
    }
    // If user doesn't have vehicle info, start at step 2
    if (!user.vehicleType || !user.vehicleNumber || !user.vehicleModel || !user.vehicleColor) {
      return 2;
    }
    // If user doesn't have documents, start at step 3
    if (
      !user.idCardImage ||
      !user.licenseImage ||
      !user.vehicleImage ||
      !user.vehicleCardImage
    ) {
      return 3;
    }
    // If payment is not completed, go to plan selection
    if (!user.paymentCompleted) {
      return 4;
    }
    // If everything is complete, show step 1 (Personal Information) as default
    return 1;
  };

  // Populate form data from user data
  const populateFormFromUserData = (user) => {
    setFormData((prev) => ({
      ...prev,
      // Personal Information
      name: user.name || "",
      phone: user.phone || "",
      email: user.email || "",
      address: user.address || "",
      country: user.country || "",
      city: user.city || "",
      // Profile picture - store as URL string (will be handled by component)
      profilePicture: user.image || null,
      
      // Vehicle Information
      vehicleType: user.vehicleType || "",
      vehicleModel: user.vehicleModel || "",
      vehicleNumber: user.vehicleNumber || "",
      color: user.vehicleColor || "",
      
      // Documents - store as URL strings (will be handled by component)
      idCard: user.idCardImage || null,
      drivingLicense: user.licenseImage || null,
      vehicleImage: user.vehicleImage || null,
      vehicleRegistration: user.vehicleCardImage || null,
      
      // Plan information if available
      selectedPlan: user.packageDetails?._id || "",
    }));
  };

  const handleLoginChange = (e) => {
    const { name, value } = e.target;
    setLoginData((prev) => ({ ...prev, [name]: value }));
    setError("");
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_BASE_URL}/rider/login`,
        {
          email: loginData.email,
          password: loginData.password,
        }
      );

      if (response.data.result) {
        setToken(response.data.token);
        setUserData(response.data.data);
        setUserId(response.data.data._id);
        populateFormFromUserData(response.data.data);

        // Determine which step to show
        const nextStep = determineNextStep(response.data.data);
        setCurrentStep(nextStep);
        setShowLogin(false);
      } else {
        setError(
          response.data.message ||
            t("driverPage.form.errors.loginFailed")
        );
      }
    } catch (err) {
      const status = err.response?.status;
      const data = err.response?.data;

      // Backend uses 401 to indicate onboarding is incomplete; it includes `step`
      if (status === 401 && typeof data?.step !== "undefined") {
        const nextUiStep = apiStepToUiStep(data.step);
        setError(data?.message || "");

        // If backend provides user data, store/prefill it
        if (data?.data) {
          setUserData(data.data);
          setUserId(data.data._id);
          populateFormFromUserData(data.data);
        } else {
          // Step 0 comes with data: null — prefill at least the email from login
          setFormData((prev) => ({
            ...prev,
            email: prev.email || loginData.email || "",
          }));
        }

        // Sometimes backend may still send token; keep it if present
        if (data?.token) {
          setToken(data.token);
        }

        setCurrentStep(nextUiStep);
        setShowLogin(false);
        return;
      }

      // Show backend validation message (e.g. 400) on login step
      if (status === 400) {
        setError(data?.message || t("driverPage.form.errors.loginFailed"));
        return;
      }

      setError(data?.message || t("driverPage.form.errors.loginFailed"));
    } finally {
      setLoading(false);
    }
  };

  const handleRegisterClick = () => {
    setError("");
    setShowLogin(false);
    setCurrentStep(1);
  };

  const handleAlreadyHaveAccountClick = () => {
    setError("");
    // Prefill login email if user already typed it in registration
    setLoginData((prev) => ({
      ...prev,
      email: formData.email || prev.email,
      password: "",
    }));
    setShowLogin(true);
    setCurrentStep(1);
  };

  const handleInputChange = (e) => {
    const { name, value, files } = e.target;
    if (files && files[0]) {
      setFormData((prev) => ({ ...prev, [name]: files[0] }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleNext = async () => {
    // If moving from step 1 to 2, submit registration if not logged in
    if (currentStep === 1 && !userData) {
      await handleRegister();
      return;
    }

    // If moving from step 2 to 3, just move to next step (no API call)
    if (currentStep === 2) {
      setCurrentStep(3);
      return;
    }

    // If moving from step 3 to 4, submit vehicle details and documents
    if (currentStep === 3) {
      await handleVehicleDetails();
      return;
    }

    if (currentStep < 4) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleRegister = async () => {
    setLoading(true);
    setError("");

    try {
      const formDataToSend = new FormData();
      formDataToSend.append("name", formData.name);
      formDataToSend.append("email", formData.email);
      formDataToSend.append("phone", formData.phone);
      formDataToSend.append("address", formData.address);
      formDataToSend.append("password", formData.password);
      if (formData.country) {
        formDataToSend.append("country", formData.country);
      }
      if (formData.city) {
        formDataToSend.append("city", formData.city);
      }
      if (formData.profilePicture) {
        formDataToSend.append("image", formData.profilePicture);
      }

      // DO NOT set Content-Type header manually - axios will set it with the correct boundary
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_BASE_URL}/rider/register`,
        formDataToSend
      );

      if (response.data.result || response.data.success) {
        // Registration successful, move to next step
        setCurrentStep(2);
        if (response.data.data) {
          setUserData(response.data.data);
          setUserId(response.data.data._id || response.data.data.userId);
          if (response.data.token) {
            setToken(response.data.token);
          }
        }
      } else {
        setError(
          response.data.message || t("driverPage.form.errors.registrationFailed")
        );
      }
    } catch (err) {
      setError(
        err.response?.data?.message || t("driverPage.form.errors.registrationFailed")
      );
    } finally {
      setLoading(false);
    }
  };

  const handleVehicleDetails = async () => {
    if (!userId) {
      setError(t("driverPage.form.errors.userIdNotFound"));
      return;
    }

    setLoading(true);
    setError("");

    try {
      const formDataToSend = new FormData();
      let hasData = false;

      // Vehicle information (always include when submitting from documents step)
      if (formData.vehicleType) {
        formDataToSend.append("vehicleType", formData.vehicleType);
        hasData = true;
      }
      if (formData.vehicleModel) {
        formDataToSend.append("vehicleModel", formData.vehicleModel);
        hasData = true;
      }
      if (formData.color) {
        formDataToSend.append("vehicleColor", formData.color);
        hasData = true;
      }
      if (formData.vehicleNumber) {
        formDataToSend.append("vehicleNumber", formData.vehicleNumber);
        hasData = true;
      }

      // Documents (always include when submitting from documents step)
      // Check if files are File objects (new uploads) or URL strings (already uploaded)
      const hasNewFiles = 
        (formData.idCard && formData.idCard instanceof File) ||
        (formData.drivingLicense && formData.drivingLicense instanceof File) ||
        (formData.vehicleImage && formData.vehicleImage instanceof File) ||
        (formData.vehicleRegistration && formData.vehicleRegistration instanceof File);

      const allFilesAreUploaded = 
        formData.idCard && typeof formData.idCard === 'string' && formData.idCard.startsWith('http') &&
        formData.drivingLicense && typeof formData.drivingLicense === 'string' && formData.drivingLicense.startsWith('http') &&
        formData.vehicleImage && typeof formData.vehicleImage === 'string' && formData.vehicleImage.startsWith('http') &&
        formData.vehicleRegistration && typeof formData.vehicleRegistration === 'string' && formData.vehicleRegistration.startsWith('http');

      // If all files are already uploaded (URLs) and no new files to upload
      if (allFilesAreUploaded && !hasNewFiles) {
        // Check if we have other data to update (vehicle info, city, country, location)
        const hasOtherData = 
          formData.vehicleType || 
          formData.vehicleModel || 
          formData.color || 
          formData.vehicleNumber ||
          formData.city ||
          formData.country;

        if (!hasOtherData) {
          // No new data to send, just move to next step
          setCurrentStep(currentStep + 1);
          setLoading(false);
          return;
        }
        // If we have other data but no new files, the backend still requires files
        // So we skip the API call and just move to next step
        // The data will be saved when user uploads new files or updates other fields
        setCurrentStep(currentStep + 1);
        setLoading(false);
        return;
      }

      // Only send files if they are File objects (new uploads)
      if (formData.idCard && formData.idCard instanceof File) {
        formDataToSend.append("idCardImage", formData.idCard, formData.idCard.name || "idCard.jpg");
        hasData = true;
      }
      if (formData.drivingLicense && formData.drivingLicense instanceof File) {
        formDataToSend.append("licenseImage", formData.drivingLicense, formData.drivingLicense.name || "license.jpg");
        hasData = true;
      }
      if (formData.vehicleImage && formData.vehicleImage instanceof File) {
        formDataToSend.append("vehicleImage", formData.vehicleImage, formData.vehicleImage.name || "vehicle.jpg");
        hasData = true;
      }
      if (formData.vehicleRegistration && formData.vehicleRegistration instanceof File) {
        formDataToSend.append("vehicleCardImage", formData.vehicleRegistration, formData.vehicleRegistration.name || "vehicleCard.jpg");
        hasData = true;
      }

      // Include city, country, and location if available
      if (formData.city) {
        formDataToSend.append("city", formData.city);
        hasData = true;
      }
      if (formData.country) {
        formDataToSend.append("country", formData.country);
        hasData = true;
      }

      // Only send if there's data to send
      if (!hasData) {
        // No data to send, just move to next step
        setCurrentStep(currentStep + 1);
        setLoading(false);
        return;
      }

      // DO NOT set Content-Type header manually - axios will set it with the correct boundary
      // Use transformRequest to ensure FormData is sent correctly
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_BASE_URL}/rider/details/${userId}`,
        formDataToSend,
        {
          headers: {
            ...(token && { Authorization: `Bearer ${token}` }),
          },
          // Prevent axios from transforming FormData
          transformRequest: [(data) => data],
        }
      );

      if (response.data.result || response.data.success) {
        // Details saved successfully, move to next step
        setCurrentStep(currentStep + 1);
        if (response.data.data) {
          setUserData((prev) => ({ ...prev, ...response.data.data }));
        }
      } else {
        setError(
          response.data.message || t("driverPage.form.errors.saveFailed")
        );
      }
    } catch (err) {
      setError(
        err.response?.data?.message ||
          t("driverPage.form.errors.saveFailed")
      );
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Handle final submission (plan selection)
    setShowSuccessModal(true);
  };

  const renderStep = () => {
    if (showLogin) {
      return (
        <LoginStep
          loginData={loginData}
          handleLoginChange={handleLoginChange}
          showPassword={showPassword}
          setShowPassword={setShowPassword}
          onRegisterClick={handleRegisterClick}
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
            onLoginClick={handleAlreadyHaveAccountClick}
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
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen py-12 px-4 relative overflow-hidden">
      <div className="max-w-3xl mx-auto relative z-10">
        {/* Header */}
        <div className="mb-10 text-center">
          {/* <Link
            href="/"
            className="inline-flex items-center gap-2 text-primary hover:opacity-80 transition-opacity mb-8 bg-white/50 backdrop-blur-sm px-4 py-2 rounded-full border border-gray-100 shadow-sm"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z"
                clipRule="evenodd"
              />
            </svg>
            <span className="text-sm font-medium">Back to Home</span>
          </Link> */}

          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4 tracking-tight">
            {t("driverPage.form.createAccount")} <span className="text-primary">{t("driverPage.form.accountHighlight")}</span>
          </h1>
          <p className="text-lg md:text-xl text-gray-600 max-w-xl mx-auto leading-relaxed">
            {t("driverPage.form.joinCommunity")}
          </p>
        </div>

        {/* Progress Indicator - Only show when not on login */}
        {!showLogin && (
          <ProgressIndicator steps={steps} currentStep={currentStep} />
        )}

        {/* Form Container */}
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
            <div className="">{renderStep()}</div>

            {/* Navigation Buttons */}
            {showLogin ? (
              <>
                <div className="flex items-center justify-center pt-6 border-t border-gray-100">
                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full max-w-[200px] flex items-center justify-center gap-2 px-6 py-3.5 rounded-full font-bold text-white transition-all transform hover:scale-[1.02] active:scale-[0.98] shadow-lg hover:shadow-primary/30 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                    style={{
                      background:
                        "linear-gradient(130.4deg, #0053A2 15.06%, #06294A 87.46%)",
                    }}
                  >
                    {loading ? t("driverPage.form.login.loggingIn") : t("driverPage.form.login.loginButton")}
                    {!loading && (
                      <svg
                        className="w-5 h-5 animate-pulse"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M9 5l7 7-7 7"
                        />
                      </svg>
                    )}
                  </button>
                </div>
                <div className="pt-4 text-center">
                  <p className="text-gray-600 text-sm">
                    {t("driverPage.form.login.dontHaveAccount")}{" "}
                    <button
                      type="button"
                      onClick={handleRegisterClick}
                      className="text-primary font-semibold cursor-pointer hover:underline"
                      disabled={loading}
                    >
                      {t("driverPage.form.login.registerHere")}
                    </button>
                  </p>
                </div>
              </>
            ) : (
              <FormNavigation
                currentStep={currentStep}
                handleBack={handleBack}
                handleNext={handleNext}
                isLastStep={currentStep === 4}
                loading={loading}
                t={t}
              />
            )}
          </form>
        </div>
      </div>

      {/* Success Modal */}
      {showSuccessModal && (
        <SuccessModal onClose={() => setShowSuccessModal(false)} t={t} />
      )}
    </div>
  );
};

export default DriverRegistrationForm;
