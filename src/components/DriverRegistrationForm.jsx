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

const DriverRegistrationForm = () => {
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
    location: {
      lat: "",
      long: "",
    },

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
    { number: 1, title: "Personal Information" },
    { number: 2, title: "Vehicle Information" },
    { number: 3, title: "Upload Documents" },
    { number: 4, title: "Choose Plan" },
  ];

  // Determine which step to show based on user data
  const determineNextStep = (user) => {
    // If user doesn't have basic info, start at step 1
    if (!user.name || !user.phone || !user.address) {
      return 1;
    }
    // If user doesn't have vehicle info, start at step 2
    if (!user.vehicleType || !user.vehicleNumber) {
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
    // Otherwise, go to plan selection
    return 4;
  };

  // Populate form data from user data
  const populateFormFromUserData = (user) => {
    setFormData((prev) => ({
      ...prev,
      name: user.name || "",
      phone: user.phone || "",
      email: user.email || "",
      address: user.address || "",
      country: user.country || "",
      city: user.city || "",
      location: {
        lat: user.location?.lat || "",
        long: user.location?.long || "",
      },
      vehicleType: user.vehicleType || "",
      vehicleModel: user.vehicleModel || "",
      vehicleNumber: user.vehicleNumber || "",
      color: user.vehicleColor || "",
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
            "Login failed. Please check your credentials."
        );
      }
    } catch (err) {
      setError(
        err.response?.data?.message ||
          "Login failed. Please check your credentials."
      );
    } finally {
      setLoading(false);
    }
  };

  const handleRegisterClick = () => {
    setShowLogin(false);
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
      if (formData.location?.lat) {
        formDataToSend.append("location[lat]", formData.location.lat);
      }
      if (formData.location?.long) {
        formDataToSend.append("location[long]", formData.location.long);
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
          response.data.message || "Registration failed. Please try again."
        );
      }
    } catch (err) {
      setError(
        err.response?.data?.message || "Registration failed. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  const handleVehicleDetails = async () => {
    if (!userId) {
      setError("User ID not found. Please register first.");
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
      // Append files if they exist - ensure they are File objects with proper filenames
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
      if (formData.location?.lat) {
        formDataToSend.append("location[lat]", formData.location.lat);
        hasData = true;
      }
      if (formData.location?.long) {
        formDataToSend.append("location[long]", formData.location.long);
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
          response.data.message || "Failed to save details. Please try again."
        );
      }
    } catch (err) {
      setError(
        err.response?.data?.message ||
          "Failed to save details. Please try again."
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
          />
        );
      case 2:
        return (
          <VehicleInfoStep
            formData={formData}
            handleInputChange={handleInputChange}
          />
        );
      case 3:
        return (
          <DocumentsStep
            formData={formData}
            handleInputChange={handleInputChange}
            setFormData={setFormData}
          />
        );
      case 4:
        return (
          <PlanSelectionStep 
            formData={formData} 
            setFormData={setFormData}
            userId={userId}
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
            Create Your <span className="text-primary">Driver Account</span>
          </h1>
          <p className="text-lg md:text-xl text-gray-600 max-w-xl mx-auto leading-relaxed">
            Join our community of drivers and start earning on your own
            schedule.
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
                    {loading ? "Logging in..." : "Login"}
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
                    Don't have an account?{" "}
                    <button
                      type="button"
                      onClick={handleRegisterClick}
                      className="text-primary font-semibold cursor-pointer hover:underline"
                      disabled={loading}
                    >
                      Register here
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
              />
            )}
          </form>
        </div>
      </div>

      {/* Success Modal */}
      {showSuccessModal && (
        <SuccessModal onClose={() => setShowSuccessModal(false)} />
      )}
    </div>
  );
};

export default DriverRegistrationForm;
