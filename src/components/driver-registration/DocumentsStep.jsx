import Link from "next/link";

const FileUploadField = ({ label, name, value, accept, onChange }) => {
  return (
    <div className="group">
      <label className="block text-sm font-bold text-gray-700 mb-2 group-hover:text-primary transition-colors">
        {label}
      </label>
      <label className="flex flex-col items-center justify-center w-full h-36 border-2 border-dashed border-gray-300 rounded-[32px] cursor-pointer hover:border-primary bg-gray-50 hover:bg-white transition-all duration-300 group-hover:shadow-md relative overflow-hidden">

        {value ? (
          <div className="flex flex-col items-center justify-center pt-5 pb-6 text-primary z-10">
            <svg className="w-10 h-10 mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <p className="font-semibold text-sm max-w-[200px] truncate px-4">{value.name}</p>
            <p className="text-xs mt-1 text-gray-500">Click to change</p>
          </div>
        ) : (
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
              <span className="font-bold underline decoration-primary/30">Click to upload</span> or drag and drop
            </p>
            <p className="text-xs opacity-70">
              PDF, JPG, PNG (max. 5MB)
            </p>
          </div>
        )}

        {/* Hover Effect Background */}
        <div className="absolute inset-0 bg-primary/5 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />

        <input
          type="file"
          name={name}
          accept={accept}
          onChange={onChange}
          className="hidden"
        />
      </label>
    </div>
  );
};

const DocumentsStep = ({ formData, handleInputChange }) => {
  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-500">
      <div className="grid md:grid-cols-2 gap-6">
        <FileUploadField
          label="ID Card (Front & Back)"
          name="idCard"
          value={formData.idCard}
          accept="image/*,.pdf"
          onChange={handleInputChange}
        />

        <FileUploadField
          label="Driving License"
          name="drivingLicense"
          value={formData.drivingLicense}
          accept="image/*,.pdf"
          onChange={handleInputChange}
        />

        <FileUploadField
          label="Vehicle Registration"
          name="vehicleRegistration"
          value={formData.vehicleRegistration}
          accept="image/*,.pdf"
          onChange={handleInputChange}
        />

        <FileUploadField
          label="Vehicle Image (Clean & Clear)"
          name="vehicleImage"
          value={formData.vehicleImage}
          accept="image/*"
          onChange={handleInputChange}
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
          By submitting documents, you confirm that all information is accurate and agree to the{" "}
          <Link href="#" className="text-primary font-semibold hover:underline">
            Terms of Service
          </Link>{" "}
          and{" "}
          <Link href="#" className="text-primary font-semibold hover:underline">
            Privacy Policy
          </Link>
          .
        </label>
      </div>
    </div>
  );
};

export default DocumentsStep;
