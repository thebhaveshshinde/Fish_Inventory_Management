<template>

    <main class="w-full h-screen pt-10 bg-gray-100">
        <div class="flex justify-end p-4">
            <UButton @click="exportCSV()" color="green" class="px-4 py-2">Export CSV</UButton>
        </div>
        <UCard class="h-[90vh]">
            <div class="flex items-center gap-4p-4">
                <div class="flex items-center space-x-2">
                    <label class="block text-sm font-medium text-gray-700 dark:text-gray-200">Vendor:</label>
                    <select @change="getTransactions()" v-model="selectedVendor"
                        class="px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500 dark:bg-gray-700 dark:text-white dark:border-gray-600">
                        <option value="">All</option>
                        <option v-for="vendor in vendors" :key="vendor.id" :value="vendor.name">{{ vendor.name }}
                        </option>
                    </select>
                </div>

                <div class="flex items-center justify-center space-x-4 ">
                    <label class="block text-sm font-medium text-gray-700 dark:text-gray-200">Status:</label>
                    <select v-model="selectedStatus" @change="getTransactions()"
                        class="px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500 dark:bg-gray-700 dark:text-white dark:border-gray-600">
                        <option value="">All</option>
                        <option value="PENDING">PENDING</option>
                        <option value="PAID">PAID</option>
                    </select>
                </div>
            </div>

            <UTable class="h-[70vh] overflow-y-scroll" :rows="filteredTransactions" :columns="columns">
                <template #dateoftransaction-data="{ row }">
                    {{ new Date(row.dateoftransaction?.toDate()).toLocaleString() }}
                </template>
            </UTable>
        </UCard>
    </main>

</template>

<script setup lang="ts">
import { collection, getDocs } from "firebase/firestore";
import { definePageMeta } from "#imports";
import { useFirestore } from "vuefire";
import { useVendors } from "~/utils/composables/useVendors";
import { Timestamp } from "firebase/firestore";


const db = useFirestore()
const transactions = ref<Transaction[]>([])
const vendors = ref<Vendors[]>([])
vendors.value = useVendors().value
const selectedVendor = ref("")
const selectedStatus = ref("")
definePageMeta({
    middleware: "sidebase-auth",
    isalive: true
});



const columns = [
    { key: "vendorname", label: "Vendor Name", class: "bg-gray-900 text-white sticky top-0 z-10", sortable: true },
    { key: "vendoremail", label: "Vendor Email", class: "bg-gray-900 text-white sticky top-0 z-10 text-center", sortable: true },
    { key: "fishermanname", label: "Fisherman Name", class: "bg-gray-900 text-white sticky top-0 z-10", sortable: true },
    { key: "fishermanemail", label: "fisherman email", class: "bg-gray-900 text-white sticky top-0 z-10 text-center", sortable: true },
    { key: "totalamount", label: "Total Amount", class: "bg-gray-900 text-white sticky top-0 z-10 text-center", sortable: true },
    { key: "dateoftransaction", label: "Date of Transaction", class: "bg-gray-900 text-white sticky top-0 z-10 text-center", sortable: true },
    { key: "billstatus", label: "Bill Status", class: "bg-gray-900 text-white sticky top-0 z-10 text-center", sortable: true },
];


const getTransactions = async () => {
    const transactionsCollection = collection(db, "transactions");
    const transactionsSnapshot = await getDocs(transactionsCollection);
    const transactionsList = transactionsSnapshot.docs.map(doc => {
        return {
            id: doc.id,
            ...doc.data()
        } as Transaction
    });
    return transactionsList;
}
transactions.value = await getTransactions()


const filteredTransactions = computed(() => {
    return transactions.value.filter(transaction => {
        return (
            (!selectedVendor.value || transaction.vendorname === selectedVendor.value) &&
            (!selectedStatus.value || transaction.billstatus === selectedStatus.value)
        );
    });
});

const exportCSV = () => {
    const data = filteredTransactions.value.map(transaction => {
        const transactionData: any = {};
        columns.forEach(column => {
            transactionData[column.key] = transaction[column.key as keyof Transaction];
        });
        return transactionData;
    });
    const csvData = [
        columns.map(column => column.label).join(","),
        ...data.map(row => Object.keys(row).map(key => {
            if (key === "dateoftransaction") {
                return (row[key] as Timestamp).toDate().toISOString();
            }
            return row[key];
        }).join(","))
    ].join("\n");
    const blob = new Blob([csvData], { type: "text/csv;charset=utf-8;" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.setAttribute("download", "transactions.csv");
    link.style.visibility = "hidden";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}

</script>
