export const apiStepToUiStep = (apiStep) => {
  // If backend provides a step index, map it to our 4-step UI.
  // 0 -> Account, 1 -> Business Details, 2 -> Verification, 3 -> Plan Selection
  switch (Number(apiStep)) {
    case 0:
      return 1;
    case 1:
      return 2;
    case 2:
      return 3;
    case 3:
      return 4;
    default:
      return 1;
  }
};

export const determineNextCompanyStep = (company) => {
  // Check if account is already verified
  const isVerified = Boolean(company?.accountVerify);
  
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
  
  // Step 4: Plan Selection (skip verification if already verified)
  if (!company?.packageDetails) {
    return 4;
  }
  
  // If verified and has package, all steps are complete
  // Return to step 1 (registration form, but they're logged in)
  if (isVerified && company?.packageDetails) {
    return 1;
  }
  
  // Step 3: Verification (only if not verified)
  return 3;
};


