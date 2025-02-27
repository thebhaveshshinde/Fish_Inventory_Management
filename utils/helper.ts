export const checkIfUserExistsInVendors = async (
	vendors: Vendors[],
	email: string,
) => {
	const userExists = vendors.some(
		(vendor) => vendor?.email?.toLowerCase() === email?.toLowerCase(),
	);

	if (userExists) {
		navigateTo("/vendors/");
	} else if (admins.includes(email)) {
		return;
	} else {
		navigateTo("/unauthorized");
	}
};
