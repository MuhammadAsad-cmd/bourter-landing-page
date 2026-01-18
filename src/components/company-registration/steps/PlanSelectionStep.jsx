"use client";

import { useState, useEffect } from 'react';
import axios from 'axios';


const PlanSelectionStep = ({ formData, setFormData, companyId, token, t, setError, error: externalError, setUserData, setShowSuccessModal }) => {
  const [plans, setPlans] = useState([]);
  const [loading, setLoading] = useState(true);
  const [localError, setLocalError] = useState("");
  const [subscribing, setSubscribing] = useState(null); // Track which plan is being subscribed to

  useEffect(() => {
    fetchPlans();
  }, []);

  const fetchPlans = async () => {
    setLoading(true);
    setLocalError("");
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_BASE_URL}/package/fetch?accountType=company`
      );
      if (response.data.result && response.data.data) {
        setPlans(response.data.data);
      } else {
        setLocalError(t("companyPage.form.planSelection.failedToLoad"));
      }
    } catch (err) {
      setLocalError(
        err.response?.data?.message || t("companyPage.form.planSelection.failedToLoad")
      );
    } finally {
      setLoading(false);
    }
  };

  // Filter plans by type (month or year)
  // Default to "yearly" if planType is not set
  const currentPlanType = formData?.planType || "yearly";
  const filterType = currentPlanType === "monthly" ? "month" : "year";
  const filteredPlans = plans.filter(
    (plan) => plan.type === filterType
  );

  const formatPrice = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(amount);
  };

  const handleSubscribe = async (plan) => {
    if (!companyId) {
      setLocalError(t("companyPage.form.errors.companyIdNotFound"));
      return;
    }

    setSubscribing(plan._id);
    setLocalError("");
    if (setError) setError("");

    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_BASE_URL}/company/subscribe`,
        {
          userId: companyId,
          packageId: plan._id,
        },
        {
          headers: {
            ...(token && { Authorization: `Bearer ${token}` }),
          },
        }
      );

      if (response.data.result || response.data.success) {
        // Get payment URL from response.data.paymentDetails.url
        const paymentUrl = response.data.data?.paymentDetails?.url;
        
        // If paymentUrl is empty, it means it's a free plan
        if (!paymentUrl || paymentUrl === "") {
          // Free plan - subscription completed
          setSubscribing(null);
          if (setError) setError("");
          setLocalError("");
          
          // Update user data if provided
          if (setUserData && response.data?.data) {
            setUserData((prev) => ({ ...(prev || {}), ...response.data.data }));
          }
          
          // Show success modal and navigate to home page
          if (setShowSuccessModal) {
            setShowSuccessModal(true);
          }
        } else {
          // Paid plan - open payment URL in a new tab
          window.open(paymentUrl, '_blank');
          setSubscribing(null);
          
          // Show success modal (user can continue to home or complete payment)
          if (setShowSuccessModal) {
            setShowSuccessModal(true);
          }
        }
      } else {
        setLocalError(response.data.message || t("companyPage.form.errors.subscribeFailed"));
        if (setError) setError(response.data.message || t("companyPage.form.errors.subscribeFailed"));
        setSubscribing(null);
      }
    } catch (err) {
      const errorMsg = err.response?.data?.message || t("companyPage.form.errors.subscribeFailed");
      setLocalError(errorMsg);
      if (setError) setError(errorMsg);
      setSubscribing(null);
    }
  };

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-right-4 duration-500">
      <div className="text-center">
        <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-3">
          {t("companyPage.form.planSelection.title")} <span className="text-primary">{t("companyPage.form.planSelection.titleHighlight")}</span>
        </h2>
        <p className="text-gray-600 max-w-lg mx-auto">
          {t("companyPage.form.planSelection.description")}
        </p>
      </div>

      {/* Plan Toggle */}
      <div className="flex justify-center mb-8">
        <div className="bg-gray-100 p-1.5 rounded-2xl inline-flex shadow-inner">
          <button
            type="button"
            onClick={() => {
              setFormData((prev) => ({ ...prev, planType: "monthly" }));
            }}
            className={`py-3 px-8 rounded-xl font-bold text-sm transition-all duration-300 ${currentPlanType === "monthly"
                ? "bg-white text-primary shadow-sm scale-105"
                : "text-gray-500 hover:text-gray-900"
              }`}
          >
            {t("companyPage.form.planSelection.monthly")}
          </button>
          <button
            type="button"
            onClick={() => {
              setFormData((prev) => ({ ...prev, planType: "yearly" }));
            }}
            className={`py-3 px-8 rounded-xl font-bold text-sm transition-all duration-300 relative ${currentPlanType === "yearly"
                ? "bg-white text-primary shadow-sm scale-105"
                : "text-gray-500 hover:text-gray-900"
              }`}
          >
            {t("companyPage.form.planSelection.yearly")}
            <span className="absolute -top-3 -right-3 bg-red-500 text-white text-[10px] px-2 py-0.5 rounded-full font-bold shadow-sm animate-bounce">
              {t("companyPage.form.planSelection.save20")}
            </span>
          </button>
        </div>
      </div>


      {/* Error Message */}
      {(externalError || localError) && (
        <div className="bg-red-50 border-2 border-red-200 rounded-full px-4 py-3 text-red-700 text-sm font-medium text-center">
          {externalError || localError}
        </div>
      )}

      {/* Loading State */}
      {loading && (
        <div className="flex justify-center items-center py-12">
          <svg className="animate-spin h-8 w-8 text-primary" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
        </div>
      )}

      {/* Plans */}
      {!loading && (
        <>
          {plans.length === 0 && !localError && (
            <div className="text-center py-12">
              <p className="text-gray-500">{t("companyPage.form.planSelection.noPlansAvailable")}</p>
            </div>
          )}
          {plans.length > 0 && (
            <div className="grid md:grid-cols-2 gap-6">
              {filteredPlans.length > 0 ? (
            filteredPlans.map((plan) => {
              const isSubscribing = subscribing === plan._id;
              const isFreePlan = plan.amount === 0;
              return (
                <div
                  key={plan._id}
                  className="relative border-2 rounded-[24px] p-6 lg:p-8 transition-all duration-300 flex flex-col h-full border-gray-100 bg-white hover:border-primary/30 hover:shadow-lg"
                >

                  <div className="mb-6">
                    <div className="w-14 h-14 bg-blue-100 text-primary rounded-2xl flex items-center justify-center mb-4">
                      <svg
                        className="w-7 h-7"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M13 10V3L4 14h7v7l9-11h-7z"
                        />
                      </svg>
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-1">
                      {plan.title}
                    </h3>
                    <p className="text-gray-500 text-sm">
                      {t("companyPage.form.planSelection.perfectFor")} {plan.type === "month" ? t("companyPage.form.planSelection.monthly") : t("companyPage.form.planSelection.yearly")} {t("companyPage.form.planSelection.companies")}
                    </p>
                  </div>

                  <div className="mb-8 p-4 bg-white/50 rounded-xl border border-gray-100">
                    <div className="flex items-baseline gap-1">
                      <span className="text-4xl font-extrabold text-primary">
                        {formatPrice(plan.amount)}
                      </span>
                      <span className="text-gray-500 font-medium">
                        /{plan.type === "month" ? t("companyPage.form.planSelection.month") : t("companyPage.form.planSelection.year")}
                      </span>
                    </div>
                  </div>

                  <div className="grow mb-6">
                    <div className="space-y-3">
                      <div className="flex items-start gap-3 text-sm font-medium text-gray-700">
                        <svg
                          className="w-5 h-5 text-green-500 shrink-0 mt-0.5"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                        </svg>
                        <span className="leading-tight">{t("companyPage.form.planSelection.shipmentTracking")}</span>
                      </div>
                      <div className="flex items-start gap-3 text-sm font-medium text-gray-700">
                        <svg
                          className="w-5 h-5 text-green-500 shrink-0 mt-0.5"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                        </svg>
                        <span className="leading-tight">{t("companyPage.form.planSelection.driverNetwork")}</span>
                      </div>
                      <div className="flex items-start gap-3 text-sm font-medium text-gray-700">
                        <svg
                          className="w-5 h-5 text-green-500 shrink-0 mt-0.5"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                        </svg>
                        <span className="leading-tight">{t("companyPage.form.planSelection.unlimitedShipments")}</span>
                      </div>
                      <div className="flex items-start gap-3 text-sm font-medium text-gray-700">
                        <svg
                          className="w-5 h-5 text-green-500 shrink-0 mt-0.5"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                        </svg>
                        <span className="leading-tight">{t("companyPage.form.planSelection.businessSupport")}</span>
                      </div>
                    </div>
                  </div>

                  <button
                    type="button"
                    disabled={isSubscribing || !companyId}
                    onClick={() => handleSubscribe(plan)}
                    className={`w-full py-4 rounded-xl font-bold cursor-pointer transition-all duration-300 ${
                      isSubscribing
                        ? "bg-gray-400 text-white cursor-not-allowed"
                        : isFreePlan
                        ? "bg-green-500 text-white shadow-lg shadow-green-500/30 hover:shadow-xl hover:scale-[1.02]"
                        : "bg-primary text-white shadow-lg shadow-primary/30 hover:shadow-xl hover:scale-[1.02]"
                    } disabled:opacity-50 disabled:cursor-not-allowed`}
                  >
                    {isSubscribing ? (
                      <span className="flex items-center justify-center gap-2">
                        <svg className="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        {t("companyPage.form.planSelection.processing")}
                      </span>
                    ) : (
                      isFreePlan ? t("companyPage.form.planSelection.selectFree") : t("companyPage.form.planSelection.subscribe")
                    )}
                  </button>
                </div>
              );
                })
              ) : (
                <div className="col-span-2 text-center py-12">
                  <p className="text-gray-500">
                    {t("companyPage.form.planSelection.noPlansAvailable")} ({currentPlanType === "monthly" ? "monthly" : "yearly"})
                  </p>
                  <p className="text-sm text-gray-400 mt-2">
                    Try switching to {currentPlanType === "monthly" ? "yearly" : "monthly"} plans
                  </p>
                </div>
              )}
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default PlanSelectionStep;
