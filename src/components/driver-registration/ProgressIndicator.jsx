const ProgressIndicator = ({ steps, currentStep }) => {
  return (
    <div className="w-full mb-12 relative z-10">
      <div className="flex justify-between items-center relative">
        {/* Progress Line Background */}
        <div className="absolute top-[22px] left-0 w-full h-1 bg-gray-200 rounded-full -z-10" />

        {/* Active Progress Line */}
        <div
          className="absolute top-[22px] left-0 h-1 bg-primary rounded-full transition-all duration-500 ease-out -z-10"
          style={{
            width: `${((currentStep - 1) / (steps.length - 1)) * 100}%`,
          }}
        />

        {steps.map((step) => {
          const isActive = step.number === currentStep;
          const isCompleted = step.number < currentStep;

          return (
            <div
              key={step.number}
              className="flex flex-col items-center relative"
            >
              {/* Step Circle */}
              <div
                className={`w-11 h-11 rounded-full flex items-center justify-center border-4 transition-all duration-300 z-10 ${isActive
                    ? "bg-primary border-white shadow-[0_0_0_4px_rgba(6,41,74,0.15)] scale-110"
                    : isCompleted
                      ? "bg-primary border-white"
                      : "bg-white border-gray-200 text-gray-400"
                  }`}
              >
                {isCompleted ? (
                  <svg
                    className="w-5 h-5 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={3}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                ) : (
                  <span
                    className={`font-bold text-lg ${isActive ? "text-white" : ""
                      }`}
                  >
                    {step.number}
                  </span>
                )}
              </div>

              {/* Step Title on Desktop */}
              <span
                className={`absolute top-14 text-sm font-medium whitespace-nowrap hidden md:block transition-all duration-300 ${isActive
                    ? "text-primary translate-y-0 opacity-100"
                    : isCompleted
                      ? "text-primary opacity-80"
                      : "text-gray-400 translate-y-1 opacity-80"
                  }`}
              >
                {step.title}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ProgressIndicator;
