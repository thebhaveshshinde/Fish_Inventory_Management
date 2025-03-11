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
              transaction.dateoftransaction.toDate().toISOString().split("T")[0]
            }}
          </h4>
        </span>
      </div>
      <div class="flex items-center justify-between">
        <UButton
          class="text-center w-max"
          label="Request To Resolve"
          color="blue"
        />
        <UButton
          class="text-center w-max"
          label="Bill Details"
          color="orange"
        />
      </div>
    </div>
  </main>
</template>
<script lang="ts" setup>
const props = defineProps<{ transactions: Transaction[] }>();

const { transactions } = toRefs(props);
</script>
