<template>
  <main class="w-full h-screen bg-white">
    <div class="flex flex-col justify-center gap-4 p-4 border-b-2 border-gray-400 pt-14">
      <div class="flex justify-center space-x-10">
        <div class="w-full p-6 bg-blue-100 rounded-lg shadow-lg card md:w-80">
          <h2 class="mb-4 text-sm font-semibold text-blue-800 md:text-2xl">
            Total Payable
          </h2>
          <p class="font-bold text-blue-900 text-smmd:text-3xl">
            ₹ {{ totalPayable }} /-
          </p>
        </div>
        <div class="w-full p-6 bg-green-100 rounded-lg shadow-lg card md:w-80">
          <h2 class="mb-4 font-semibold text-green-800 md:text-2xl">
            Total Paid
          </h2>
          <p class="text-sm font-bold text-green-900 md:text-3xl">
            ₹ {{ totalPaid }} /-
          </p>
        </div>
      </div>
      <div class="flex justify-center space-x-4 rounded-md tabs">
        <button :class="[
          'px-4 py-2 rounded-lg focus:outline-none',
          {
            'bg-blue-500 text-white': activeTab === 'PENDING',
            'bg-gray-200 text-gray-700': activeTab !== 'PENDING',
          },
        ]" @click="activeTab = 'PENDING'">
          Pending Bills
        </button>
        <button :class="[
          'px-4 py-2 rounded-lg focus:outline-none',
          {
            'bg-blue-500 text-white': activeTab === 'PAID',
            'bg-gray-200 text-gray-700': activeTab !== 'PAID',
          },
        ]" @click="activeTab = 'PAID'">
          Paid Bills
        </button>
      </div>
    </div>
    <div>
      <div class="h-[60vh]" v-if="activeTab === 'PENDING'">
        <PendingComponent :transactions="transactions.filter(
          (transaction) => transaction.billstatus === 'PENDING'
        )
          " />
      </div>

      <div class="h-[60vh]" v-if="activeTab === 'PAID'">
        <PaidComponent :transactions="transactions.filter(
          (transaction) => transaction.billstatus === 'PAID'
        )
          " />
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

const unsubscribe = onSnapshot(
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
  middleware: "sidebase-auth",
});
onBeforeUnmount(() => {
  unsubscribe();
})
</script>
