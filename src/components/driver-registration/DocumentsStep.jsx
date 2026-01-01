"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

const FileUploadField = ({ label, name, value, accept, onChange, onDelete, t }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [preview, setPreview] = useState(null);

  // Create preview URL when value changes
  useEffect(() => {
    if (value) {
      if (value instanceof File) {
        // If it's a File object, create object URL
        const url = URL.createObjectURL(value);
        setPreview(url);
        return () => URL.revokeObjectURL(url);
      } else if (typeof value === 'string' && value.startsWith('http')) {
        // If it's a URL string (from API), use it directly
        setPreview(value);
      } else {
        setPreview(null);
      }
    } else {
      setPreview(null);
    }
  }, [value]);

  const handleFileChange = async (e) => {
    const file = e.target.files?.[0];
    if (file) {
      setIsLoading(true);
      // Simulate upload delay for better UX
      setTimeout(() => {
        setIsLoading(false);
        onChange(e);
      }, 300);
    }
  };

  const handleDelete = (e) => {
    e.stopPropagation();
    if (preview) {
      URL.revokeObjectURL(preview);
      setPreview(null);
    }
    if (onDelete) {
      onDelete(name);
    }
  };

  // Check if value is an image (File object or URL string)
  const isImage = value && (
    (value instanceof File && value.type && value.type.startsWith('image/')) ||
    (typeof value === 'string' && (value.match(/\.(jpg|jpeg|png|gif|webp)$/i) || value.startsWith('http')))
  );

  return (
    <div className="group">
      <label className="block text-sm font-bold text-gray-700 mb-2 group-hover:text-primary transition-colors">
        {label}
      </label>
      <label className="flex flex-col items-center justify-center w-full h-48 border-2 border-dashed border-gray-300 rounded-[32px] cursor-pointer hover:border-primary bg-gray-50 hover:bg-white transition-all duration-300 group-hover:shadow-md relative overflow-hidden">
        
        {/* Image Preview */}
        {preview && isImage && !isLoading && (
          <>
            <img
              src={preview}
              alt={label}
              className="w-full h-full object-cover rounded-[32px]"
              onError={(e) => {
                // Fallback if image fails to load
                e.target.style.display = 'none';
              }}
            />
            {/* Delete Button */}
            <button
              type="button"
              onClick={handleDelete}
              className="absolute top-3 right-3 z-100 cursor-pointer w-8 h-8 bg-red-500 hover:bg-red-600 text-white rounded-full flex items-center justify-center shadow-lg transition-all duration-300 hover:scale-110"
              title="Delete image"
            >
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
            {/* Overlay on hover */}
            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center rounded-[32px] z-10">
              <div className="text-white text-sm font-semibold">{t("driverPage.form.documents.clickToChange")}</div>
            </div>
          </>
        )}

        {/* Loading State */}
        {isLoading && (
          <div className="absolute inset-0 bg-gray-100/90 flex flex-col items-center justify-center rounded-[32px] z-20">
            <svg className="animate-spin h-8 w-8 text-primary mb-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            <p className="text-sm text-gray-600 font-medium">{t("driverPage.form.documents.uploading")}</p>
          </div>
        )}

        {/* Empty State */}
        {!preview && !isLoading && (
          <div className="flex flex-col items-center justify-center pt-5 pb-6 text-gray-400 group-hover:text-primary transition-colors z-10">
            <div className="w-12 h-12 bg-white rounded-full shadow-sm flex items-center justify-center mb-3">
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                />
              </svg>
            </div>
            <p className="mb-1 text-sm font-medium">
              <span className="font-bold underline decoration-primary/30">{t("driverPage.form.documents.clickToUpload")}</span> {t("driverPage.form.documents.dragAndDrop")}
            </p>
            <p className="text-xs opacity-70">
              {t("driverPage.form.documents.fileTypes")}
            </p>
          </div>
        )}

        {/* PDF or other file type indicator */}
        {value && !isImage && !isLoading && (
          <div className="flex flex-col items-center justify-center pt-5 pb-6 text-primary z-10">
            <svg className="w-10 h-10 mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            <p className="font-semibold text-sm max-w-[200px] truncate px-4">{value.name}</p>
            <p className="text-xs mt-1 text-gray-500">{t("driverPage.form.documents.clickToChange")}</p>
            {/* Delete Button for PDF */}
            <button
              type="button"
              onClick={handleDelete}
              className="mt-2 w-8 h-8 bg-red-500 hover:bg-red-600 text-white rounded-full flex items-center justify-center shadow-lg transition-all duration-300 hover:scale-110"
              title="Delete file"
            >
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
        )}

        {/* Hover Effect Background */}
        <div className="absolute inset-0 bg-primary/5 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />

        <input
          type="file"
          name={name}
          accept={accept}
          onChange={handleFileChange}
          className="hidden"
        />
      </label>
    </div>
  );
};

const DocumentsStep = ({ formData, handleInputChange, setFormData, t }) => {
  const handleDelete = (fieldName) => {
    setFormData((prev) => ({
      ...prev,
      [fieldName]: null,
    }));
  };

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-500">
      <div className="grid md:grid-cols-2 gap-6">
        <FileUploadField
          label={t("driverPage.form.documents.idCard")}
          name="idCard"
          value={formData.idCard}
          accept="image/*,.pdf"
          onChange={handleInputChange}
          onDelete={handleDelete}
          t={t}
        />

        <FileUploadField
          label={t("driverPage.form.documents.drivingLicense")}
          name="drivingLicense"
          value={formData.drivingLicense}
          accept="image/*,.pdf"
          onChange={handleInputChange}
          onDelete={handleDelete}
          t={t}
        />

        <FileUploadField
          label={t("driverPage.form.documents.vehicleRegistration")}
          name="vehicleRegistration"
          value={formData.vehicleRegistration}
          accept="image/*,.pdf"
          onChange={handleInputChange}
          onDelete={handleDelete}
          t={t}
        />

        <FileUploadField
          label={t("driverPage.form.documents.vehicleImage")}
          name="vehicleImage"
          value={formData.vehicleImage}
          accept="image/*"
          onChange={handleInputChange}
          onDelete={handleDelete}
          t={t}
        />
      </div>

      <div className="flex items-start gap-3 pt-6 border-t border-gray-100">
        <div className="relative flex items-center">
          <input
            type="checkbox"
            id="terms"
            required
            className="peer h-5 w-5 cursor-pointer appearance-none rounded border-2 border-gray-300 transition-all checked:border-primary checked:bg-primary"
          />
          <svg
            className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-white opacity-0 peer-checked:opacity-100 transition-opacity"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="4"
            strokeLinecap="round"
            strokeLinejoin="round"
            width="12"
            height="12"
          >
            <polyline points="20 6 9 17 4 12"></polyline>
          </svg>
        </div>
        <label htmlFor="terms" className="text-sm text-gray-600 cursor-pointer select-none">
          {t("driverPage.form.documents.termsAgreement")}{" "}
          <Link href="#" className="text-primary font-semibold hover:underline">
            {t("driverPage.form.documents.termsOfService")}
          </Link>{" "}
          {t("driverPage.form.documents.and")}{" "}
          <Link href="#" className="text-primary font-semibold hover:underline">
            {t("driverPage.form.documents.privacyPolicy")}
          </Link>
          {t("driverPage.form.documents.period")}
        </label>
      </div>
    </div>
  );
};

export default DocumentsStep;
