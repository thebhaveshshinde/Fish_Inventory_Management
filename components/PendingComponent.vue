<template>
  <main
    class="flex flex-wrap items-center justify-center h-full gap-4 p-4 overflow-y-scroll bg-gray-50"
  >
    <div
      class="flex flex-col w-full p-6 bg-white rounded-lg shadow-lg md:w-96"
      v-for="transaction in transactions"
      :key="transaction.id"
    >
      <div class="flex items-center justify-between mb-4">
        <span class="flex items-center gap-2">
          <p class="text-gray-500">Name:</p>
          <h4 class="font-semibold text-gray-900">
            {{ transaction.fishermanname }}
          </h4>
        </span>
      </div>
      <div class="flex items-center justify-between mb-4">
        <span class="flex flex-col">
          <p class="text-gray-500">Amount:</p>
          <h4 class="font-semibold text-gray-900">
            ₹ {{ convertToIndianFormat(transaction.totalamount) }}
          </h4>
        </span>
        <span class="flex flex-col">
          <p class="text-gray-500">Date:</p>
          <h4 class="font-semibold text-gray-900">
            {{
              transaction?.dateoftransaction
                ?.toDate()
                ?.toISOString()
                ?.split("T")[0]
            }}
          </h4>
        </span>
      </div>
      <div class="flex items-center justify-between">
        <UButton
          :disabled="transaction.isRequested"
          class="text-center w-max"
          :label="transaction.isRequested ? 'Requested' : 'Request To Resolve'"
          color="blue"
          @click="openRequestModal(transaction as Transaction)"
        />
        <UButton
          class="text-center w-max"
          label="Bill Details"
          color="orange"
          @click="isBillDetailsModalOpen = true"
        />
      </div>
    </div>
    <UNotifications />
  </main>
  <dialog :open="isRequestModalOpen" class="modal">
    <div class="modal-box">
      <p class="mb-4">
        Do you really want to request the bill with amount ₹
        {{
          convertToIndianFormat(transactionToBePassed?.totalamount as number)
        }}

        to resolve dated on
        {{
          transactionToBePassed
            ? transactionToBePassed.dateoftransaction
                .toDate()
                .toISOString()
                .split("T")[0]
            : ""
        }}?
      </p>
      <div class="modal-action">
        <button class="btn btn-error" @click="isRequestModalOpen = false">
          No
        </button>
        <button class="btn btn-success" @click="confirmRequest">Yes</button>
      </div>
    </div>
  </dialog>
  <dialog class="modal bg-black/60" :open="isBillDetailsModalOpen">
    <div class="modal-box">
      <div class="flex items-center justify-between mb-4">
        <h2 class="text-xl font-semibold">Detaild Bill</h2>
        <button
          @click="isBillDetailsModalOpen = false"
          class="text-gray-500 hover:text-gray-700"
        >
          <UIcon name="i-heroicons-x-mark" class="w-6 h-6" />
        </button>
      </div>
      <div class="text-white">hiii</div>
    </div>
  </dialog>
</template>
<script lang="ts" setup>
import { collection, doc, updateDoc } from "firebase/firestore";
import { useFirestore } from "vuefire";
const props = defineProps<{ transactions: Transaction[] }>();
const toast = useToast();

const { transactions } = toRefs(props);
const transactionToBePassed = ref<Transaction>();
const isRequestModalOpen = ref(false);
const isBillDetailsModalOpen = ref(false);

const db = useFirestore();

function openRequestModal(transaction: Transaction) {
  transactionToBePassed.value = transaction;
  isRequestModalOpen.value = true;
}

function confirmRequest() {
  if (transactionToBePassed.value) {
    const transactionRef = collection(db, "transactions");
    updateDoc(doc(transactionRef, transactionToBePassed.value.id), {
      isRequested: true,
    })
      .then(() => {
        isRequestModalOpen.value = false;
        toast.add({
          title: "success!!",
          description: "Successfully Requested ",
        });
        transactionToBePassed.value = undefined;
      })
      .catch((error) => {
        toast.add({
          title: "Error!!",
          description: "Error Occured!!",
        });
        transactionToBePassed.value = undefined;
      });
  }
}
</script>
