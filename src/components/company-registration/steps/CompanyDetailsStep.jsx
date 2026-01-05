"use client";

const FileCard = ({ title, description, name, value, onChange, t }) => {
  const previewUrl =
    value && value instanceof File ? URL.createObjectURL(value) : value;

  return (
    <label className="group cursor-pointer block">
      <div className="rounded-2xl border-2 border-dashed border-gray-200 bg-white hover:border-primary transition-colors p-5">
        <div className="flex items-start justify-between gap-4">
          <div className="min-w-0">
            <p className="font-bold text-gray-900">{title}</p>
            <p className="text-sm text-gray-600 mt-1">{description}</p>
          </div>
          <div className="shrink-0">
            <div className="px-3 py-1.5 rounded-full text-xs font-bold bg-primary/10 text-primary">
              {t("companyPage.form.details.upload")}
            </div>
          </div>
        </div>

        <div className="mt-4 overflow-hidden rounded-xl bg-gray-50 border border-gray-100">
          {previewUrl ? (
            <img
              src={previewUrl}
              alt={title}
              className="w-full h-40 object-cover"
            />
          ) : (
            <div className="h-40 flex items-center justify-center text-gray-400">
              <div className="flex flex-col items-center gap-2">
                <svg
                  className="w-10 h-10"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 15a4 4 0 004 4h10a4 4 0 004-4M7 10l5-5m0 0l5 5m-5-5v12"
                  />
                </svg>
                <p className="text-sm font-medium">
                  {t("companyPage.form.details.clickToUpload")}
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
      <input
        type="file"
        name={name}
        accept="image/*"
        onChange={onChange}
        className="hidden"
      />
    </label>
  );
};

const CompanyDetailsStep = ({ formData, handleInputChange, companyId, t }) => {
  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-500">
      <div className="text-center mb-2">
        <h2 className="text-2xl font-bold text-gray-900">
          {t("companyPage.form.details.title")}
        </h2>
        <p className="text-gray-600">{t("companyPage.form.details.subtitle")}</p>
      </div>

      {!companyId && (
        <div className="bg-amber-50 border-2 border-amber-200 rounded-2xl px-5 py-4 text-amber-800 text-sm font-medium">
          {t("companyPage.form.details.needAccountFirst")}
        </div>
      )}

      <div className="grid md:grid-cols-2 gap-6">
        <FileCard
          title={t("companyPage.form.details.logoTitle")}
          description={t("companyPage.form.details.logoDesc")}
          name="logoImage"
          value={formData.logoImage}
          onChange={handleInputChange}
          t={t}
        />
        <FileCard
          title={t("companyPage.form.details.coverTitle")}
          description={t("companyPage.form.details.coverDesc")}
          name="coverImage"
          value={formData.coverImage}
          onChange={handleInputChange}
          t={t}
        />
        <div className="md:col-span-2">
          <FileCard
            title={t("companyPage.form.details.letterheadTitle")}
            description={t("companyPage.form.details.letterheadDesc")}
            name="letterheadImage"
            value={formData.letterheadImage}
            onChange={handleInputChange}
            t={t}
          />
        </div>
      </div>
    </div>
  );
};

export default CompanyDetailsStep;


