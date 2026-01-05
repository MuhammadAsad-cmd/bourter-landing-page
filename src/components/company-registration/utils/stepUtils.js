export const apiStepToUiStep = (apiStep) => {
  // If backend provides a step index, map it to our 3-step UI.
  // 0 -> Account, 1 -> Business Details, 2 -> Verification
  switch (Number(apiStep)) {
    case 0:
      return 1;
    case 1:
      return 2;
    case 2:
      return 3;
    default:
      return 1;
  }
};

export const determineNextCompanyStep = (company) => {
  if (!company?.name || !company?.phone || !company?.address || !company?.email) {
    return 1;
  }
  if (!company?.city || !company?.country) {
    return 1;
  }
  if (!company?.accountDetails) {
    return 2;
  }
  if (!company?.logoImage || !company?.coverImage || !company?.letterheadImage) {
    return 2;
  }
  return 3;
};


