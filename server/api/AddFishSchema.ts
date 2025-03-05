import { addDoc, collection } from "firebase/firestore";
import { useCollection, useFirestore } from "vuefire";

const db = useFirestore();

type Incoming = {
  fishSchema: Fishschema;
};

export default defineEventHandler(async (event) => {
  const body: Incoming = await readBody(event);
  const { fishSchema } = body;
  const fishCollection = collection(db, "fish-schema");
  try {
    await addDoc(fishCollection, fishSchema);
    return {
      status: 200,
    };
  } catch {
    return {
      status: 500,
    };
  }
});
