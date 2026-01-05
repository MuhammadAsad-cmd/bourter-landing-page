const FormNavigation = ({
  currentStep,
  handleBack,
  handleNext,
  isLastStep,
  loading = false,
  t,
}) => {
  return (
    <div className="flex items-center justify-between mt-10 pt-6 border-t border-gray-100">
      <div className="w-[120px]">
        {currentStep > 1 ? (
          <button
            type="button"
            onClick={handleBack}
            disabled={loading}
            className="group flex items-center gap-2 px-5 py-2.5 rounded-full text-gray-600 hover:text-primary font-semibold hover:bg-gray-50 transition-all cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
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
            {t("companyPage.form.navigation.back")}
          </button>
        ) : (
          <div />
        )}
      </div>

      <div className="w-fit">
        <button
          type={isLastStep ? "submit" : "button"}
          onClick={!isLastStep ? handleNext : undefined}
          disabled={loading}
          className="w-full flex items-center justify-center gap-2 px-6 py-3.5 whitespace-nowrap rounded-full font-bold text-white transition-all transform hover:scale-[1.02] active:scale-[0.98] shadow-lg hover:shadow-primary/30 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
          style={{
            background:
              "linear-gradient(130.4deg, #0053A2 15.06%, #06294A 87.46%)",
          }}
        >
          {loading ? (
            <>
              <svg
                className="animate-spin h-5 w-5 text-white"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                ></path>
              </svg>
              {isLastStep
                ? t("companyPage.form.navigation.submitting")
                : t("companyPage.form.navigation.saving")}
            </>
          ) : (
            <>
              {isLastStep
                ? t("companyPage.form.navigation.finish")
                : t("companyPage.form.navigation.nextStep")}
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
            </>
          )}
        </button>
      </div>
    </div>
  );
};

export default FormNavigation;


