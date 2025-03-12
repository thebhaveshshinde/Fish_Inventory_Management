<template>

    <main>
        <div class="flex flex-col gap-2">
            <p class="text-gray-500 dark:text-gray-300">Fisherman Name:</p>
            <h4 class="font-semibold text-gray-900 dark:text-gray-100">{{ transaction?.fishermanname }}</h4>
        </div>
        <div class="flex flex-col gap-2">
            <p class="text-gray-500 dark:text-gray-300">Amount:</p>
            <h4 class="font-semibold text-gray-900 dark:text-gray-100">
                {{ transaction?.totalamount?.toLocaleString('en-IN', { style: 'currency', currency: 'INR' }) }}
            </h4>
        </div>
        <div class="flex flex-col gap-2">
            <p class="text-gray-500 dark:text-gray-300">Date:</p>
            <h4 class="font-semibold text-gray-900 dark:text-gray-100">
                {{ transaction?.dateoftransaction?.toDate()?.toLocaleString('en-IN', {
                    year: 'numeric', month: 'numeric',
                    day: 'numeric'
                }) }}
            </h4>
        </div>
        <table class="mt-4 w-full">
            <thead>
                <tr class="border-b border-gray-300">
                    <th class="px-4 py-2 text-left">Product Name</th>
                    <th class="px-4 py-2 text-left">Price</th>
                    <th class="px-4 py-2 text-left">Quantity</th>
                    <th class="px-4 py-2 text-left">Total Price</th>
                </tr>
            </thead>
            <tbody>
                <tr class="border-b border-gray-300" v-for="product in transaction?.products" :key="product.name">
                    <td class="px-4 py-2">{{ product?.name }}</td>
                    <td class="px-4 py-2">{{ product?.pricedecided?.toLocaleString('en-IN', {
                        style: 'currency', currency:
                            'INR'
                    }) }}</td>
                    <td class="px-4 py-2">{{ product?.quantity }}</td>
                    <td class="px-4 py-2">{{ (product?.pricedecided * product?.quantity)?.toLocaleString('en-IN', {
                        style:
                            'currency', currency: 'INR'
                    }) }}</td>
                </tr>
            </tbody>
        </table>
    </main>
</template>
<script lang="ts" setup>
const props = defineProps<{
    transaction: Transaction
}>();

const { transaction } = toRefs(props);

</script>