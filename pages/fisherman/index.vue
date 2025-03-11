<template>
  <main class="w-full h-full pt-20">
    <UCard class="h-full p-4 mb-4 text-white bg-gray-800">
      <h4>Hii {{ data?.user?.name }}</h4>
    </UCard>
  </main>
</template>
<script lang="ts" setup>
const { data } = useAuth();
definePageMeta({
  middleware: "sidebase-auth",
});
</script>
