<template>
  <main class="flex flex-col bg-gray-100 py-20 min-h-screen">
    <div class="py-10 text-center">
      <h1 class="text-3xl md:text-4xl lg:text-5xl text-gray-600">
        Fishery Management
      </h1>
      <h2 class="text-xl md:text-2xl lg:text-3xl text-gray-500">
        A CRM that makes it easy
      </h2>
    </div>
    <div class="flex flex-row justify-center space-x-4">
      <div class="grid grid-cols-3 gap-6">
        <div
          class="bg-gray-600 w-24 cursor-pointer h-24 rounded-lg flex flex-col items-center justify-center text-white text-3xl font-bold shadow-md">
          <span>{{ vendorState.length }}</span>
          <span class="text-sm font-medium">Vendors</span>
        </div>
        <div
          class="bg-red-600 w-24 h-24 cursor-pointer rounded-lg flex flex-col items-center justify-center text-white text-3xl font-bold shadow-md">
          <span>10</span>
          <span class="text-sm font-medium">Issues</span>
        </div>
        <div
          class="bg-green-600 w-24 h-24 cursor-pointer rounded-lg flex flex-col items-center justify-center text-white text-3xl font-bold shadow-md">
          <span>{{ fishermansState.length }}</span>
          <span class="text-sm font-medium">FisherMans</span>
        </div>
      </div>
    </div>
    <div class="flex flex-row justify-center space-x-4 mt-10">
      <UButton @click="isAddVendorModalOpen = true" color="gray" size="xl" variant="solid">Add Vendors</UButton>
      <UButton color="teal" size="xl" variant="solid"> Manage Users </UButton>
    </div>
    <dialog class="modal bg-black/60" :open="isAddVendorModalOpen">
      <div class="bg-gray-900 px-4 py-2 rounded-md">
        <div class="flex items-center justify-between mb-4">
          <h3 class="text-base font-semibold leading-6 text-gray-900 dark:text-white">
            Add Vendors
          </h3>
          <UButton color="gray" variant="ghost" icon="i-heroicons-x-mark-20-solid" class="-my-1"
            @click="isAddVendorModalOpen = false" />
        </div>
        <div class="flex flex-col items-center justify-center">
          <!-- Name Input -->
          <div>
            <label for="name" class="block text-sm font-medium text-gray-700 dark:text-gray-200">Name</label>
            <input v-model="vendors.name" type="text" id="name" required
              class="mt-1 block  rounded-md border-gray-300 shadow-sm focus:ring-indigo-500 dark:bg-gray-700 dark:text-white dark:border-gray-600" />
          </div>

          <!-- Email Input -->
          <div>
            <label for="email" class="block text-sm font-medium text-gray-700 dark:text-gray-200">Email</label>
            <input type="email" v-model="vendors.email" id="email" required
              class="mt-1 block  rounded-md border-gray-300 shadow-sm focus:ring-indigo-500 dark:bg-gray-700 dark:text-white dark:border-gray-600" />
          </div>

          <!-- Phone Number Input -->
          <div>
            <label for="phone" class="block text-sm font-medium text-gray-700 dark:text-gray-200">Phone Number</label>
            <input type="tel" id="phone" v-model="vendors.phone" required
              class="mt-1 block  rounded-md border-gray-300 shadow-sm focus:ring-indigo-500 dark:bg-gray-700 dark:text-white dark:border-gray-600" />
          </div>

          <div>
            <label for="address" class="block text-sm font-medium text-gray-700 dark:text-gray-200">
              Address</label>
            <input type="text" id="address" v-model="vendors.address" required
              class="mt-1 block  rounded-md border-gray-300 shadow-sm focus:ring-indigo-500 dark:bg-gray-700 dark:text-white dark:border-gray-600" />
          </div>

          <div>
            <label for="locality" class="block text-sm font-medium text-gray-700 dark:text-gray-200">
              Locality</label>
            <input type="text" id="locality" v-model="vendors.locality" required
              class="mt-1 block  rounded-md border-gray-300 shadow-sm focus:ring-indigo-500 dark:bg-gray-700 dark:text-white dark:border-gray-600" />
          </div>

          <!-- Plan Select Dropdown -->
          <div>
            <label for="plan" class="block text-sm font-medium text-gray-700 dark:text-gray-200">Select Plan</label>
            <select id="plan" v-model="vendors.plan" ref="plan" required
              class="mt-1 block  rounded-md border-gray-300 shadow-sm focus:ring-indigo-500 dark:bg-gray-700 dark:text-white dark:border-gray-600">
              <option value="monthly">Monthly Plan</option>
              <option value="3months">3 Months Plan</option>
              <option value="yearly">Yearly Plan</option>
            </select>
          </div>

          <!-- Submit Button -->
          <div class="flex justify-center">
            <UButton :loading="isDataSubmitting" :disabled="!isVendorsFormvalid" @click="addVendor()" color="indigo"
              class="mt-4">
              Submit
            </UButton>
          </div>
        </div>
      </div>
    </dialog>

    <UNotifications />
  </main>
</template>
<script lang="ts" setup>
import { Timestamp } from "firebase/firestore";
import { useFishermans } from "~/utils/composables/useFishermans";
import { useVendors } from "~/utils/composables/useVendors";

const fishermansState = useFishermans();
const vendorState = useVendors();
const { data } = useAuth();
const toast = useToast();
const isAddVendorModalOpen = ref(false);
definePageMeta({
  middleware: "sidebase-auth",
  isalive: true,
});

const vendors = ref<Vendors>({
  name: "",
  email: "",
  phone: "",
  plan: "monthly",
  address: "",
  dateOfJoining: Timestamp.fromDate(new Date()),
  dateOfLastRenewal: Timestamp.fromDate(new Date()),
  locality: "",
});
const isDataSubmitting = ref(false);

const isVendorsFormvalid = computed(() => {
  const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
  return (
    vendors.value.name.length > 0 &&
    vendors.value.phone.length === 10 &&
    emailRegex.test(vendors.value.email) &&
    vendors.value.plan.length > 0
  );
});

async function addVendor() {
  isDataSubmitting.value = true;
  const vendorExists = vendorState.value.some(
    (vendor) =>
      vendor.name === vendors.value.name && vendor.email === vendors.value.email
  );

  if (vendorExists) {
    toast.add({
      title: "Error",
      description: "Vendor with the same name and email already exists",
    });
    isDataSubmitting.value = false;
    return;
  }

  const response: { status: number } = await $fetch("/api/addVendors", {
    method: "POST",
    body: {
      vendor: vendors.value,
    },
  });

  if (response.status === 200) {
    toast.add({
      title: "Success",
      description: "Vendor Added Successfully !!",
      icon: "i-heroicons-check-circle",
    });
  } else {
    toast.add({
      title: "Error",
      description: "Some Errors Occured",
    });
  }
  isDataSubmitting.value = false;
  isAddVendorModalOpen.value = false;
}

checkIfUserExistsInVendors(
  fishermansState.value as Fisherman[],
  vendorState.value,
  data.value?.user?.email as string
);
</script>
