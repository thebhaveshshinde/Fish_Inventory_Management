import { initializeApp } from "firebase/app";
import { collection, doc, getFirestore, setDoc } from "firebase/firestore";

const config = useRuntimeConfig();

const firebase = initializeApp(config.firebaseConfig);

const db = getFirestore(firebase);

export default defineEventHandler(async (event) => {
	const data: { vendor: Vendors } = await readBody(event);

	try {
		const response = await setDoc(doc(collection(db, "vendors")), data.vendor);

		return {
			status: 200,
		};
	} catch {
		return {
			status: 500,
		};
	}
});
