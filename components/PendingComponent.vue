<template>
  <main class="h-full flex flex-wrap p-4 gap-4 overflow-y-scroll bg-gray-50">
    <div
      class="w-full md:w-1/3 flex flex-col rounded-lg p-6 shadow-lg bg-white"
      v-for="transaction in transactions"
      :key="transaction.id"
    >
      <div class="flex justify-between items-center mb-4">
        <span class="flex flex-col">
          <p class="text-gray-500">Name:</p>
          <h4 class="text-gray-900 font-semibold">
            {{ transaction.fishermanname }}
          </h4>
        </span>
        <span class="flex flex-col">
          <p class="text-gray-500">Date:</p>
          <h4 class="text-gray-900 font-semibold">
            {{
              transaction.dateoftransaction.toDate().toISOString().split("T")[0]
            }}
          </h4>
        </span>
      </div>
      <div class="flex justify-between items-center mb-4">
        <span class="flex flex-col">
          <p class="text-gray-500">Amount:</p>
          <h4 class="text-gray-900 font-semibold">
            ₹ {{ convertToIndianFormat(transaction.totalamount) }}
          </h4>
        </span>
      </div>
      <UButton
        class="w-max text-center"
        label="Request To Resolve"
        color="blue"
      />
    </div>
  </main>
</template>
<script lang="ts" setup>
const props = defineProps<{ transactions: Transaction[] }>();

const { transactions } = toRefs(props);
</script>
