import { useState } from 'react';

const PlanSelectionStep = ({ formData, setFormData, plans }) => {
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

      {/* Plans */}
      <div className="grid md:grid-cols-2 gap-6">
        {plans[formData.planType].map((plan, index) => {
          const isSelected = formData.selectedPlan === plan.name;
          return (
            <div
              key={index}
              className={`relative border-2 rounded-[24px] p-6 lg:p-8 cursor-pointer transition-all duration-300 flex flex-col h-full ${isSelected
                  ? "border-primary bg-primary/5 shadow-xl scale-[1.02] z-10"
                  : "border-gray-100 bg-white hover:border-primary/30 hover:shadow-lg"
                }`}
              onClick={() =>
                setFormData({ ...formData, selectedPlan: plan.name })
              }
            >
              {isSelected && (
                <div className="absolute top-0 right-0 p-4">
                  <div className="bg-primary text-white p-1 rounded-full">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" /></svg>
                  </div>
                </div>
              )}

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
                  {plan.name}
                </h3>
                <p className="text-gray-500 text-sm">Perfect for {index === 0 ? "beginners" : "pros"}</p>
              </div>

              <div className="mb-8 p-4 bg-white/50 rounded-xl border border-gray-100">
                <div className="flex items-baseline gap-1">
                  <span className="text-4xl font-extrabold text-primary">
                    {plan.price}
                  </span>
                  <span className="text-gray-500 font-medium">{plan.period}</span>
                </div>
                {plan.originalPrice && (
                  <div className="mt-1">
                    <span className="text-sm text-gray-400 line-through font-medium">
                      {plan.originalPrice}
                    </span>
                    <span className="ml-2 text-xs font-bold text-red-500 bg-red-50 px-2 py-0.5 rounded-full">
                      20% OFF
                    </span>
                  </div>
                )}
              </div>

              <div className="grow">
                <ul className="space-y-4 mb-8">
                  {plan.features.map((feature, idx) => (
                    <li key={idx} className="flex items-start gap-3 text-sm font-medium text-gray-700">
                      <svg
                        className="w-5 h-5 text-green-500 shrink-0 mt-0.5"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                      </svg>
                      <span className="leading-tight">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <button
                type="button"
                className={`w-full py-4 rounded-xl font-bold transition-all duration-300 ${isSelected
                    ? "bg-primary text-white shadow-lg shadow-primary/30"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                  }`}
                onClick={(e) => {
                  e.stopPropagation();
                  setFormData({ ...formData, selectedPlan: plan.name });
                }}
              >
                {isSelected ? "Plan Selected" : "Select Plan"}
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default PlanSelectionStep;
