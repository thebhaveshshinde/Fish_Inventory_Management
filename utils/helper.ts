export const checkIfUserExistsInVendors = async (
  vendors: Vendors[],
  email: string
) => {
  const userExists = vendors.some(
    (vendor) => vendor?.email?.toLowerCase() === email?.toLowerCase()
  );

  if (admins.includes(email)) {
    return;
  } else if (userExists) {
    navigateTo("/vendors/");
  } else {
    navigateTo("/unauthorized");
  }
};

export const convertToIndianFormat = (number: number): string => {
  return number.toLocaleString("en-IN", {
    maximumFractionDigits: 2,
    minimumFractionDigits: 2,
  });
};
