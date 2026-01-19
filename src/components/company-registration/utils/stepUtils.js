export const apiStepToUiStep = (apiStep) => {
  // If backend provides a step index, map it to our 3-step UI.
  // 0 -> Account, 1 -> Business Details, 2 -> Plan Selection
  switch (Number(apiStep)) {
    case 0:
      return 1;
    case 1:
      return 2;
    case 2:
    case 3:
      return 3; // Plan Selection (skip verification)
    default:
      return 1;
  }
};

export const determineNextCompanyStep = (company) => {
  // Step 1: Account Information
  if (!company?.name || !company?.phone || !company?.address || !company?.email) {
    return 1;
  }
  if (!company?.city || !company?.country) {
    return 1;
  }
  
  // Step 2: Business Details
  if (!company?.accountDetails) {
    return 2;
  }
  if (!company?.logoImage || !company?.coverImage || !company?.letterheadImage) {
    return 2;
  }
  
  // Step 3: Plan Selection (verification step removed)
  if (!company?.packageDetails) {
    return 3;
  }
  
  // If has package, all steps are complete
  // Return to step 1 (registration form, but they're logged in)
  return 1;
};


