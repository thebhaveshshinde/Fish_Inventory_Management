<template>
  <main class="w-full h-screen bg-white pt-20">
    <div class="flex justify-center space-x-4 rounded-md tabs">
      <button :class="[
        'px-4 py-2 rounded-lg focus:outline-none',
        {
          'bg-blue-500 text-white': activeTab === 'ALL',
          'bg-gray-200 text-gray-700': activeTab !== 'ALL',
        },
      ]" @click="activeTab = 'ALL'">
        <UIcon name="i-heroicons-view-list" class="w-6 h-6" />
        All Bills
      </button>
      <button :class="[
        'px-4 py-2 rounded-lg focus:outline-none',
        {
          'bg-blue-500 text-white': activeTab === 'REQUESTED',
          'bg-gray-200 text-gray-700': activeTab !== 'REQUESTED',
        },
      ]" @click="activeTab = 'REQUESTED'">
        <UIcon name="i-heroicons-bell" class="w-6 h-6" />
        Requested Bills
      </button>
    </div>
    <div v-if="activeTab === 'ALL'">
      <!-- All Bills Panel -->
      <AllTransaction :transactions="transactions" />
    </div>
    <div v-if="activeTab === 'REQUESTED'">
      <!-- Requested Bills Panel -->
      <RequestedBills
        :transactions="transactions.filter(transaction => transaction.isRequested && transaction.billstatus != 'PAID')" />
    </div>
  </main>

</template>
<script lang="ts" setup>
import { collection, onSnapshot, query, where } from "firebase/firestore";
const { data } = useAuth();
definePageMeta({
  middleware: "sidebase-auth",
  isalive: true
});
const transactions = ref<Transaction[]>([]);
const db = useFirestore();
const unsubscribe = onSnapshot(
  query(collection(db, "transactions"), where("fishermanemail", "==", data.value?.user?.email)),
  (snap) => {
    transactions.value = snap.docs.map((doc) => {
      return {
        id: doc.id,
        ...doc.data(),
      } as Transaction;
    });
  }
);
const activeTab = ref<string>('ALL');


onBeforeUnmount(() => {
  unsubscribe();
});
</script>
