export const apiStepToUiStep = (apiStep) => {
  switch (Number(apiStep)) {
    case 0:
      return 1;
    case 1:
      return 2;
    case 2:
      return 4;
    default:
      return 1;
  }
};

export const determineNextStep = (user) => {
  if (!user.name || !user.phone || !user.address || !user.email) {
    return 1;
  }
  if (!user.city || !user.country) {
    return 1;
  }
  if (!user.vehicleType || !user.vehicleNumber || !user.vehicleModel || !user.vehicleColor) {
    return 2;
  }
  if (
    !user.idCardImage ||
    !user.licenseImage ||
    !user.vehicleImage ||
    !user.vehicleCardImage
  ) {
    return 3;
  }
  if (!user.paymentCompleted) {
    return 4;
  }
  return 1;
};

