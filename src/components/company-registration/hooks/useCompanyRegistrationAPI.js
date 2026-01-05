import { useState } from "react";
import axios from "axios";
import {
  buildCompanyDetailsFormData,
  populateCompanyFormFromUserData,
} from "../utils/formDataUtils";
import { determineNextCompanyStep, apiStepToUiStep } from "../utils/stepUtils";

export const useCompanyRegistrationAPI = ({
  formData,
  loginData,
  userData,
  companyId,
  token,
  setFormData,
  setUserData,
  setCompanyId,
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
        `${process.env.NEXT_PUBLIC_BASE_URL}/company/login`,
        {
          email: loginData.email,
          password: loginData.password,
        }
      );

      if (response.data?.result) {
        setToken(response.data.token || null);
        setUserData(response.data.data || null);
        setCompanyId(response.data.data?._id || null);
        setFormData((prev) => ({
          ...prev,
          ...populateCompanyFormFromUserData(response.data.data || {}),
        }));

        const nextStep = determineNextCompanyStep(response.data.data || {});
        setCurrentStep(nextStep);
        setShowLogin(false);
      } else {
        setError(
          response.data?.message || t("companyPage.form.errors.loginFailed")
        );
      }
    } catch (err) {
      const status = err.response?.status;
      const data = err.response?.data;

      // Support the same "step-gated" login behavior as driver flow, if backend sends it.
      if (status === 401 && typeof data?.step !== "undefined") {
        const nextUiStep = apiStepToUiStep(data.step);
        setError(data?.message || "");

        if (data?.data) {
          setUserData(data.data);
          setCompanyId(data.data._id);
          setFormData((prev) => ({
            ...prev,
            ...populateCompanyFormFromUserData(data.data),
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

      setError(data?.message || t("companyPage.form.errors.loginFailed"));
    } finally {
      setLoading(false);
    }
  };

  const handleRegister = async () => {
    setLoading(true);
    setError("");

    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_BASE_URL}/company/register`,
        {
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          address: formData.address,
          password: formData.password,
          city: formData.city,
          country: formData.country,
        }
      );

      if (response.data?.result || response.data?.success) {
        const data = response.data?.data || null;
        setUserData(data);
        setCompanyId(data?._id || data?.userId || null);
        if (response.data?.token) {
          setToken(response.data.token);
        }
        setCurrentStep(2);
      } else {
        setError(
          response.data?.message ||
            t("companyPage.form.errors.registrationFailed")
        );
      }
    } catch (err) {
      setError(
        err.response?.data?.message ||
          t("companyPage.form.errors.registrationFailed")
      );
    } finally {
      setLoading(false);
    }
  };

  const handleCompanyDetails = async (id, authToken, currentStep, setStep) => {
    if (!id) {
      setError(t("companyPage.form.errors.companyIdNotFound"));
      return;
    }

    setLoading(true);
    setError("");

    try {
      const { formDataToSend, hasData, shouldSkip } =
        buildCompanyDetailsFormData(formData);

      if (shouldSkip || !hasData) {
        setStep(currentStep + 1);
        setLoading(false);
        return;
      }

      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_BASE_URL}/company/details/${id}`,
        formDataToSend,
        {
          headers: {
            ...(authToken && { Authorization: `Bearer ${authToken}` }),
          },
          transformRequest: [(data) => data],
        }
      );

      if (response.data?.result || response.data?.success) {
        setStep(currentStep + 1);
        if (response.data?.data) {
          setUserData((prev) => ({ ...(prev || {}), ...response.data.data }));
          setFormData((prev) => ({
            ...prev,
            ...populateCompanyFormFromUserData(response.data.data),
          }));
        }
      } else {
        setError(response.data?.message || t("companyPage.form.errors.saveFailed"));
      }
    } catch (err) {
      setError(err.response?.data?.message || t("companyPage.form.errors.saveFailed"));
    } finally {
      setLoading(false);
    }
  };

  const handleNext = async (currentStep, setStep) => {
    if (currentStep === 1) {
      if (formData.password !== formData.confirmPassword) {
        setError(t("companyPage.form.errors.passwordMismatch"));
        return;
      }

      if (!companyId) {
        await handleRegister();
        return;
      }
      setStep(2);
      return;
    }

    if (currentStep === 2) {
      await handleCompanyDetails(companyId, token, currentStep, setStep);
      return;
    }

    if (currentStep < 3) {
      setStep(currentStep + 1);
    }
  };

  return {
    loading,
    error,
    setError,
    handleLogin,
    handleRegister,
    handleCompanyDetails,
    handleNext,
  };
};


