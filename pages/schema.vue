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
        <template #Actions-data="{ row }">
          <div>
            <button
              @click="openDeleteModal(row.id)"
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
      <AddSchema @close="closeModal()" />
    </div>
  </dialog>
  <dialog class="modal bg-black/60" :open="isConfirmDialogOpen">
    <div class="modal-box">
      <div class="flex items-center justify-between mb-4">
        <h2 class="text-xl font-semibold">Confirm Action</h2>
        <button
          @click="isConfirmDialogOpen = false"
          class="text-gray-500 hover:text-gray-700"
        >
          <UIcon name="i-heroicons-x-mark" class="w-6 h-6" />
        </button>
      </div>
      <p>Are you sure you want to proceed?</p>
      <div class="flex justify-end mt-4">
        <UButton
          :loading="isDeleting"
          @click="deleteRecord()"
          class="px-4 py-2 font-bold text-white bg-green-500 rounded hover:bg-green-700"
        >
          Confirm
        </UButton>
        <button
          @click="isConfirmDialogOpen = false"
          class="px-4 py-2 ml-2 font-bold text-white bg-gray-500 rounded hover:bg-gray-700"
        >
          Cancel
        </button>
      </div>
    </div>
  </dialog>
</template>
<script lang="ts" setup>
import { collection, deleteDoc, doc, onSnapshot } from "firebase/firestore";
import { ref } from "vue";
import { useCollection, useFirestore } from "vuefire";
const isSchemaAddFormOpen = ref(false);

const closeFisherManAddModal = () => {
  isSchemaAddFormOpen.value = false;
};

const isConfirmDialogOpen = ref(false);
const idOfSchemaToBeDeleted = ref<string>("");
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
    label: "Per Units",
    class: "bg-gray-900 text-white sticky top-0 z-10",
  },
  {
    key: "Actions",
    label: "actions",
    class: "bg-gray-900 text-white sticky top-0 z-10",
  },
];

const db = useFirestore();
const isDeleting = ref(false);

const FishschemaCollection = collection(db, "fish-schema");
const fishSchema = ref<Fishschema[]>([]);

const closeModal = () => {
  isSchemaAddFormOpen.value = false;
};

function openDeleteModal(id: string) {
  idOfSchemaToBeDeleted.value = id;
  isConfirmDialogOpen.value = true;
}

async function deleteRecord() {
  isDeleting.value = true;
  await deleteDoc(doc(FishschemaCollection, idOfSchemaToBeDeleted.value));
  isConfirmDialogOpen.value = false;
  isDeleting.value = false;
  idOfSchemaToBeDeleted.value = "";
}

onSnapshot(FishschemaCollection, (querySnapshot) => {
  fishSchema.value = querySnapshot.docs.map((doc) => ({
    id: doc.id,
    ...(doc.data() as Fishschema),
  }));
});
</script>
