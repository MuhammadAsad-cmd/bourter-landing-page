"use client";

import { useEffect, useState } from "react";
import { City, Country } from "country-state-city";

const AccountInfoStep = ({
  formData,
  handleInputChange,
  showPassword,
  setShowPassword,
  showConfirmPassword,
  setShowConfirmPassword,
  setFormData,
  onLoginClick,
  setError,
  t,
}) => {
  const [countries] = useState(Country.getAllCountries());
  const [cities, setCities] = useState([]);
  const [selectedCountryCode, setSelectedCountryCode] = useState(
    formData.country || ""
  );
  const [selectedCity, setSelectedCity] = useState(formData.city || "");

  useEffect(() => {
    if (formData.country && !selectedCountryCode) {
      setSelectedCountryCode(formData.country);
    }
    if (formData.city && !selectedCity) {
      setSelectedCity(formData.city);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (selectedCountryCode) {
      const countryCities = City.getCitiesOfCountry(selectedCountryCode);
      setCities(countryCities || []);
      if (formData.country !== selectedCountryCode) {
        setSelectedCity("");
        setFormData((prev) => ({
          ...prev,
          country: selectedCountryCode,
          city: "",
        }));
      }
    } else {
      setCities([]);
      setSelectedCity("");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedCountryCode]);

  const handleCountryChange = (e) => {
    const countryCode = e.target.value;
    setSelectedCountryCode(countryCode);
    setFormData((prev) => ({
      ...prev,
      country: countryCode,
      city: "",
    }));
  };

  const handleCityChange = (e) => {
    const cityValue = e.target.value;
    setSelectedCity(cityValue);
    setFormData((prev) => ({
      ...prev,
      city: cityValue,
    }));
  };

  const validatePasswords = () => {
    if (!formData.password || !formData.confirmPassword) return true;
    if (formData.password !== formData.confirmPassword) {
      setError(t("companyPage.form.errors.passwordMismatch"));
      return false;
    }
    return true;
  };

  // Validate on change for instant feedback, but don't block typing
  useEffect(() => {
    if (formData.password && formData.confirmPassword) {
      validatePasswords();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [formData.password, formData.confirmPassword]);

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-500">
      <div className="text-center text-sm text-gray-600">
        <span className="font-medium">
          {t("companyPage.form.account.alreadyHaveAccount")}{" "}
        </span>
        <button
          type="button"
          onClick={onLoginClick}
          className="text-primary font-semibold cursor-pointer hover:underline"
        >
          {t("companyPage.form.account.loginHere")}
        </button>
      </div>

      <div className="text-center mb-2">
        <h2 className="text-2xl font-bold text-gray-900">
          {t("companyPage.form.account.title")}
        </h2>
        <p className="text-gray-600">{t("companyPage.form.account.subtitle")}</p>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <div className="group">
          <label className="block text-sm font-bold text-gray-700 mb-2 group-focus-within:text-primary transition-colors">
            {t("companyPage.form.account.companyName")}
          </label>
          <div className="relative">
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              placeholder={t("companyPage.form.account.companyNamePlaceholder")}
              className="w-full pl-4 pr-4 py-3.5 rounded-full border-2 border-gray-100 bg-white focus:bg-white focus:border-primary focus:ring-4 focus:ring-primary/10 outline-none transition-all duration-300 placeholder:text-gray-400 font-medium hover:border-gray-300"
              required
            />
          </div>
        </div>

        <div className="group">
          <label className="block text-sm font-bold text-gray-700 mb-2 group-focus-within:text-primary transition-colors">
            {t("companyPage.form.account.phoneNumber")}
          </label>
          <div className="relative">
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleInputChange}
              placeholder={t("companyPage.form.account.phonePlaceholder")}
              className="w-full pl-4 pr-4 py-3.5 rounded-full border-2 border-gray-100 bg-white focus:bg-white focus:border-primary focus:ring-4 focus:ring-primary/10 outline-none transition-all duration-300 placeholder:text-gray-400 font-medium hover:border-gray-300"
              required
            />
          </div>
        </div>

        <div className="group md:col-span-2">
          <label className="block text-sm font-bold text-gray-700 mb-2 group-focus-within:text-primary transition-colors">
            {t("companyPage.form.account.emailAddress")}
          </label>
          <div className="relative">
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              placeholder={t("companyPage.form.account.emailPlaceholder")}
              className="w-full pl-4 pr-4 py-3.5 rounded-full border-2 border-gray-100 bg-white focus:bg-white focus:border-primary focus:ring-4 focus:ring-primary/10 outline-none transition-all duration-300 placeholder:text-gray-400 font-medium hover:border-gray-300"
              required
            />
          </div>
        </div>

        <div className="group md:col-span-2">
          <label className="block text-sm font-bold text-gray-700 mb-2 group-focus-within:text-primary transition-colors">
            {t("companyPage.form.account.address")}
          </label>
          <div className="relative">
            <input
              type="text"
              name="address"
              value={formData.address}
              onChange={handleInputChange}
              placeholder={t("companyPage.form.account.addressPlaceholder")}
              className="w-full pl-4 pr-4 py-3.5 rounded-full border-2 border-gray-100 bg-white focus:bg-white focus:border-primary focus:ring-4 focus:ring-primary/10 outline-none transition-all duration-300 placeholder:text-gray-400 font-medium hover:border-gray-300"
              required
            />
          </div>
        </div>

        <div className="group">
          <label className="block text-sm font-bold text-gray-700 mb-2 group-focus-within:text-primary transition-colors">
            {t("companyPage.form.account.country")}{" "}
            <span className="text-red-500">*</span>
          </label>
          <select
            value={selectedCountryCode}
            onChange={handleCountryChange}
            className="w-full px-4 py-3.5 rounded-full border-2 border-gray-100 bg-white focus:bg-white focus:border-primary focus:ring-4 focus:ring-primary/10 outline-none transition-all duration-300 font-medium hover:border-gray-300"
            required
          >
            <option value="">
              {t("companyPage.form.account.selectCountry")}
            </option>
            {countries.map((country) => (
              <option key={country.isoCode} value={country.isoCode}>
                {country.name}
              </option>
            ))}
          </select>
        </div>

        <div className="group">
          <label className="block text-sm font-bold text-gray-700 mb-2 group-focus-within:text-primary transition-colors">
            {t("companyPage.form.account.city")} <span className="text-red-500">*</span>
          </label>
          <select
            value={selectedCity}
            onChange={handleCityChange}
            className="w-full px-4 py-3.5 rounded-full border-2 border-gray-100 bg-white focus:bg-white focus:border-primary focus:ring-4 focus:ring-primary/10 outline-none transition-all duration-300 font-medium hover:border-gray-300"
            required
            disabled={!selectedCountryCode}
          >
            <option value="">
              {selectedCountryCode
                ? t("companyPage.form.account.selectCity")
                : t("companyPage.form.account.selectCountryFirst")}
            </option>
            {cities.map((city) => (
              <option key={`${city.name}-${city.latitude}-${city.longitude}`} value={city.name}>
                {city.name}
              </option>
            ))}
          </select>
        </div>

        <div className="group">
          <label className="block text-sm font-bold text-gray-700 mb-2 group-focus-within:text-primary transition-colors">
            {t("companyPage.form.account.password")}
          </label>
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              value={formData.password}
              onChange={handleInputChange}
              placeholder={t("companyPage.form.account.passwordPlaceholder")}
              className="w-full pl-4 pr-12 py-3.5 rounded-full border-2 border-gray-100 bg-white focus:bg-white focus:border-primary focus:ring-4 focus:ring-primary/10 outline-none transition-all duration-300 placeholder:text-gray-400 font-medium hover:border-gray-300"
              required
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-primary transition-colors duration-300 cursor-pointer"
            >
              {showPassword ? (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                </svg>
              ) : (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                </svg>
              )}
            </button>
          </div>
        </div>

        <div className="group">
          <label className="block text-sm font-bold text-gray-700 mb-2 group-focus-within:text-primary transition-colors">
            {t("companyPage.form.account.confirmPassword")}
          </label>
          <div className="relative">
            <input
              type={showConfirmPassword ? "text" : "password"}
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleInputChange}
              placeholder={t("companyPage.form.account.confirmPasswordPlaceholder")}
              className="w-full pl-4 pr-12 py-3.5 rounded-full border-2 border-gray-100 bg-white focus:bg-white focus:border-primary focus:ring-4 focus:ring-primary/10 outline-none transition-all duration-300 placeholder:text-gray-400 font-medium hover:border-gray-300"
              required
            />
            <button
              type="button"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-primary transition-colors duration-300 cursor-pointer"
            >
              {showConfirmPassword ? (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                </svg>
              ) : (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                </svg>
              )}
            </button>
          </div>
          {formData.password &&
            formData.confirmPassword &&
            formData.password !== formData.confirmPassword && (
              <p className="mt-2 text-sm text-red-600 font-medium">
                {t("companyPage.form.errors.passwordMismatch")}
              </p>
            )}
        </div>
      </div>
    </div>
  );
};

export default AccountInfoStep;


