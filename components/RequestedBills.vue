<template>
    <div v-if="transactions.length > 0" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <div v-for="transaction in transactions" :key="transaction.id" class="bg-white rounded-lg shadow-lg p-4">
            <div class="flex items-center justify-between mb-4">
                <h4 class="text-lg font-semibold text-gray-900">
                    {{ transaction.fishermanname }}
                </h4>
                <p class="text-sm text-gray-500">
                    ₹ {{ transaction.totalamount }}
                </p>
            </div>
            <p class="text-sm text-gray-500">
                {{ transaction.dateoftransaction?.toDate().toLocaleString() }}
            </p>
            <div class="flex items-center justify-end mt-4">
                <UButton label="Settle Bill" color="green" class="text-center w-max"
                    @click="openSettleModal(transaction)" />
            </div>
        </div>
    </div>
    <div v-else class="text-center text-gray-500">
        No bills found.
    </div>
    <dialog :open="isSettleModalOpen" class="modal">
        <div class="modal-box">
            <p class="mb-4">
                Do you really want to settle the bill with total amount ₹
                {{ transactionToBePassed?.totalamount }} for
                {{ transactionToBePassed?.fishermanname }}?
            </p>
            <div class="modal-action">
                <button class="btn btn-error" @click="isSettleModalOpen = false">
                    No
                </button>
                <button class="btn btn-success" :class="{ 'loading': isLoading }" @click="confirmSettle()"
                    :disabled="isLoading">
                    Yes
                </button>
            </div>
        </div>
    </dialog>
</template>

<script lang="ts" setup>
import { useFirestore } from 'vuefire';
import { doc, updateDoc, collection } from 'firebase/firestore';
const db = useFirestore();
const props = defineProps<{
    transactions: Transaction[];
}>();

const isLoading = ref(false);
const { transactions } = toRefs(props);
const isSettleModalOpen = ref(false);
const transactionToBePassed = ref<Transaction | null>(null);

function openSettleModal(transaction: Transaction) {
    transactionToBePassed.value = transaction;
    isSettleModalOpen.value = true;
}

function confirmSettle() {
    isLoading.value = true;
    if (transactionToBePassed.value) {
        updateDoc(doc(collection(db, 'transactions'), transactionToBePassed.value.id), {
            billstatus: 'PAID',
        });
    }

    isSettleModalOpen.value = false;
    isLoading.value = false;
    transactionToBePassed.value = null;
}
</script>
