<template>
  <main>
    <form>
      <div class="flex flex-col gap-1 my-2 border border-gray-100 rounded-md">
        <span v-if="products.length > 0" class="flex px-2" v-for="product in products">
          <div class="flex items-center justify-between">
            <div class="flex items-center gap-2">
              <span class="text-sm font-medium text-gray-700 dark:text-gray-100">{{ product.name }}</span>
              <span class="text-sm text-gray-500 dark:text-gray-100">Price: {{ product.pricedecided }} x</span>
              <span class="text-sm text-gray-500 dark:text-gray-100">Quantity: {{ product.quantity }} =</span>
            </div>
            <div class="text-sm font-medium text-gray-700 dark:text-gray-100">
              {{ product.totalprice }}
            </div>
            <button @click="removeProduct(product.name)"
              class="mx-2 text-red-600 hover:text-red-800 focus:outline-none">
              ✖
            </button>
          </div>
        </span>
      </div>

      <div class="mb-4">
        <label for="name" class="block text-sm font-medium text-gray-700 dark:text-gray-100">Fish Name:</label>
        <select id="name" v-model="product.name" required
          class="block w-full px-3 py-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
          <option v-for="fish in fishSchema" :key="fish.id" :value="fish.Fish_name">
            {{ fish.Fish_name }}
          </option>
        </select>
      </div>
      <div class="mb-4">
        <label for="typeofquantity" class="block text-sm font-medium text-gray-700 dark:text-gray-100">Unit of 
          Measurement:</label>
        <select id="typeofquantity" v-model="product.typeofquantity"
          class="block w-full px-3 py-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
          <option value="Per_unit">Unit</option>
          <option value="Per_Kg">Kg</option>
          <option value="Per_Dozen">Dozen</option>
        </select>
      </div>
      <div class="mb-4">
        <label for="quantity" class="block text-sm font-medium text-gray-700 dark:text-gray-100">Quantity:</label>
        <input type="number" id="quantity" v-model="product.quantity" required
          class="block w-full px-3 py-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
      </div>

      <div class="mb-4">
        <label for="pricedecided" class="block text-sm font-medium text-gray-700 dark:text-gray-100">Price Decided:
          <p class="text-xs text-red-900">
            Default_price ({{
              fishSchema.find((sc) => sc.Fish_name === product.name)
                ?.Default_price[product.typeofquantity]
            }})
          </p>
        </label>
        <input type="number" id="pricedecided" v-model="product.pricedecided" required
          class="block w-full px-3 py-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
      </div>

      <!-- // buttons div  -->
      <div class="flex items-center justify-center gap-2">
        <button @click.prevent="addmore()" type="button"
          class="inline-flex justify-center w-5/12 px-4 py-2 mt-4 text-sm font-medium text-white bg-green-600 border border-transparent rounded-md shadow-sm hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500">
          Add More
        </button>
        <UButton :loading="isLoading" color="blue" :disabled="products?.length === 0" @click="addTansaction()"
          class="inline-flex justify-center w-5/12 px-4 py-2 mt-4 text-sm font-medium text-white bg-green-600 border border-transparent rounded-md shadow-sm hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500">
          Submit
        </UButton>
      </div>
    </form>
    <UNotifications />
  </main>
</template>
<script lang="ts" setup>
import { addDoc, collection, Timestamp } from "firebase/firestore";
import { useVendors } from "~/utils/composables/useVendors";

const { data } = useAuth();
const product = ref<Products>({
  name: "",
  quantity: 0,
  typeofquantity: "unit",
  pricedecided: 0,
  totalprice: 0,
});
const toast = useToast();
const products = ref<Products[]>([]);
const vendors = useVendors().value;
const vendor = ref<Vendors>();
const isLoading = ref(false);
const db = useFirestore();
vendor.value = vendors.find(
  (vendor) => vendor.email === data.value?.user?.email
);

const removeProduct = (pname: string) => {
  products.value = products.value.filter((product) => product.name !== pname);
};

const addmore = () => {
  product.value.totalprice =
    product.value.pricedecided * product.value.quantity;
  if (product.value.totalprice === 0) {
    toast.add({ title: "warning!", description: "kindly select Items first" });
  }
  products.value?.push(product.value);
  resetProduct();
};
const props = defineProps<{ fisherman: Fisherman; fishSchema: Fishschema[] }>();

const { fisherman, fishSchema } = toRefs(props);
const emit = defineEmits(["close"]);

const resetProduct = () => {
  product.value = {
    name: "",
    quantity: 0,
    typeofquantity: "unit",
    pricedecided: 0,
    totalprice: 0,
  };
};

async function addTansaction() {
  isLoading.value = true;
  const totalamount = products.value.reduce(
    (acc, product) => acc + product.totalprice,
    0
  );
  const transaction = {
    fishermanemail: fisherman.value.email,
    fishermanname: fisherman.value.name,
    vendorname: vendor.value?.name,
    vendoremail: vendor.value?.email,
    billstatus: "PENDING",
    totalamount: totalamount,
    products: products.value,
    dateoftransaction: Timestamp.fromDate(new Date()),
  };
  try {
    await addDoc(collection(db, "transactions"), transaction);
    toast.add({ title: "Success", description: "added Transaction" });
    products.value = [];
  } catch (err) {
    console.log(err);
    toast.add({ title: "Error", description: "not submitted kindly check!!" });
  }
  isLoading.value = false;
  emit("close");
}
</script>
