import { useState } from "react";
import axios from "axios";
import { apiStepToUiStep, determineNextStep } from "../utils/stepUtils";
import { populateFormFromUserData, buildRegistrationFormData, buildVehicleDetailsFormData } from "../utils/formDataUtils";

export const useDriverRegistrationAPI = ({
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
}) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

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
        setFormData((prev) => ({
          ...prev,
          ...populateFormFromUserData(response.data.data),
        }));

        const nextStep = determineNextStep(response.data.data);
        setCurrentStep(nextStep);
        setShowLogin(false);
      } else {
        setError(
          response.data.message || t("driverPage.form.errors.loginFailed")
        );
      }
    } catch (err) {
      const status = err.response?.status;
      const data = err.response?.data;

      if (status === 401 && typeof data?.step !== "undefined") {
        const nextUiStep = apiStepToUiStep(data.step);
        setError(data?.message || "");

        if (data?.data) {
          setUserData(data.data);
          setUserId(data.data._id);
          setFormData((prev) => ({
            ...prev,
            ...populateFormFromUserData(data.data),
          }));
        } else {
          setFormData((prev) => ({
            ...prev,
            email: prev.email || loginData.email || "",
          }));
        }

        if (data?.token) {
          setToken(data.token);
        }

        setCurrentStep(nextUiStep);
        setShowLogin(false);
        return;
      }

      if (status === 400) {
        setError(data?.message || t("driverPage.form.errors.loginFailed"));
        return;
      }

      setError(data?.message || t("driverPage.form.errors.loginFailed"));
    } finally {
      setLoading(false);
    }
  };

  const handleRegister = async () => {
    setLoading(true);
    setError("");

    try {
      const formDataToSend = buildRegistrationFormData(formData);
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_BASE_URL}/rider/register`,
        formDataToSend
      );

      if (response.data.result || response.data.success) {
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

  const handleVehicleDetails = async (userId, token, currentStep, setCurrentStep) => {
    if (!userId) {
      setError(t("driverPage.form.errors.userIdNotFound"));
      return;
    }

    setLoading(true);
    setError("");

    try {
      const { formDataToSend, hasData, shouldSkip } = buildVehicleDetailsFormData(formData);

      if (shouldSkip || !hasData) {
        setCurrentStep(currentStep + 1);
        setLoading(false);
        return;
      }

      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_BASE_URL}/rider/details/${userId}`,
        formDataToSend,
        {
          headers: {
            ...(token && { Authorization: `Bearer ${token}` }),
          },
          transformRequest: [(data) => data],
        }
      );

      if (response.data.result || response.data.success) {
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
        err.response?.data?.message || t("driverPage.form.errors.saveFailed")
      );
    } finally {
      setLoading(false);
    }
  };


  const handleNext = async (currentStep, setCurrentStep) => {
    if (currentStep === 1 && !userData) {
      await handleRegister();
      return;
    }

    if (currentStep === 2) {
      setCurrentStep(3);
      return;
    }

    if (currentStep === 3) {
      await handleVehicleDetails(userId, token, currentStep, setCurrentStep);
      return;
    }

    if (currentStep < 4) {
      setCurrentStep(currentStep + 1);
    }
  };

  return {
    loading,
    error,
    setError,
    handleLogin,
    handleRegister,
    handleVehicleDetails,
    handleNext,
  };
};

