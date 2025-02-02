<template>
    <main class="flex flex-col items-center justify-center h-screen">
        <h1 class="text-3xl text-center font-bold md:text-6xl">
          Fishery  Inventory Management
        </h1>
        <p class="text-lg md:text-2xl lg:text-3xl">
            By Hum Log
        </p>
    </main>
</template>
<script lang="ts" setup>

definePageMeta({
    isAlive:true,
    middleware: 'sidebase-auth'
})

</script>