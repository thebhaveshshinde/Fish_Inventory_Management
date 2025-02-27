<template>
  <main class="flex flex-col h-screen pt-20 overflow-y-scroll">
    <div class="flex items-center justify-center space-x-2">
      <input
        type="text"
        placeholder="Search..."
        class="w-64 px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
      />
      <button
        @click="isFishermanAddFormOpen = true"
        class="px-4 py-2 text-white bg-teal-500 rounded-md hover:bg-teal-600 focus:outline-none focus:ring-2 focus:ring-teal-500"
      >
        <UIcon name="i-heroicons-plus" class="w-5 h-5" />
      </button>
    </div>
    <div class="flex flex-wrap items-center justify-center gap-4 mt-4">
      <div
        v-for="fisherman in fishermans"
        :key="fisherman.id"
        class="flex flex-col items-center p-4 bg-white rounded-lg shadow-md w-96"
      >
        <h3 class="text-3xl font-bold text-teal-700 capitalize">
          {{ fisherman?.name }}
        </h3>

        <span class="font-medium text-teal-600 capitalize"
          >{{ fisherman?.locality }}
        </span>

        <div>
          <p class="mt-2 text-gray-500">
            Phone:
            <span class="font-medium text-teal-600">{{
              fisherman?.phoneno
            }}</span>
          </p>
        </div>
        <p class="mt-2 text-gray-500">
          Date:
          {{
            new Date(
              fisherman.dateOfJoining.seconds * 1000
            ).toLocaleDateString()
          }}
        </p>
        <p class="text-gray-500">
          Boat No:
          <span v-if="fisherman?.boatno" class="font-medium text-green-700">
            {{ fisherman?.boatno }}
          </span>
          <span v-else class="font-medium text-gray-500">Not Available</span>
        </p>
        <div class="flex justify-center w-full mt-4">
          <button
            class="flex items-center gap-2 px-4 py-2 text-white bg-yellow-400 rounded-md hover:bg-yellow-500"
          >
            <UIcon name="i-heroicons-currency-rupee" class="w-5 h-5" />
            <span>Add Transaction</span>
          </button>
        </div>
        <div class="flex mt-2 space-x-4">
          <a
            :href="`tel:${fisherman.phoneno}`"
            class="flex items-center gap-2 px-4 py-2 text-white bg-teal-500 rounded-md hover:bg-teal-600"
          >
            <UIcon name="i-heroicons-phone" class="w-5 h-5" />
            <span>Call Now</span>
          </a>
          <a
            :href="`https://wa.me/${fisherman.phoneno}`"
            target="_blank"
            class="flex items-center gap-2 px-4 py-2 text-white bg-green-500 rounded-md hover:bg-green-600"
          >
            <UIcon
              name="i-heroicons-chat-bubble-bottom-center"
              class="w-5 h-5"
            />
            <span>Whatsapp Now</span>
          </a>
        </div>
      </div>
    </div>
  </main>
  <dialog class="modal bg-black/60" :open="isFishermanAddFormOpen">
    <div class="modal-box">
      <div class="flex items-center justify-between mb-4">
        <h2 class="text-xl font-semibold">Add Fisherman</h2>
        <button
          @click="isFishermanAddFormOpen = false"
          class="text-gray-500 hover:text-gray-700"
        >
          <UIcon name="i-heroicons-x-mark" class="w-6 h-6" />
        </button>
      </div>
      <UserAddForm
        v-if="vendorUser"
        :vendor="vendorUser"
        @close="closeFisherManAddModal()"
      />
    </div>
  </dialog>
</template>
<script lang="ts" setup>
import { collection } from "firebase/firestore";
import { useCollection, useFirestore } from "vuefire";
import { useVendors } from "~/utils/composables/useVendors";
const { data: authData } = useAuth();
const fishermans = ref<Fisherman[]>();
const isFishermanAddFormOpen = ref(false);

const vendorUser = ref<Vendors>();
const stateVendor = useVendors().value;
vendorUser.value = stateVendor.find(
  (vendor) => vendor.email === authData.value?.user?.email
);

const closeFisherManAddModal = () => {
  isFishermanAddFormOpen.value = false;
};

const firestore = useFirestore();
const fishermanCollection = collection(firestore, "fishermans");

const { data: fishermanData } = useCollection(fishermanCollection);

fishermans.value = fishermanData.value as Fisherman[];

definePageMeta({
  layout: "vendorslayout",
  middleware: "sidebase-auth",
});
</script>
