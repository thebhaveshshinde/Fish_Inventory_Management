<template>
    <main class="bg-white h-max py-10">
    <UCard class="bg-gray-800 mt-10 h-[90vh] relative">
        <UTable class="h-[80vh] text-white overflow-y-scroll" :columns="columns" :rows="fishSchema"  >
            <template #Actions-data="row">
                <div>
                    <button @click="" class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                        Edit
                    </button>
                    <button @click="" class="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded ml-2">
                        Delete
                    </button>
                </div>
            </template>
            </UTable>
    </UCard>
    </main>
</template>
<script lang="ts" setup>
import { collection } from "firebase/firestore";
import { useCollection, useFirestore } from "vuefire";

const columns = [
	{
		key: "Fish_name",
		label: "Names Of Fishes",
		class: "bg-gray-900 text-white sticky top-0 z-10",
	},
	{
		key: "Default_price.Per_Kg",
		label: "Per Kg",
		class: "bg-gray-900 text-white sticky top-0 z-10",
	},
	{
		key: "Default_price.Per_Dozen",
		label: "Per Dozen",
		class: "bg-gray-900 text-white sticky top-0 z-10",
	},
	{
		key: "Default_price.Per_Unit",
		label: "Per Dozen",
		class: "bg-gray-900 text-white sticky top-0 z-10",
	},
	{
		key: "Actions",
		label: "actions",
		class: "bg-gray-900 text-white sticky top-0 z-10",
	},
];

const db = useFirestore();

const FishschemaCollection = collection(db, "fish-schema");

const fishSchema = useCollection(FishschemaCollection).value;
</script>
