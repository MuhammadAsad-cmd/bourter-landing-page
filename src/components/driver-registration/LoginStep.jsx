const LoginStep = ({
  loginData,
  handleLoginChange,
  showPassword,
  setShowPassword,
  onRegisterClick,
  error,
  loading,
  t,
}) => {
  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-500">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">{t("driverPage.form.login.welcomeBack")}</h2>
        <p className="text-gray-600">{t("driverPage.form.login.loginToContinue")}</p>
      </div>

      {error && (
        <div className="bg-red-50 border-2 border-red-200 rounded-full px-4 py-3 text-red-700 text-sm font-medium">
          {error}
        </div>
      )}

      <div className="group">
        <label className="block text-sm font-bold text-gray-700 mb-2 group-focus-within:text-primary transition-colors">
          {t("driverPage.form.login.emailAddress")}
        </label>
        <div className="relative">
          <input
            type="email"
            name="email"
            value={loginData.email}
            onChange={handleLoginChange}
            placeholder={t("driverPage.form.login.emailPlaceholder")}
            className="w-full pl-11 pr-4 py-3.5 rounded-full border-2 border-gray-100 bg-white focus:bg-white focus:border-primary focus:ring-4 focus:ring-primary/10 outline-none transition-all duration-300 placeholder:text-gray-400 font-medium hover:border-gray-300"
            required
            disabled={loading}
          />
          <svg
            className="w-5 h-5 text-gray-400 absolute left-4 top-1/2 -translate-y-1/2 group-focus-within:text-primary transition-colors duration-300"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207"
            />
          </svg>
        </div>
      </div>

      <div className="group">
        <label className="block text-sm font-bold text-gray-700 mb-2 group-focus-within:text-primary transition-colors">
          {t("driverPage.form.login.password")}
        </label>
        <div className="relative">
          <input
            type={showPassword ? "text" : "password"}
            name="password"
            value={loginData.password}
            onChange={handleLoginChange}
            placeholder={t("driverPage.form.login.passwordPlaceholder")}
            className="w-full pl-11 pr-12 py-3.5 rounded-full border-2 border-gray-100 bg-white focus:bg-white focus:border-primary focus:ring-4 focus:ring-primary/10 outline-none transition-all duration-300 placeholder:text-gray-400 font-medium hover:border-gray-300"
            required
            disabled={loading}
          />
          <svg
            className="w-5 h-5 text-gray-400 absolute left-4 top-1/2 -translate-y-1/2 group-focus-within:text-primary transition-colors duration-300"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
            />
          </svg>
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-primary transition-colors duration-300 cursor-pointer"
            disabled={loading}
          >
            {showPassword ? (
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21"
                />
              </svg>
            ) : (
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                />
              </svg>
            )}
          </button>
        </div>
      </div>  
    </div>
  );
};

export default LoginStep;

