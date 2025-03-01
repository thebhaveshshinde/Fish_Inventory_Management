import type { Timestamp } from "firebase/firestore";

declare global {
	type Vendors = {
		id?: string;
		name: string;
		email: string;
		phone: string;
		plan: "monthly" | "3months" | "yearly";
		address?: string;
		locality: string;
		dateOfJoining: Timestamp;
		dateOfLastRenewal: Timestamp;
	};
	type Fisherman = {
		id?: string;
		name: string;
		email: string;
		phoneno: string;
		address: string;
		locality: string;
		boatno: string;
		accountno: string;
		upiid: string;
		vendorsid: string;
		dateOfJoining: Timestamp;
		isActive?: boolean;
	};
	type Transaction = {
		id?: string;
		dateofTransaction: Timestamp;
		vendorsid: string;
		fishermanid: string;
		billstatus: "PAID" | "PENDING";
		totalamount: number;
		modeofpayment: "CASH" | "UPI" | "CHEQUE" | "CARD";
		products: {
			name: string;
			quantity: number;
			typeofquantity: "kg" | "dozens" | "unit";
			pricedecided: number;
			totalprice: number;
		}[];
	};

	type DefaultPrice = {
		Per_Kg?: number;
		Per_Unit?: number;
		Per_Dozen?: number;
	};

	type Fishschema = {
		Fish_name: string;
		Default_price: DefaultPrice;
	};
}
