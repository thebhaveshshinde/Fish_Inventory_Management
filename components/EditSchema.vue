<template>
  <main>{{ fishSchemadata }}</main>
</template>
<script lang="ts" setup>
import { collection, doc, getDoc } from "firebase/firestore";
const props = defineProps<{ fishschemaid: string }>();

const fishSchemadata = ref<Fishschema>();
const { fishschemaid } = props;

const db = useFirestore();
const fishSchemaRef = collection(db, "fish-schema");

async function getFishSchemaById() {
  const docRef = doc(fishSchemaRef, fishschemaid);
  const docSnap = await getDoc(docRef);

  if (docSnap.exists()) {
    fishSchemadata.value = { id: docSnap.id, ...docSnap.data() };
  } else {
    console.log("No such document!");
  }
}

onMounted(() => {
  getFishSchemaById();
});
</script>
