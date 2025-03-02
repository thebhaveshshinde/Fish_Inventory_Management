<template>
	<main>
		<form>
			<div class="space-y-4">
				<div>
					<label for="name" class="block text-sm font-medium text-gray-700 dark:text-gray-300">Name:</label>
					<input type="text" id="name" v-model="fisherman.name" required
						class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
				</div>

				<div>
					<label for="email" class="block text-sm font-medium text-gray-700 dark:text-gray-300">Email:</label>
					<input type="email" id="email" v-model="fisherman.email" required
						:class="{ 'border-red-500': !isEmailValid }"
						class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
					<p v-if="!isEmailValid" class="text-red-500 text-sm">Invalid email address</p>
				</div>

				<div>
					<label for="phoneno" class="block text-sm font-medium text-gray-700 dark:text-gray-300">Phone
						Number:</label>
					<input type="number" id="phoneno" v-model="fisherman.phoneno" required
						:class="{ 'border-red-500': !isPhoneValid }"
						class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
					<p v-if="!isPhoneValid" class="text-red-500 text-sm">Phone number must be 10 digits</p>
				</div>

				<div>
					<label for="address"
						class="block text-sm font-medium text-gray-700 dark:text-gray-300">Address:</label>
					<input type="text" id="address" v-model="fisherman.address" required
						class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
				</div>

				<div>
					<label for="locality"
						class="block text-sm font-medium text-gray-700 dark:text-gray-300">Locality:</label>
					<input type="text" id="locality" v-model="fisherman.locality" required
						class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
				</div>

				<div>
					<label for="upiid" class="block text-sm font-medium text-gray-700 dark:text-gray-300">UPI
						ID:</label>
					<input type="text" id="upiid" v-model="fisherman.upiid" required
						class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
				</div>

				<div>
					<label for="boatno" class="block text-sm font-medium text-gray-700 dark:text-gray-300">Boat
						Number:</label>
					<input type="text" id="boatno" v-model="fisherman.boatno" required
						class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
				</div>

				<div>
					<label for="accountno" class="block text-sm font-medium text-gray-700 dark:text-gray-300">Account
						Number:</label>
					<input type="number" id="accountno" v-model="fisherman.accountno" required
						class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
				</div>

				<div>
					<UButton :loading="isLoading" :disabled="isValid" type="submit"
						class="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
						@click="addUser($event)">Submit</UButton>
				</div>
			</div>
		</form>
		<UNotifications />

	</main>
</template>

<script setup lang="ts">
import { Timestamp } from "firebase/firestore";

const props = defineProps<{ vendor: Vendors }>();
const emits = defineEmits(["close"]);
const { vendor } = props;
const toast = useToast();
const isLoading = ref(false);
const fisherman = ref<Fisherman>({
	name: "",
	email: "",
	phoneno: "",
	address: "",
	locality: "",
	upiid: "",
	vendorsid: vendor?.id ?? "",
	dateOfJoining: Timestamp.fromDate(new Date()),
	boatno: "",
	accountno: "",
});

const isEmailValid = computed(() => {
	const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
	return emailPattern.test(fisherman.value.email);
});

const isPhoneValid = computed(() => {
	return /^\d{10}$/.test(fisherman.value.phoneno);
});

const isValid = computed(() => {
	return (
		fisherman.value.name.trim() !== "" &&
		isEmailValid.value &&
		isPhoneValid.value &&
		fisherman.value.address.trim() !== "" &&
		fisherman.value.locality.trim() !== "" &&
		fisherman.value.boatno.trim() !== "" &&
		fisherman.value.upiid.trim() !== ""
	);
});

async function addUser(e: Event) {
	e.preventDefault();
	isLoading.value = true;
	const response = await $fetch("/api/addFisherman", {
		method: "POST",
		body: {
			fisherman: fisherman.value,
		},
	});

	if (response.status === 200) {
		toast.add({
			title: "Success",
			description: "Vendor Added Successfully !!",
			icon: "i-heroicons-check-circle",
		});
	} else {
		toast.add({
			title: "Error",
			description: "Some Errors Occured",
		});
	}
	emits("close");
	isLoading.value = false;
}
</script>