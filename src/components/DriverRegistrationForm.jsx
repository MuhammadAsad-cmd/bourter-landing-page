"use client";

import { useState } from "react";
import Link from "next/link";
import ProgressIndicator from "./driver-registration/ProgressIndicator";
import PersonalInfoStep from "./driver-registration/PersonalInfoStep";
import VehicleInfoStep from "./driver-registration/VehicleInfoStep";
import DocumentsStep from "./driver-registration/DocumentsStep";
import PlanSelectionStep from "./driver-registration/PlanSelectionStep";
import SuccessModal from "./driver-registration/SuccessModal";
import FormNavigation from "./driver-registration/FormNavigation";

const DriverRegistrationForm = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [formData, setFormData] = useState({
    // Personal Information
    name: "",
    phone: "",
    email: "",
    address: "",
    password: "",
    confirmPassword: "",
    profilePicture: null,

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

  const handleInputChange = (e) => {
    const { name, value, files } = e.target;
    if (files && files[0]) {
      setFormData((prev) => ({ ...prev, [name]: files[0] }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleNext = () => {
    if (currentStep < 4) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission here
    setShowSuccessModal(true);
  };

  const plans = {
    monthly: [
      {
        name: "Basic Plan",
        price: "$19.99",
        period: "/month",
        features: [
          "Ride history & ratings",
          "Access to payout & wallet",
          "Unlimited ride requests",
          "In-app navigation & support",
        ],
      },
      {
        name: "Premium Plan",
        price: "$29.99",
        period: "/month",
        features: [
          "Ride history & ratings",
          "Access to payout & wallet",
          "Unlimited ride requests",
          "In-app navigation & support",
          "Priority support",
          "Advanced analytics",
        ],
      },
    ],
    yearly: [
      {
        name: "Basic Plan",
        price: "$191.90",
        period: "/year",
        originalPrice: "$239.88",
        features: [
          "Ride history & ratings",
          "Access to payout & wallet",
          "Unlimited ride requests",
          "In-app navigation & support",
        ],
      },
      {
        name: "Premium Plan",
        price: "$287.90",
        period: "/year",
        originalPrice: "$359.88",
        features: [
          "Ride history & ratings",
          "Access to payout & wallet",
          "Unlimited ride requests",
          "In-app navigation & support",
          "Priority support",
          "Advanced analytics",
        ],
      },
    ],
  };

  const renderStep = () => {
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
          />
        );
      case 4:
        return (
          <PlanSelectionStep
            formData={formData}
            setFormData={setFormData}
            plans={plans}
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
            Join our community of drivers and start earning on your own schedule.
          </p>
        </div>

        {/* Progress Indicator */}
        <ProgressIndicator steps={steps} currentStep={currentStep} />

        {/* Form Container */}
        <div className="bg-white/80 backdrop-blur-xl rounded-[32px] shadow-2xl border border-white/50 p-6 md:p-10 relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-1 bg-linear-to-r from-transparent via-primary/20 to-transparent opacity-50" />

          <form onSubmit={handleSubmit} className="relative z-10">
            <div className="min-h-[400px]">
              {renderStep()}
            </div>

            {/* Navigation Buttons */}
            <FormNavigation
              currentStep={currentStep}
              handleBack={handleBack}
              handleNext={handleNext}
              isLastStep={currentStep === 4}
            />
          </form>
        </div>
      </div>

      {/* Success Modal */}
      {showSuccessModal && <SuccessModal onClose={() => setShowSuccessModal(false)} />}
    </div>
  );
};

export default DriverRegistrationForm;
