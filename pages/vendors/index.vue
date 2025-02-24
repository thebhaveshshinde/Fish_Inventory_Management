<template>
    <main class="flex flex-col h-screen overflow-y-scroll  pt-20">

        <div class="flex items-center justify-center space-x-2">
            <input type="text" placeholder="Search..."
                class="px-4 py-2 w-64 border rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500" />
            <button
                class="bg-teal-500 text-white px-4 py-2 rounded-md hover:bg-teal-600 focus:outline-none focus:ring-2 focus:ring-teal-500">
                <UIcon name="i-heroicons-plus" class="w-5 h-5" />
            </button>
        </div>
        <div class="flex flex-col items-center justify-center space-y-4 mt-4">
            <div class="grid grid-cols-1 gap-4 w-full max-w-md">
                <div class="bg-white shadow-md rounded-lg p-4 flex flex-col items-center">
                    <h3 class="text-xl font-semibold">Fisherman Name</h3>
                    <p class="text-gray-600">Date: 2023-10-01</p>
                    <p class="text-gray-600">Boat No: 12345</p>
                    <div class="flex space-x-4 mt-4">
                        <button class="bg-teal-500 text-white px-4 py-2 rounded-md hover:bg-teal-600">
                            <UIcon name="i-heroicons-phone" class="w-5 h-5" />
                        </button>
                        <button class="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600">
                            <UIcon name="i-heroicons-currency-rupee" class="w-5 h-5" />
                        </button>
                    </div>
                </div>
            </div>
        </div>


    </main>
</template>
<script lang="ts" setup>
definePageMeta({
    layout: "vendorslayout",
});
</script>
