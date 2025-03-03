<template>
  <main class="bg-white">
    <UCard class="relative h-full mt-10 bg-gray-800 rounded-none">
      <button
        @click="isSchemaAddFormOpen = true"
        class="flex items-center px-4 py-2 space-x-2 text-white bg-teal-500 rounded-md hover:bg-teal-600 focus:outline-none focus:ring-2 focus:ring-teal-500"
      >
        <UIcon name="i-heroicons-plus" class="w-5 h-5" />
        <span>Add New Fish</span>
      </button>
      <UTable
        class="h-[80vh] text-white overflow-y-scroll"
        :columns="columns"
        :rows="fishSchema"
      >
        <template #Actions-data="row">
          <div>
            <button
              @click=""
              class="px-4 py-2 font-bold text-white bg-blue-500 rounded hover:bg-blue-700"
            >
              Edit
            </button>
            <button
              @click=""
              class="px-4 py-2 ml-2 font-bold text-white bg-red-500 rounded hover:bg-red-700"
            >
              Delete
            </button>
          </div>
        </template>
      </UTable>
    </UCard>
  </main>
  <dialog class="modal bg-black/60" :open="isSchemaAddFormOpen">
    <div class="modal-box">
      <div class="flex items-center justify-between mb-4">
        <h2 class="text-xl font-semibold">Add Your Fish</h2>
        <button
          @click="isSchemaAddFormOpen = false"
          class="text-gray-500 hover:text-gray-700"
        >
          <UIcon name="i-heroicons-x-mark" class="w-6 h-6" />
        </button>
      </div>
      <!-- <UserAddForm
				v-if="vendorUser"
				:vendor="vendorUser"
				@close="closeFisherManAddModal()"
			/> -->
    </div>
  </dialog>
</template>
<script lang="ts" setup>
import { collection } from "firebase/firestore";
import { useCollection, useFirestore } from "vuefire";
import { onSnapshot } from "firebase/firestore";
const isSchemaAddFormOpen = ref(false);
const closeFisherManAddModal = () => {
  isSchemaAddFormOpen.value = false;
};

const columns = [
  {
    key: "Fish_name",
    label: "Names Of Fishes",
    class: "bg-gray-900 text-white sticky top-0 z-10",
  },
  {
    key: "Default_price.Per_Kg",
    label: "Per Kg",
    class: "bg-gray-900 text-white sticky top-0 z-10",
  },
  {
    key: "Default_price.Per_Dozen",
    label: "Per Dozen",
    class: "bg-gray-900 text-white sticky top-0 z-10",
  },
  {
    key: "Default_price.Per_Unit",
    label: "Per Dozen",
    class: "bg-gray-900 text-white sticky top-0 z-10",
  },
  {
    key: "Actions",
    label: "actions",
    class: "bg-gray-900 text-white sticky top-0 z-10",
  },
];

const db = useFirestore();

const FishschemaCollection = collection(db, "fish-schema");
const fishSchema = ref<Fishschema[]>([]);
onSnapshot(FishschemaCollection, (querySnapshot) => {
  fishSchema.value = querySnapshot.docs.map((doc) => ({
    id: doc.id,
    ...(doc.data() as Fishschema),
  }));
});
</script>
