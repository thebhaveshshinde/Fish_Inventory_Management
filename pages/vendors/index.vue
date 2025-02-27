<template>
    <main class="flex flex-col h-screen overflow-y-scroll  pt-20">
        <div class="flex items-center justify-center space-x-2">
            <input type="text" placeholder="Search..."
                class="px-4 py-2 w-64 border rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500" />
            <button
                @click="isFishermanAddFormOpen=true"
                class="bg-teal-500 text-white px-4 py-2 rounded-md hover:bg-teal-600 focus:outline-none focus:ring-2 focus:ring-teal-500">
                <UIcon name="i-heroicons-plus" class="w-5 h-5" />
            </button>
        </div>
        <div class="flex flex-col items-center justify-center space-y-4 mt-4">
            <div class="grid grid-cols-1 gap-4 w-full max-w-md">
                <div v-for="fisherman in fishermans" :key="fisherman.id" class="bg-white shadow-md rounded-lg p-4 flex flex-col items-center">
                    <h3 class="text-2xl font-bold text-teal-700">{{ fisherman?.name }}</h3>
                    <p class="text-gray-500 mt-2">Date: {{ new Date(fisherman.dateOfJoining.seconds * 1000).toLocaleDateString() }}</p>
                    <p class="text-gray-500">Boat No: <span class="font-medium text-teal-600">{{ fisherman?.boatno }}</span></p>
                    <div class="flex space-x-4 mt-4">
                        <button class="bg-teal-500 text-white px-4 py-2 rounded-md hover:bg-teal-600">
                            <UIcon name="i-heroicons-phone" class="w-5 h-5" />
                        </button>
                        <button class="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600">
                            <UIcon name="i-heroicons-currency-rupee" class="w-5 h-5" />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </main>
    <dialog class="modal bg-black/60" :open="isFishermanAddFormOpen">
        
            <div class="modal-box">
                <div class="flex justify-between items-center mb-4">
                    <h2 class="text-xl font-semibold">Add Fisherman</h2>
                    <button @click="isFishermanAddFormOpen = false" class="text-gray-500 hover:text-gray-700">
                        <UIcon name="i-heroicons-x-mark" class="w-6 h-6" />
                    </button>
                </div>
                <UserAddForm v-if="vendorUser" :vendor="vendorUser"  @close="closeFisherManAddModal()" />
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
	(vendor) => vendor.email === authData.value?.user?.email,
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
