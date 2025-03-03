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
