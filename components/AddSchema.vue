<template>
  <main>
    <from class="flex flex-col items-center justrify-center gap-4">
      <span>
        <label>Fish Name:</label>
        <UInput v-model="schema.Fish_name" type="text" />
      </span>
      <span>
        <label>Per Unit:</label>
        <UInput v-model="schema.Default_price.Per_Unit" type="number" />
      </span>
      <span>
        <label>Per Kg:</label>
        <UInput v-model="schema.Default_price.Per_Kg" type="number" />
      </span>
      <span>
        <label>Per Dozen:</label>
        <UInput v-model="schema.Default_price.Per_Dozen" type="number" />
      </span>
      <UButton
        :disabled="!isValid"
        :loading="isSubmitting"
        @click="setSchema($event)"
        >Submit</UButton
      >
    </from>
    <UNotifications />
  </main>
</template>
<script lang="ts" setup>
const emits = defineEmits(["close"]);
const isSubmitting = ref<boolean>(false);
const toast = useToast();
const schema = ref<Fishschema>({
  Fish_name: "",
  Default_price: {
    Per_Dozen: undefined,
    Per_Kg: undefined,
    Per_Unit: undefined,
  },
});

const isValid = computed(() => {
  return (
    schema.value.Fish_name.length > 0 &&
    (schema.value.Default_price.Per_Dozen !== undefined ||
      schema.value.Default_price.Per_Kg !== undefined ||
      schema.value.Default_price.Per_Unit !== undefined)
  );
});

async function setSchema(e: Event) {
  e.preventDefault();
  isSubmitting.value = true;
  const response = await $fetch("/api/AddFishSchema", {
    method: "POST",
    body: { fishSchema: schema.value },
  });

  if (response.status === 200) {
    toast.add({ title: "Sucess", description: "Added Schema!" });
  } else {
    toast.add({ title: "Error", description: "Failed to add schema." });
  }
  isSubmitting.value = false;
  emits("close");
}
</script>
