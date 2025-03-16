<template>
  <main class="flex flex-col h-screen pt-20 overflow-y-scroll">
    <div class="flex items-center justify-center space-x-2">
      <input v-model="q" type="text" placeholder="Search..."
        class="w-64 px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500" />
      <button @click="isFishermanAddFormOpen = true"
        class="px-4 py-2 text-white bg-teal-500 rounded-md hover:bg-teal-600 focus:outline-none focus:ring-2 focus:ring-teal-500">
        <UIcon name="i-heroicons-plus" class="w-5 h-5" />
      </button>
    </div>
    <div v-if="filteredFishermans.length !== 0"
      class="flex flex-wrap items-start justify-center gap-4 h-[80%] overflow-y-scroll scroll-smooth py-6 mt-4">
      <div v-for="fisherman in filteredFishermans" :key="fisherman.id"
        class="flex flex-col items-center p-4 bg-white rounded-lg shadow-md w-96">
        <div
          class="flex w-full items-center justify-center rounded-md gap-2 bg-gray-700 font-medium text-white capitalize">
          <UIcon name="i-heroicons-map-pin" class="w-5 h-5 text-white" />
          {{ fisherman?.locality }}
        </div>
        <div class="flex flex-row items-center justify-between">
          <h3 class="text-xl font-bold text-teal-700 capitalize">
            {{ fisherman?.name }}
          </h3>

        </div>
        <div class="mt-2">
          <p class="text-gray-500">
            Phone:
            <span class="font-medium text-teal-600">{{
              fisherman?.phoneno
              }}</span>
          </p>
          <p class="mt-2 text-gray-500">
            Date:
            {{
              new Date(
                fisherman.dateOfJoining.seconds * 1000
              )?.toLocaleDateString()
            }}
          </p>
          <p class="text-gray-500">
            Boat No:
            <span v-if="fisherman?.boatno" class="font-medium text-green-700">
              {{ fisherman?.boatno }}
            </span>
            <span v-else class="font-medium text-gray-500">Not Available</span>
          </p>
        </div>
        <div class="flex justify-center w-full mt-4">
          <button class="flex items-center gap-2 px-4 py-2 text-white bg-yellow-400 rounded-md hover:bg-yellow-500"
            @click="openTransactionModal(fisherman)">
            <UIcon name="i-heroicons-currency-rupee" class="w-5 h-5" />
            <span>Add Transaction</span>
          </button>
        </div>
        <div class="flex mt-2 space-x-4">
          <a :href="`tel:${fisherman.phoneno}`"
            class="flex items-center gap-2 px-4 py-2 text-white bg-teal-500 rounded-md hover:bg-teal-600">
            <UIcon name="i-heroicons-phone" class="w-5 h-5" />
          </a>
          <a :href="`https://wa.me/${fisherman.phoneno}`" target="_blank"
            class="flex items-center gap-2 px-4 py-2 text-white bg-green-500 rounded-md hover:bg-green-600">
            <UIcon name="i-heroicons-chat-bubble-bottom-center" class="w-5 h-5" />

          </a>
          <button class="flex items-center gap-2 px-4 py-2 text-white bg-red-500 rounded-md hover:bg-red-600"
            @click="openDeleteModal(fisherman)">
            <UIcon name="i-heroicons-trash" class="w-5 h-5" />
            <span>Delete</span>
          </button>

        </div>
      </div>
    </div>
    <div v-else>
      <div class="flex flex-col items-center justify-center p-4">
        <UIcon name="i-heroicons-document-text" class="w-24 h-24 text-gray-400" />
        <h4 class="text-2xl font-semibold text-gray-600">No data Found</h4>
        <p class="text-center text-gray-500">Add a fisherman to view details</p>
      </div>
    </div>
  </main>
  <dialog class="modal bg-black/60" :open="isFishermanAddFormOpen">
    <div class="modal-box">
      <div class="flex items-center justify-between mb-4">
        <h2 class="text-xl font-semibold">Add Fisherman</h2>
        <button @click="isFishermanAddFormOpen = false" class="text-gray-500 hover:text-gray-700">
          <UIcon name="i-heroicons-x-mark" class="w-6 h-6" />
        </button>
      </div>
      <UserAddForm v-if="vendorUser" :vendor="vendorUser" @close="closeFisherManAddModal()" />
    </div>
  </dialog>
  <dialog class="modal bg-black/60" :open="isTransactionModalOpen">
    <div class="modal-box">
      <div class="flex items-center justify-between mb-4">
        <h2 class="flex items-center gap-2 text-xl font-semibold">
          <UIcon name="i-heroicons-square-3-stack-3d" class="w-6 h-6" />
          Add Transaction
        </h2>
        <button @click="isTransactionModalOpen = false" class="text-gray-500 hover:text-gray-700">
          <UIcon name="i-heroicons-x-mark" class="w-6 h-6" />
        </button>
      </div>
      <TransactionForm v-if="fishermantobepassedfortransction && fishermanschema"
        :fisherman="fishermantobepassedfortransction" :fishSchema="fishermanschema" @close="closeTransactionModal()" />
    </div>
  </dialog>
  <dialog class="modal bg-black/60" :open="isConfirmDeleteModalOpen">
    <div class="modal-box">
      <div class="flex items-center justify-between mb-4">
        <h2 class="text-xl font-semibold">Confirm Delete</h2>
        <button @click="isConfirmDeleteModalOpen = false" class="text-gray-500 hover:text-gray-700">
          <UIcon name="i-heroicons-x-mark" class="w-6 h-6" />
        </button>
      </div>
      <p>Are you sure you want to delete this fisherman?</p>
      <div class="flex justify-end mt-4">
        <UButton :loading="isLoading" @click="deleteFisherman()"
          class="px-4 py-2 font-bold text-white bg-red-500 rounded hover:bg-red-700">
          Confirm
        </UButton>
        <button @click="isConfirmDeleteModalOpen = false"
          class="px-4 py-2 ml-2 font-bold text-white bg-gray-500 rounded hover:bg-gray-700">
          Cancel
        </button>
      </div>
    </div>
  </dialog>
  <UNotifications />
