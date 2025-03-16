<template>
    <main class="w-full h-screen pt-20 bg-gray-100">
        <UCard class="bg-white dark:bg-gray-800 h-[90vh] overflow-y-scroll">
            <UTable :columns="columns" :rows="vendors">
                <template #actions-data="{ row }">
                    <div class="flex items-center justify-between gap-2">
                        <button @click="openDeleteModal(row.id)"
                            class="px-4 py-2 font-bold text-white bg-red-500 rounded hover:bg-red-700">
                            Delete
                        </button>
                        <button @click="openRenewModal(row.id)"
                            class="px-4 py-2 font-bold text-white bg-green-500 rounded hover:bg-green-700">
                            Renew
                        </button>
                    </div>
                </template>
                <template #dateOfJoining-data="{ row }">

                    <div v-if="row.dateOfJoining">
                        {{ new Date(row?.dateOfJoining.seconds * 1000).toLocaleDateString() }}
                    </div>
                </template>
                <template #dateOfLastRenewal-data="{ row }">
                    <div>
                        {{ row.dateOfLastRenewal ? new Date(row?.dateOfLastRenewal.seconds * 1000).toLocaleString() :
                            "Not Renewed" }}
                    </div>
                </template>
            </UTable>
        </UCard>
        <dialog class="modal bg-black/60" :open="isConfirmDialogOpen">
            <div class="modal-box">
                <div class="flex items-center justify-between mb-4">
                    <h2 class="text-xl font-semibold">Confirm Delete</h2>
                    <button @click="isConfirmDialogOpen = false" class="text-gray-500 hover:text-gray-700">
                        <UIcon name="i-heroicons-x-mark" class="w-6 h-6" />
                    </button>
                </div>
                <p>Are you sure you want to delete this vendor?</p>
                <div class="flex justify-end mt-4">
                    <UButton :loading="isDeleting" @click="confirmDelete()"
                        class="px-4 py-2 font-bold text-white bg-red-500 rounded hover:bg-red-700">
                        Confirm
                    </UButton>
                    <button @click="isConfirmDialogOpen = false"
                        class="px-4 py-2 ml-2 font-bold text-white bg-gray-500 rounded hover:bg-gray-700">
                        Cancel
                    </button>
                </div>
            </div>
        </dialog>
        <dialog class="modal bg-black/60" :open="isRenewModalOpen">
            <div class="modal-box">
                <div class="flex items-center justify-between mb-4">
                    <h2 class="text-xl font-semibold">Confirm Renew</h2>
                    <button @click="isRenewModalOpen = false" class="text-gray-500 hover:text-gray-700">
                        <UIcon name="i-heroicons-x-mark" class="w-6 h-6" />
                    </button>
                </div>
                <form @submit.prevent="confirmRenew()">
                    <div class="space-y-4">
                        <div>
                            <label for="plan" class="block text-sm font-medium text-gray-700">Select Plan</label>
                            <select v-model="selectedPlan" id="plan" name="plan"
                                class="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500">
                                <option value="monthly">Monthly Plan</option>
                                <option value="3months">3 Months Plan</option>
                                <option value="yearly">Yearly Plan</option>
                            </select>
                        </div>
                        <div>
                            <UButton type="submit" :loading="isDeleting"
                                class="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-500 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500">
                                Renew
                            </UButton>
                        </div>
                    </div>
                </form>
            </div>
        </dialog>
    </main>
    <UNotifications />
</template>
<script lang="ts" setup>
import { collection, getDocs, deleteDoc, doc, Timestamp, updateDoc } from "firebase/firestore";
import { ref } from "vue";
import { useFirestore } from "vuefire";
const isConfirmDialogOpen = ref(false);
const isDeleting = ref(false);
const vendorsidToBeDeleted = ref("")
const toast = useToast();
const isRenewModalOpen = ref(false);
const vendorsidToBeRenewed = ref("")
const selectedPlan = ref("")

function openRenewModal(vendorId: string) {
    // Logic to open the confirmation dialog
    isRenewModalOpen.value = true;
    vendorsidToBeRenewed.value = vendorId
    // Optionally store vendorId to be used when confirming deletion
}

function confirmRenew() {
    // Logic to delete vendor
    isDeleting.value = true;
    // After deletion logic
    const vendorsRef = collection(db, "vendors");
    const vendorDocRef = doc(vendorsRef, vendorsidToBeRenewed.value);
    updateDoc(vendorDocRef, {
        plan: selectedPlan.value,
        dateOfLastRenewal: Timestamp.fromDate(new Date())
    }).then(() => {
        toast.add({
            title: "Success",
            description: "Vendor renewed successfully",
            icon: "i-heroicons-check-circle",
        });
    }).catch(err => {
        toast.add({
            title: "Error",
            description: "Error renewing vendor: " + err.message,
            icon: "i-heroicons-x-circle",
        })
    })
    fetchVendors();
    isRenewModalOpen.value = false;
    isDeleting.value = false;
    vendorsidToBeRenewed.value = ""
}

function openDeleteModal(vendorId: string) {
    // Logic to open the confirmation dialog
    isConfirmDialogOpen.value = true;
    vendorsidToBeDeleted.value = vendorId
    // Optionally store vendorId to be used when confirming deletion
}

function confirmDelete() {
    // Logic to delete vendor
    isDeleting.value = true;
    // After deletion logic
    const vendorsRef = collection(db, "vendors");
    const vendorDocRef = doc(vendorsRef, vendorsidToBeDeleted.value);
    deleteDoc(vendorDocRef).then(() => {
        toast.add({
            title: "Success",
            description: "Vendor deleted successfully",
            icon: "i-heroicons-check-circle",
        });
    }).catch(err => {
        toast.add({
            title: "Error",
            description: "Error deleting vendor: " + err.message,
            icon: "i-heroicons-x-circle",
        })
    })
    fetchVendors();
    isConfirmDialogOpen.value = false;
    isDeleting.value = false;
    vendorsidToBeDeleted.value = ""
}

const db = useFirestore();
const vendors = ref<Vendors[]>([]);
const columns = [
    { key: "id", label: "ID", class: "bg-gray-900 text-white sticky top-0 z-10", sortable: true },
    { key: "name", label: "Name", class: "bg-gray-900 text-white sticky top-0 z-10", sortable: true },
    { key: "email", label: "Email", class: "bg-gray-900 text-white sticky top-0 z-10 text-center", sortable: true },
    { key: "phone", label: "Phone", class: "bg-gray-900 text-white sticky top-0 z-10 text-center", sortable: true },
    { key: "address", label: "Address", class: "bg-gray-900 text-white sticky top-0 z-10", sortable: true },
    { key: "locality", label: "Locality", class: "bg-gray-900 text-white sticky top-0 z-10 text-center", sortable: true },
    { key: "plan", label: "Plan", class: "bg-gray-900 text-white sticky top-0 z-10 text-center", sortable: true },
    { key: "dateOfJoining", label: "Date Of Joining", class: "bg-gray-900 text-white sticky top-0 z-10 text-center", sortable: true },
    { key: "dateOfLastRenewal", label: "Date Of Last Renewal", class: "bg-gray-900 text-white sticky top-0 z-10 text-center", sortable: true },
    { key: "actions", label: "Actions", class: "bg-gray-900 text-white sticky top-0 z-10 text-center", sortable: false },
];
async function fetchVendors() {
    const vendorsCollection = collection(db, "vendors");
    const querySnapshot = await getDocs(vendorsCollection);
    vendors.value = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
    })) as Vendors[];
}

fetchVendors();

</script>