import { initializeApp } from "firebase/app";
import type { Timestamp } from "firebase/firestore";
import { addDoc, collection, doc, getFirestore } from "firebase/firestore";

const config = useRuntimeConfig();

const firebase = initializeApp(config.firebaseConfig);
const db = getFirestore(firebase);
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

export default defineEventHandler(async (event) => {
	const body: { fisherman: Fisherman } = await readBody(event);
	try {
		await addDoc(collection(db, "fishermans"), body.fisherman);

		return {
			status: 200,
		};
	} catch {
		return {
			status: 500,
		};
	}
});
