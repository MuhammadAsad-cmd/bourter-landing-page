export const createInitialFormData = () => ({
  name: "",
  phone: "",
  email: "",
  address: "",
  password: "",
  confirmPassword: "",
  profilePicture: null,
  country: "",
  city: "",
  vehicleType: "",
  vehicleModel: "",
  vehicleNumber: "",
  color: "",
  idCard: null,
  drivingLicense: null,
  vehicleRegistration: null,
  vehicleImage: null,
  selectedPlan: "",
  planType: "monthly",
});

export const populateFormFromUserData = (user) => ({
  name: user.name || "",
  phone: user.phone || "",
  email: user.email || "",
  address: user.address || "",
  country: user.country || "",
  city: user.city || "",
  profilePicture: user.image || null,
  vehicleType: user.vehicleType || "",
  vehicleModel: user.vehicleModel || "",
  vehicleNumber: user.vehicleNumber || "",
  color: user.vehicleColor || "",
  idCard: user.idCardImage || null,
  drivingLicense: user.licenseImage || null,
  vehicleImage: user.vehicleImage || null,
  vehicleRegistration: user.vehicleCardImage || null,
  selectedPlan: user.packageDetails?._id || "",
});

export const buildRegistrationFormData = (formData) => {
  const formDataToSend = new FormData();
  formDataToSend.append("name", formData.name);
  formDataToSend.append("email", formData.email);
  formDataToSend.append("phone", formData.phone);
  formDataToSend.append("address", formData.address);
  formDataToSend.append("password", formData.password);
  
  if (formData.country) {
    formDataToSend.append("country", formData.country);
  }
  if (formData.city) {
    formDataToSend.append("city", formData.city);
  }
  if (formData.profilePicture) {
    formDataToSend.append("image", formData.profilePicture);
  }
  
  return formDataToSend;
};

export const buildVehicleDetailsFormData = (formData) => {
  const formDataToSend = new FormData();
  let hasData = false;

  if (formData.vehicleType) {
    formDataToSend.append("vehicleType", formData.vehicleType);
    hasData = true;
  }
  if (formData.vehicleModel) {
    formDataToSend.append("vehicleModel", formData.vehicleModel);
    hasData = true;
  }
  if (formData.color) {
    formDataToSend.append("vehicleColor", formData.color);
    hasData = true;
  }
  if (formData.vehicleNumber) {
    formDataToSend.append("vehicleNumber", formData.vehicleNumber);
    hasData = true;
  }

  const hasNewFiles = 
    (formData.idCard && formData.idCard instanceof File) ||
    (formData.drivingLicense && formData.drivingLicense instanceof File) ||
    (formData.vehicleImage && formData.vehicleImage instanceof File) ||
    (formData.vehicleRegistration && formData.vehicleRegistration instanceof File);

  const allFilesAreUploaded = 
    formData.idCard && typeof formData.idCard === 'string' && formData.idCard.startsWith('http') &&
    formData.drivingLicense && typeof formData.drivingLicense === 'string' && formData.drivingLicense.startsWith('http') &&
    formData.vehicleImage && typeof formData.vehicleImage === 'string' && formData.vehicleImage.startsWith('http') &&
    formData.vehicleRegistration && typeof formData.vehicleRegistration === 'string' && formData.vehicleRegistration.startsWith('http');

  if (allFilesAreUploaded && !hasNewFiles) {
    const hasOtherData = 
      formData.vehicleType || 
      formData.vehicleModel || 
      formData.color || 
      formData.vehicleNumber ||
      formData.city ||
      formData.country;

    if (!hasOtherData) {
      return { formDataToSend: null, hasData: false, shouldSkip: true };
    }
    return { formDataToSend: null, hasData: false, shouldSkip: true };
  }

  if (formData.idCard && formData.idCard instanceof File) {
    formDataToSend.append("idCardImage", formData.idCard, formData.idCard.name || "idCard.jpg");
    hasData = true;
  }
  if (formData.drivingLicense && formData.drivingLicense instanceof File) {
    formDataToSend.append("licenseImage", formData.drivingLicense, formData.drivingLicense.name || "license.jpg");
    hasData = true;
  }
  if (formData.vehicleImage && formData.vehicleImage instanceof File) {
    formDataToSend.append("vehicleImage", formData.vehicleImage, formData.vehicleImage.name || "vehicle.jpg");
    hasData = true;
  }
  if (formData.vehicleRegistration && formData.vehicleRegistration instanceof File) {
    formDataToSend.append("vehicleCardImage", formData.vehicleRegistration, formData.vehicleRegistration.name || "vehicleCard.jpg");
    hasData = true;
  }

  if (formData.city) {
    formDataToSend.append("city", formData.city);
    hasData = true;
  }
  if (formData.country) {
    formDataToSend.append("country", formData.country);
    hasData = true;
  }

  return { formDataToSend, hasData, shouldSkip: false };
};

