<template>
  <main class="w-full h-screen bg-white">
    <div class="flex justify-around p-4 space-x-4">
      <div class="card bg-blue-100 p-6 rounded-lg shadow-lg w-full md:w-1/3">
        <h2 class="text-sm md:text-2xl font-semibold mb-4 text-blue-800">
          Total Payable
        </h2>
        <p class="text-smmd:text-3xl font-bold text-blue-900">
          ₹ {{ totalPayable }}
        </p>
      </div>
      <div class="card bg-green-100 p-6 rounded-lg shadow-lg w-full md:w-1/3">
        <h2 class="md:text-2xl font-semibold mb-4 text-green-800">
          Total Paid
        </h2>
        <p class="text-sm md:text-3xl font-bold text-green-900">
          {{ totalPaid }}
        </p>
      </div>
    </div>

    <div>
      <div
        class="tabs flex justify-center border-b-2 border-gray-300 rounded-md space-x-4 mb-4"
      >
        <button
          :class="[
            'px-4 py-2 rounded-t-lg focus:outline-none',
            {
              'bg-blue-500 text-white': activeTab === 'PENDING',
              'bg-gray-200 text-gray-700': activeTab !== 'PENDING',
            },
          ]"
          @click="activeTab = 'PENDING'"
        >
          Pending Bills
        </button>
        <button
          :class="[
            'px-4 py-2 rounded-t-lg focus:outline-none',
            {
              'bg-blue-500 text-white': activeTab === 'PAID',
              'bg-gray-200 text-gray-700': activeTab !== 'PAID',
            },
          ]"
          @click="activeTab = 'PAID'"
        >
          Paid Bills
        </button>
      </div>

      <div class="h-[60vh]" v-if="activeTab === 'PENDING'">
        <PendingComponent
          :transactions="
            transactions.filter(
              (transaction) => transaction.billstatus === 'PENDING'
            )
          "
        />
      </div>

      <div class="h-[60vh]" v-if="activeTab === 'PAID'">
        <PaidComponent
          :transactions="
            transactions.filter(
              (transaction) => transaction.billstatus === 'PAID'
            )
          "
        />
      </div>
    </div>
  </main>
</template>

<script lang="ts" setup>
import { definePageMeta } from "#imports";
import { collection, onSnapshot, query, where } from "firebase/firestore";
import { useFirestore } from "vuefire";

const { data } = useAuth();
const transactions = ref<Transaction[]>([]);
const activeTab = ref("PENDING");
const db = useFirestore();

onSnapshot(
  query(
    collection(db, "transactions"),
    where("vendoremail", "==", data.value?.user?.email)
  ),
  (snap) => {
    transactions.value = snap.docs.map((doc) => {
      return {
        id: doc.id,
        ...doc.data(),
      } as Transaction;
    });
  }
);

const totalPayable = computed(() => {
  return convertToIndianFormat(
    transactions.value.reduce((total, trans) => {
      return total + (trans.billstatus === "PENDING" ? trans.totalamount : 0);
    }, 0)
  );
});

const totalPaid = computed(() => {
  return convertToIndianFormat(
    transactions.value.reduce((total, trans) => {
      return total + (trans.billstatus === "PAID" ? trans.totalamount : 0);
    }, 0)
  );
});

definePageMeta({
  layout: "vendorslayout",
});
</script>
