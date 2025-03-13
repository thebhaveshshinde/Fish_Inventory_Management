export const checkIfUserExistsInVendors = async (
  fishermans: Fisherman[],
  vendors: Vendors[],
  email: string
) => {
  const userExists = vendors.some(
    (vendor) => vendor?.email?.toLowerCase() === email?.toLowerCase()
  );
  const fishermanExists = fishermans.some(
    (fisherman) => fisherman?.email?.toLowerCase() === email?.toLowerCase()
  );
  if (admins.includes(email)) {
    return;
  } else if (userExists) {
    navigateTo("/vendors/");
    return;
  } else if (fishermanExists) {
    navigateTo("/fisherman/");
    return;
  }
  navigateTo("/unauthorized");
  return;
};

export const convertToIndianFormat = (number: number): string => {
  return number?.toLocaleString("en-IN", {
    maximumFractionDigits: 2,
    minimumFractionDigits: 2,
  });
};
