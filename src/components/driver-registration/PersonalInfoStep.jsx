"use client";

import { useState, useEffect } from "react";
import { Country, City } from "country-state-city";
import LocationMapPicker from "./LocationMapPicker";

const PersonalInfoStep = ({
  formData,
  handleInputChange,
  showPassword,
  setShowPassword,
  showConfirmPassword,
  setShowConfirmPassword,
  setFormData,
  t,
}) => {
  const [countries] = useState(Country.getAllCountries());
  const [cities, setCities] = useState([]);
  const [selectedCountryCode, setSelectedCountryCode] = useState(
    formData.country || ""
  );
  const [selectedCity, setSelectedCity] = useState(formData.city || "");
  const [locationSearch, setLocationSearch] = useState("");
  const [selectedLocation, setSelectedLocation] = useState(() => {
    const lat = formData.location?.lat;
    const lng = formData.location?.long;
    return {
      lat: lat ? parseFloat(lat) : null,
      lng: lng ? parseFloat(lng) : null,
    };
  });
  // Handle location selection from map picker
  const handleLocationSelect = (location) => {
    setSelectedLocation(location);
    setFormData((prev) => ({
      ...prev,
      location: {
        lat: location.lat.toString(),
        long: location.lng.toString(),
      },
    }));
  };

  // Sync location state with formData
  useEffect(() => {
    if (formData.location?.lat && formData.location?.long) {
      const lat = parseFloat(formData.location.lat);
      const lng = parseFloat(formData.location.long);
      if (!isNaN(lat) && !isNaN(lng)) {
        setSelectedLocation({ lat, lng });
      }
    }
  }, [formData.location?.lat, formData.location?.long]);

  // Sync country and city from formData on initial load
  useEffect(() => {
    if (formData.country && !selectedCountryCode) {
      setSelectedCountryCode(formData.country);
    }
    if (formData.city && !selectedCity) {
      setSelectedCity(formData.city);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Update cities when country changes
  useEffect(() => {
    if (selectedCountryCode) {
      const countryCities = City.getCitiesOfCountry(selectedCountryCode);
      setCities(countryCities || []);
      // Reset city when country changes
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

  // Handle country change
  const handleCountryChange = (e) => {
    const countryCode = e.target.value;
    setSelectedCountryCode(countryCode);
    setFormData((prev) => ({
      ...prev,
      country: countryCode,
      city: "",
    }));
  };

  // Handle city change
  const handleCityChange = (e) => {
    const cityValue = e.target.value;
    setSelectedCity(cityValue);
    setFormData((prev) => ({
      ...prev,
      city: cityValue,
    }));
  };

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-500">
      {/* Profile Picture Upload */}
      <div className="flex justify-center mb-8">
        <label className="cursor-pointer group relative">
          <div className="w-28 h-28 rounded-full bg-gray-50 border-2 border-dashed border-gray-300 flex items-center justify-center group-hover:border-primary transition-all duration-300 relative overflow-hidden shadow-sm group-hover:shadow-md">
            {formData.profilePicture ? (
              <img
                src={formData.profilePicture instanceof File ? URL.createObjectURL(formData.profilePicture) : formData.profilePicture}
                alt="Profile"
                className="w-full h-full object-cover rounded-full"
              />
            ) : (
              <div className="text-gray-400 group-hover:text-primary transition-colors flex flex-col items-center gap-1">
                <svg
                  className="w-8 h-8"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 13a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                </svg>
                <span className="text-[10px] font-medium uppercase tracking-wider">{t("driverPage.form.personalInfo.upload")}</span>
              </div>
            )}

            {/* Overlay */}
            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center rounded-full">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
              </svg>
            </div>
          </div>
          <input
            type="file"
            name="profilePicture"
            accept="image/*"
            onChange={handleInputChange}
            className="hidden"
          />
        </label>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <div className="group">
          <label className="block text-sm font-bold text-gray-700 mb-2 group-focus-within:text-primary transition-colors">
            {t("driverPage.form.personalInfo.yourName")}
          </label>
          <div className="relative">
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              placeholder={t("driverPage.form.personalInfo.namePlaceholder")}
              className="w-full pl-11 pr-4 py-3.5 rounded-full border-2 border-gray-100 bg-white focus:bg-white focus:border-primary focus:ring-4 focus:ring-primary/10 outline-none transition-all duration-300 placeholder:text-gray-400 font-medium hover:border-gray-300"
              required
            />
            <svg className="w-5 h-5 text-gray-400 absolute left-4 top-1/2 -translate-y-1/2 group-focus-within:text-primary transition-colors duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
          </div>
        </div>

        <div className="group">
          <label className="block text-sm font-bold text-gray-700 mb-2 group-focus-within:text-primary transition-colors">
            {t("driverPage.form.personalInfo.phoneNumber")}
          </label>
          <div className="relative">
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleInputChange}
              placeholder={t("driverPage.form.personalInfo.phonePlaceholder")}
              className="w-full pl-11 pr-4 py-3.5 rounded-full border-2 border-gray-100 bg-white focus:bg-white focus:border-primary focus:ring-4 focus:ring-primary/10 outline-none transition-all duration-300 placeholder:text-gray-400 font-medium hover:border-gray-300"
              required
            />
            <svg className="w-5 h-5 text-gray-400 absolute left-4 top-1/2 -translate-y-1/2 group-focus-within:text-primary transition-colors duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
            </svg>
          </div>
        </div>
      </div>

      <div className="group">
        <label className="block text-sm font-bold text-gray-700 mb-2 group-focus-within:text-primary transition-colors">
          {t("driverPage.form.personalInfo.emailAddress")}
        </label>
        <div className="relative">
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            placeholder={t("driverPage.form.personalInfo.emailPlaceholder")}
            className="w-full pl-11 pr-4 py-3.5 rounded-full border-2 border-gray-100 bg-white focus:bg-white focus:border-primary focus:ring-4 focus:ring-primary/10 outline-none transition-all duration-300 placeholder:text-gray-400 font-medium hover:border-gray-300"
            required
          />
          <svg className="w-5 h-5 text-gray-400 absolute left-4 top-1/2 -translate-y-1/2 group-focus-within:text-primary transition-colors duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207" />
          </svg>
        </div>
      </div>

      <div className="group">
        <label className="block text-sm font-bold text-gray-700 mb-2 group-focus-within:text-primary transition-colors">
          {t("driverPage.form.personalInfo.address")}
        </label>
        <div className="relative">
          <input
            type="text"
            name="address"
            value={formData.address}
            onChange={handleInputChange}
            placeholder={t("driverPage.form.personalInfo.addressPlaceholder")}
            className="w-full pl-11 pr-4 py-3.5 rounded-full border-2 border-gray-100 bg-white focus:bg-white focus:border-primary focus:ring-4 focus:ring-primary/10 outline-none transition-all duration-300 placeholder:text-gray-400 font-medium hover:border-gray-300"
            required
          />
          <svg className="w-5 h-5 text-gray-400 absolute left-4 top-1/2 -translate-y-1/2 group-focus-within:text-primary transition-colors duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <div className="group">
          <label className="block text-sm font-bold text-gray-700 mb-2 group-focus-within:text-primary transition-colors">
            {t("driverPage.form.personalInfo.country")} <span className="text-red-500">*</span>
          </label>
          <div className="relative">
            <select
              name="country"
              value={selectedCountryCode}
              onChange={handleCountryChange}
              className="w-full pl-11 pr-4 py-3.5 rounded-full border-2 border-gray-100 bg-white focus:bg-white focus:border-primary focus:ring-4 focus:ring-primary/10 outline-none transition-all duration-300 font-medium hover:border-gray-300 appearance-none cursor-pointer"
              required
            >
              <option value="">{t("driverPage.form.personalInfo.selectCountry")}</option>
              {countries.map((country) => (
                <option key={country.isoCode} value={country.isoCode}>
                  {country.name}
                </option>
              ))}
            </select>
            <svg className="w-5 h-5 text-gray-400 absolute left-4 top-1/2 -translate-y-1/2 group-focus-within:text-primary transition-colors duration-300 pointer-events-none" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <svg className="w-5 h-5 text-gray-400 absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </div>
        </div>

        <div className="group">
          <label className="block text-sm font-bold text-gray-700 mb-2 group-focus-within:text-primary transition-colors">
            {t("driverPage.form.personalInfo.city")} <span className="text-red-500">*</span>
          </label>
          <div className="relative">
            <select
              name="city"
              value={selectedCity}
              onChange={handleCityChange}
              disabled={!selectedCountryCode}
              className="w-full pl-11 pr-4 py-3.5 rounded-full border-2 border-gray-100 bg-white focus:bg-white focus:border-primary focus:ring-4 focus:ring-primary/10 outline-none transition-all duration-300 font-medium hover:border-gray-300 appearance-none cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
              required
            >
              <option value="">{selectedCountryCode ? t("driverPage.form.personalInfo.selectCity") : t("driverPage.form.personalInfo.selectCountryFirst")}</option>
              {cities.map((city) => (
                <option key={city.name} value={city.name}>
                  {city.name}
                </option>
              ))}
            </select>
            <svg className="w-5 h-5 text-gray-400 absolute left-4 top-1/2 -translate-y-1/2 group-focus-within:text-primary transition-colors duration-300 pointer-events-none" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
            </svg>
            <svg className="w-5 h-5 text-gray-400 absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </div>
        </div>
      </div>

      <div className="group">
        <label className="block text-sm font-bold text-gray-700 mb-2 group-focus-within:text-primary transition-colors">
          {t("driverPage.form.personalInfo.location")} <span className="text-red-500">*</span>
        </label>
        <LocationMapPicker
          selectedLocation={selectedLocation}
          onLocationSelect={handleLocationSelect}
          locationSearch={locationSearch}
          onLocationSearchChange={setLocationSearch}
        />
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <div className="group">
          <label className="block text-sm font-bold text-gray-700 mb-2 group-focus-within:text-primary transition-colors">
            {t("driverPage.form.personalInfo.password")}
          </label>
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              value={formData.password}
              onChange={handleInputChange}
              placeholder={t("driverPage.form.personalInfo.passwordPlaceholder")}
              className="w-full pl-11 pr-12 py-3.5 rounded-full border-2 border-gray-100 bg-white focus:bg-white focus:border-primary focus:ring-4 focus:ring-primary/10 outline-none transition-all duration-300 placeholder:text-gray-400 font-medium hover:border-gray-300"
              required
            />
            <svg className="w-5 h-5 text-gray-400 absolute left-4 top-1/2 -translate-y-1/2 group-focus-within:text-primary transition-colors duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
            </svg>
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
            {t("driverPage.form.personalInfo.confirmPassword")}
          </label>
          <div className="relative">
            <input
              type={showConfirmPassword ? "text" : "password"}
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleInputChange}
              placeholder={t("driverPage.form.personalInfo.confirmPasswordPlaceholder")}
              className="w-full pl-11 pr-12 py-3.5 rounded-full border-2 border-gray-100 bg-white focus:bg-white focus:border-primary focus:ring-4 focus:ring-primary/10 outline-none transition-all duration-300 placeholder:text-gray-400 font-medium hover:border-gray-300"
              required
            />
            <svg className="w-5 h-5 text-gray-400 absolute left-4 top-1/2 -translate-y-1/2 group-focus-within:text-primary transition-colors duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
            </svg>
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
        </div>
      </div>
    </div>
  );
};

export default PersonalInfoStep;
