export const createInitialCompanyFormData = () => ({
  name: "",
  phone: "",
  email: "",
  address: "",
  password: "",
  confirmPassword: "",
  country: "",
  city: "",
  logoImage: null,
  coverImage: null,
  letterheadImage: null,
});

export const populateCompanyFormFromUserData = (company) => ({
  name: company?.name || "",
  phone: company?.phone || "",
  email: company?.email || "",
  address: company?.address || "",
  country: company?.country || "",
  city: company?.city || "",
  logoImage: company?.logoImage || null,
  coverImage: company?.coverImage || null,
  letterheadImage: company?.letterheadImage || null,
});

export const buildCompanyDetailsFormData = (formData) => {
  const formDataToSend = new FormData();
  let hasData = false;

  const hasNewFiles =
    (formData.logoImage && formData.logoImage instanceof File) ||
    (formData.coverImage && formData.coverImage instanceof File) ||
    (formData.letterheadImage && formData.letterheadImage instanceof File);

  const allFilesAreUploaded =
    formData.logoImage &&
    typeof formData.logoImage === "string" &&
    formData.logoImage.startsWith("http") &&
    formData.coverImage &&
    typeof formData.coverImage === "string" &&
    formData.coverImage.startsWith("http") &&
    formData.letterheadImage &&
    typeof formData.letterheadImage === "string" &&
    formData.letterheadImage.startsWith("http");

  if (allFilesAreUploaded && !hasNewFiles) {
    return { formDataToSend: null, hasData: false, shouldSkip: true };
  }

  if (formData.logoImage && formData.logoImage instanceof File) {
    formDataToSend.append(
      "logoImage",
      formData.logoImage,
      formData.logoImage.name || "logo.jpg"
    );
    hasData = true;
  }
  if (formData.coverImage && formData.coverImage instanceof File) {
    formDataToSend.append(
      "coverImage",
      formData.coverImage,
      formData.coverImage.name || "cover.jpg"
    );
    hasData = true;
  }
  if (formData.letterheadImage && formData.letterheadImage instanceof File) {
    formDataToSend.append(
      "letterheadImage",
      formData.letterheadImage,
      formData.letterheadImage.name || "letterhead.jpg"
    );
    hasData = true;
  }

  return { formDataToSend, hasData, shouldSkip: false };
};


