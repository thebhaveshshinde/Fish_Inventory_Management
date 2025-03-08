<template>
  <main>
    <form>
      <div class="mb-4">
        <label for="name" class="block text-sm font-medium text-gray-700"
          >Product Name:</label
        >
        <select
          id="name"
          v-model="product.name"
          required
          class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
        >
          <option
            v-for="fish in fishSchema"
            :key="fish.id"
            :value="fish.Fish_name"
          >
            {{ fish.Fish_name }}
          </option>
        </select>
      </div>
      <div class="mb-4">
        <label
          for="typeofquantity"
          class="block text-sm font-medium text-gray-700"
          >Type of Quantity:</label
        >
        <select
          id="typeofquantity"
          v-model="product.typeofquantity"
          class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
        >
          <option value="Per_unit">Unit</option>
          <option value="Per_Kg">Kg</option>
          <option value="Per_Dozen">Dozen</option>
        </select>
      </div>
      <div class="mb-4">
        <label for="quantity" class="block text-sm font-medium text-gray-700"
          >Quantity:</label
        >
        <input
          type="number"
          id="quantity"
          v-model="product.quantity"
          required
          class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
        />
      </div>

      <div class="mb-4">
        <label
          for="pricedecided"
          class="block text-sm font-medium text-gray-700"
          >Price Decided:
          <p class="text-red-900 text-xs">
            Default_price ({{
              fishSchema.find((sc) => sc.Fish_name === product.name)
                ?.Default_price[product.typeofquantity]
            }})
          </p></label
        >
        <input
          type="number"
          id="pricedecided"
          v-model="product.pricedecided"
          required
          class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
        />
      </div>
      <div class="mb-4">
        <label for="totalprice" class="block text-sm font-medium text-gray-700"
          >Total Price:</label
        >
        <input
          readonly
          type="number"
          id="totalprice"
          v-model="product.totalprice"
          required
          class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
        />
      </div>
      <button
        type="submit"
        class="mt-4 w-full inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
      >
        Submit
      </button>
    </form>
  </main>
</template>
<script lang="ts" setup>
import { useVendors } from "~/utils/composables/useVendors";
const product = ref<Products>({
  name: "",
  quantity: 0,
  typeofquantity: "unit",
  pricedecided: 0,
  totalprice: 0,
});

const totalprice = computed<number>(() => {
  return product.value.quantity * product.value.pricedecided;
});

product.value.totalprice = totalprice.value;
const products = ref<Products[]>();
const props = defineProps<{ fisherman: Fisherman; fishSchema: Fishschema[] }>();

const { fisherman, fishSchema } = toRefs(props);
</script>
