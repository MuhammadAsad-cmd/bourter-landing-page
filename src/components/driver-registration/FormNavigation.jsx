const FormNavigation = ({ currentStep, handleBack, handleNext, isLastStep }) => {
  return (
    <div className="flex items-center justify-between mt-10 pt-6 border-t border-gray-100">
      <div className="w-[120px]">
        {currentStep > 1 ? (
          <button
            type="button"
            onClick={handleBack}
            className="group flex items-center gap-2 px-5 py-2.5 rounded-full text-gray-600 hover:text-primary font-semibold hover:bg-gray-50 transition-all cursor-pointer"
          >
            <svg
              className="w-5 h-5 group-hover:-translate-x-1 transition-transform"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 19l-7-7 7-7"
              />
            </svg>
            Back
          </button>
        ) : (
          <div /> /* Placeholder for alignment */
        )}
      </div>

      <div className="w-[160px]">
        <button
          type={isLastStep ? "submit" : "button"}
          onClick={!isLastStep ? handleNext : undefined}
          className="w-full flex items-center justify-center gap-2 px-6 py-3.5 rounded-full font-bold text-white transition-all transform hover:scale-[1.02] active:scale-[0.98] shadow-lg hover:shadow-primary/30 cursor-pointer"
          style={{
            background:
              "linear-gradient(130.4deg, #0053A2 15.06%, #06294A 87.46%)",
          }}
        >
          {isLastStep ? "Submit Application" : "Next Step"}
          {!isLastStep && (
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
    </div>
  );
};

export default FormNavigation;
