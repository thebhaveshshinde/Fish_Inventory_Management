<template>
    <main class="flex flex-col items-center justify-center h-screen bg-gray-100 text-gray-900">
        <h1 class="text-3xl md:text-4xl font-semibold mb-4">Sorry!</h1>
        <p class="text-xl md:text-2xl">
            Your subscription has expired. Kindly contact <span class="font-bold">@admin</span>
        </p>
    </main>
</template>

<script setup lang="ts">
definePageMeta({
    middleware: "sidebase-auth",
    layout: "fishermanlayout",
});
</script>
