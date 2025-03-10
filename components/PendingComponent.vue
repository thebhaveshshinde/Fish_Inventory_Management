<template>
  <main class="h-full overflow-y-scroll">
    {{ transactions }}
  </main>
</template>
<script lang="ts" setup>
const props = defineProps<{ transactions: Transaction[] }>();

const { transactions } = toRefs(props);
</script>
