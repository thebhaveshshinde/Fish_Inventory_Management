import { initializeApp } from "firebase/app";
import { addDoc, collection, getFirestore } from "firebase/firestore";

const config = useRuntimeConfig();

const firestore = initializeApp(config.firebaseConfig);

const db = getFirestore(firestore);
type Incoming = {
	fishes: Fishschema[];
};

export default defineEventHandler(async (event) => {
	const { fishes }: Incoming = await readBody(event);
	for (const fish of fishes) {
		const reponse = addDoc(collection(db, "fish-schema"), fish);
	}

	return {
		status: 200,
		message: "hoagaya bhai",
	};
});
