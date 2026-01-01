import Link from "next/link";

const SuccessModal = ({ onClose, t }) => {
  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl p-8 max-w-md w-full shadow-2xl animate-in fade-in zoom-in">
        <div className="flex flex-col items-center text-center">
          <div className="w-20 h-20 bg-primary rounded-full flex items-center justify-center mb-4">
            <svg
              className="w-12 h-12 text-white"
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
          </div>
          <h2 className="text-2xl font-bold text-primary mb-2">
            {t("driverPage.form.successModal.title")}
          </h2>
          <p className="text-text-secondary mb-6">
            {t("driverPage.form.successModal.description")}
          </p>
          <Link
            href="/"
            className="w-full py-3 rounded-lg bg-primary text-white font-semibold hover:bg-primary/90 transition-all shadow-md"
            style={{
              background:
                "linear-gradient(130.4deg, #0053A2 15.06%, #06294A 87.46%)",
            }}
          >
            {t("driverPage.form.successModal.continue")}
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SuccessModal;