</template>
<script lang="ts" setup>
import {
  collection,
  getDocs,
  onSnapshot,
  query,
  where,
} from "firebase/firestore";
import { useCollection, useCurrentUser, useFirestore } from "vuefire";
import { deleteDoc, doc } from "firebase/firestore";
import { useCurrentVendor } from "~/utils/composables/useCurrentVendor";
import { useVendors } from "~/utils/composables/useVendors";

const { data: authData } = useAuth();
const fishermans = ref<Fisherman[]>([]);
const isFishermanAddFormOpen = ref(false);
const q = ref("");
const vendorUser = ref<Vendors>();
const stateVendor = useVendors().value;
const fishermanschema = ref<Fishschema[]>();
const isTransactionModalOpen = ref<boolean>(false);
const fishermantobepassedfortransction = ref<Fisherman>();
const isConfirmDeleteModalOpen = ref<boolean>(false);
const isLoading = ref(false);

vendorUser.value = stateVendor.find(
  (vendor) => vendor.email === authData.value?.user?.email
);
const currentVendor = useCurrentVendor().value;
const closeFisherManAddModal = () => {
  isFishermanAddFormOpen.value = false;
};

const openDeleteModal = (fisherman: Fisherman) => {
  fishermantobepassedfortransction.value = fisherman;
  isConfirmDeleteModalOpen.value = true;
};


const deleteFisherman = async () => {
  isLoading.value = true;
  const firestore = useFirestore();
  if (fishermantobepassedfortransction.value?.id) {
    const fishermanRef = doc(firestore, "fishermans", fishermantobepassedfortransction.value?.id);
    await deleteDoc(fishermanRef);
  }
  fishermantobepassedfortransction.value = undefined;
  isConfirmDeleteModalOpen.value = false;
  useToast().add({
    title: "Success",
    description: "Fisherman deleted successfully",
    icon: "i-heroicons-check-circle",
  });
  isLoading.value = false;
};

const firestore = useFirestore();
const fishermanCollection = collection(firestore, "fishermans");
const fishermanSchema = collection(firestore, "fish-schema");
const fishermanDocs = await getDocs(fishermanSchema);

fishermanschema.value = fishermanDocs.docs.map((doc) => {
  const data = doc.data();
  return {
    id: doc.id,
    Fish_name: data.Fish_name,
    Default_price: data.Default_price,
  } as Fishschema;
});

const fishermanQuery = query(fishermanCollection);
const unsubscribe = onSnapshot(fishermanQuery, (snapshot) => {
  fishermans.value = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })) as Fisherman[];
});

definePageMeta({
  layout: "vendorslayout",
  middleware: "sidebase-auth",
});

const filteredFishermans = computed(() => {
  return (
    fishermans.value?.filter(
      (fisherman) =>
        fisherman.vendorsid === currentVendor.id &&
        Object.values(fisherman).some(
          (value) =>
            typeof value === "string" &&
            value.toLowerCase().includes(q.value.toLowerCase())
        )
    ) || []
  );
});

const openTransactionModal = (fisherman: Fisherman) => {
  isTransactionModalOpen.value = true;
  fishermantobepassedfortransction.value = fisherman;
};

const closeTransactionModal = () => {
  isTransactionModalOpen.value = false;
  fishermantobepassedfortransction.value = undefined;
};

onBeforeUnmount(() => {
  unsubscribe();
});
</script>
