"use client";

import { useState, useEffect } from 'react';
import axios from 'axios';


const PlanSelectionStep = ({ formData, setFormData, userId }) => {
  const [plans, setPlans] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [subscribing, setSubscribing] = useState(null); // Track which plan is being subscribed to

  useEffect(() => {
    fetchPlans();
  }, []);

  const fetchPlans = async () => {
    setLoading(true);
    setError("");
    try {
      const response = await axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}/package/fetch`);
      if (response.data.result && response.data.data) {
        setPlans(response.data.data);
      } else {
        setError("Failed to load plans. Please try again.");
      }
    } catch (err) {
      setError(
        err.response?.data?.message || "Failed to load plans. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  // Filter plans by type (month or year)
  const filteredPlans = plans.filter(
    (plan) => plan.type === (formData.planType === "monthly" ? "month" : "year")
  );

  const formatPrice = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const handleSubscribe = async (plan) => {
    if (!userId) {
      setError("User ID not found. Please login first.");
      return;
    }

    setSubscribing(plan._id);
    setError("");

    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_BASE_URL}/rider/subscribe`,
        {
          userId: userId,
          packageId: plan._id,
        }
      );

      if (response.data.result || response.data.success) {
        // Get payment URL from response.data.paymentDetails.url
        const paymentUrl = response.data.data?.paymentDetails?.url;
        
        if (paymentUrl) {
          // Open payment URL in a new tab
          window.open(paymentUrl, '_blank');
          setSubscribing(null);
        } else {
          setError("Payment URL not found in response. Please try again.");
          setSubscribing(null);
        }
      } else {
        setError(response.data.message || "Failed to subscribe. Please try again.");
        setSubscribing(null);
      }
    } catch (err) {
      setError(
        err.response?.data?.message || "Failed to subscribe. Please try again."
      );
      setSubscribing(null);
    }
  };

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-right-4 duration-500">
      <div className="text-center">
        <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-3">
          Choose Your <span className="text-primary">Driver Plan</span>
        </h2>
        <p className="text-gray-600 max-w-lg mx-auto">
          Select the best plan that fits your driving schedule and earnings goals.
        </p>
      </div>

      {/* Plan Toggle */}
      <div className="flex justify-center mb-8">
        <div className="bg-gray-100 p-1.5 rounded-2xl inline-flex shadow-inner">
          <button
            type="button"
            onClick={() => setFormData({ ...formData, planType: "monthly" })}
            className={`py-3 px-8 rounded-xl font-bold text-sm transition-all duration-300 ${formData.planType === "monthly"
                ? "bg-white text-primary shadow-sm scale-105"
                : "text-gray-500 hover:text-gray-900"
              }`}
          >
            Monthly
          </button>
          <button
            type="button"
            onClick={() => setFormData({ ...formData, planType: "yearly" })}
            className={`py-3 px-8 rounded-xl font-bold text-sm transition-all duration-300 relative ${formData.planType === "yearly"
                ? "bg-white text-primary shadow-sm scale-105"
                : "text-gray-500 hover:text-gray-900"
              }`}
          >
            Yearly
            <span className="absolute -top-3 -right-3 bg-red-500 text-white text-[10px] px-2 py-0.5 rounded-full font-bold shadow-sm animate-bounce">
              SAVE 20%
            </span>
          </button>
        </div>
      </div>

      {/* Error Message */}
      {error && (
        <div className="bg-red-50 border-2 border-red-200 rounded-full px-4 py-3 text-red-700 text-sm font-medium text-center">
          {error}
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
      {!loading && !error && (
        <div className="grid md:grid-cols-2 gap-6">
          {filteredPlans.length > 0 ? (
            filteredPlans.map((plan) => {
              const isSubscribing = subscribing === plan._id;
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
                      Perfect for {plan.type === "month" ? "monthly" : "yearly"} drivers
                    </p>
                  </div>

                  <div className="mb-8 p-4 bg-white/50 rounded-xl border border-gray-100">
                    <div className="flex items-baseline gap-1">
                      <span className="text-4xl font-extrabold text-primary">
                        {formatPrice(plan.amount)}
                      </span>
                      <span className="text-gray-500 font-medium">
                        /{plan.type === "month" ? "month" : "year"}
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
                        <span className="leading-tight">Ride history & ratings</span>
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
                        <span className="leading-tight">Access to payout & wallet</span>
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
                        <span className="leading-tight">Unlimited ride requests</span>
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
                        <span className="leading-tight">In-app navigation & support</span>
                      </div>
                    </div>
                  </div>

                  <button
                    type="button"
                    disabled={isSubscribing || !userId}
                    onClick={() => handleSubscribe(plan)}
                    className={`w-full py-4 rounded-xl font-bold cursor-pointer transition-all duration-300 ${
                      isSubscribing
                        ? "bg-gray-400 text-white cursor-not-allowed"
                        : "bg-primary text-white shadow-lg shadow-primary/30 hover:shadow-xl hover:scale-[1.02]"
                    } disabled:opacity-50 disabled:cursor-not-allowed`}
                  >
                    {isSubscribing ? (
                      <span className="flex items-center justify-center gap-2">
                        <svg className="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Processing...
                      </span>
                    ) : (
                      "Subscribe"
                    )}
                  </button>
                </div>
              );
            })
          ) : (
            <div className="col-span-2 text-center py-12">
              <p className="text-gray-500">No plans available for this period.</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default PlanSelectionStep;
