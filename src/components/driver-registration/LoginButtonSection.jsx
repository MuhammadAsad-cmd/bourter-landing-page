const LoginButtonSection = ({ loading, onRegisterClick, t }) => {
  return (
    <>
      <div className="flex items-center justify-center pt-6 border-t border-gray-100">
        <button
          type="submit"
          disabled={loading}
          className="w-full max-w-[200px] flex items-center justify-center gap-2 px-6 py-3.5 rounded-full font-bold text-white transition-all transform hover:scale-[1.02] active:scale-[0.98] shadow-lg hover:shadow-primary/30 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
          style={{
            background: "linear-gradient(130.4deg, #0053A2 15.06%, #06294A 87.46%)",
          }}
        >
          {loading ? t("driverPage.form.login.loggingIn") : t("driverPage.form.login.loginButton")}
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
          {t("driverPage.form.login.dontHaveAccount")}{" "}
          <button
            type="button"
            onClick={onRegisterClick}
            className="text-primary font-semibold cursor-pointer hover:underline"
            disabled={loading}
          >
            {t("driverPage.form.login.registerHere")}
          </button>
        </p>
      </div>
    </>
  );
};

export default LoginButtonSection;

