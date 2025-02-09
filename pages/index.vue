<template>
    <main class="flex flex-col bg-gray-100 py-20 h-full">
        <div class="py-10 text-center ">
            <h1 class="text-3xl md:text-4xl lg:text-5xl text-gray-600">Fishery Management</h1>
            <h2 class="text-xl md:text-2xl lg:text-3xl text-gray-500">A CRM that makes it easy</h2>
        </div>
        <div class="flex flex-row justify-center space-x-4 ">
            <div class="grid grid-cols-3 gap-6 ">
                <div
                    class="bg-gray-600 w-24 cursor-pointer h-24 rounded-lg flex flex-col items-center justify-center text-white text-3xl font-bold shadow-md">
                    <span>5</span>
                    <span class="text-sm font-medium">Vendors</span>
                </div>
                <div
                    class="bg-red-600 w-24 h-24 cursor-pointer rounded-lg flex flex-col items-center justify-center text-white text-3xl font-bold shadow-md">
                    <span>10</span>
                    <span class="text-sm font-medium">Issues</span>
                </div>
                <div
                    class="bg-green-600 w-24 h-24 cursor-pointer rounded-lg flex flex-col items-center justify-center text-white text-3xl font-bold shadow-md">
                    <span>15</span>
                    <span class="text-sm font-medium">FisherMans</span>
                </div>
            </div>
        </div>
        <div class="flex flex-row justify-center space-x-4 mt-10">
            <UButton color="gray" size="xl" variant="solid">Add Vendors</UButton>
            <UButton color="teal" size="xl" variant="solid">Manage Users</UButton>
        </div>
    </main>
</template>
<script lang="ts" setup>

definePageMeta({
    isAlive: true,
    middlewares: 'sidebase-auth'
})

</script>