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
                <UButton label="View Details" color="blue" class="text-center w-max"
                    @click="openDetailsModal(transaction)" />
            </div>
        </div>
    </div>
    <div v-else class="text-center text-gray-500">
        No bills found.
    </div>
    <dialog class="modal bg-black/60" :open="isBillDetailsModalOpen">
        <div class="modal-box">
            <div class="flex items-center justify-between mb-4">
                <h2 class="text-xl font-semibold">Detaild Bill</h2>
                <button @click="closeDetailModal()" class="text-gray-500 hover:text-gray-700">
                    <UIcon name="i-heroicons-x-mark" class="w-6 h-6" />
                </button>
            </div>
            <Details v-if="transactionToBePassed" :transaction="transactionToBePassed" />
        </div>
    </dialog>
</template>
<script lang="ts" setup>
const props = defineProps<{
    transactions: Transaction[]
}>();

const { transactions } = toRefs(props);
const isBillDetailsModalOpen = ref(false);
const transactionToBePassed = ref<Transaction>();

function closeDetailModal() {
    isBillDetailsModalOpen.value = false;
    transactionToBePassed.value = undefined;
}
function openDetailsModal(transaction: Transaction) {
    transactionToBePassed.value = transaction;
    isBillDetailsModalOpen.value = true;

}


</script>