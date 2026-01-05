const VerificationStep = ({ userData, t }) => {
  const isVerified = Boolean(userData?.accountVerify);

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-500">
      <div className="text-center mb-2">
        <h2 className="text-2xl font-bold text-gray-900">
          {t("companyPage.form.verification.title")}
        </h2>
        <p className="text-gray-600">{t("companyPage.form.verification.subtitle")}</p>
      </div>

      <div
        className={`rounded-2xl border-2 px-6 py-5 ${
          isVerified
            ? "bg-green-50 border-green-200 text-green-800"
            : "bg-blue-50 border-blue-200 text-blue-800"
        }`}
      >
        <p className="font-bold">
          {isVerified
            ? t("companyPage.form.verification.verifiedTitle")
            : t("companyPage.form.verification.pendingTitle")}
        </p>
        <p className="mt-1 text-sm font-medium">
          {isVerified
            ? t("companyPage.form.verification.verifiedDesc")
            : t("companyPage.form.verification.pendingDesc")}
        </p>
      </div>

      <div className="rounded-2xl bg-white border border-gray-100 p-6">
        <p className="font-bold text-gray-900">
          {t("companyPage.form.verification.nextStepsTitle")}
        </p>
        <ul className="mt-3 space-y-2 text-sm text-gray-600 font-medium">
          <li>- {t("companyPage.form.verification.nextStep1")}</li>
          <li>- {t("companyPage.form.verification.nextStep2")}</li>
        </ul>
      </div>
    </div>
  );
};

export default VerificationStep;


