<template>
    <main class="w-full h-full pt-20">
        <UCard class="bg-gray-800 text-white h-full p-4 mb-4">
            <UTable
                :rows="[
                    {
                        name: 'John Doe',
                        age: 45,
                        experience: '10 years',
                        location: 'Alaska',
                    },
                    {
                        name: 'Jane Smith',
                        age: 38,
                        experience: '8 years',
                        location: 'Maine',
                    },
                    {
                        name: 'Bob Johnson',
                        age: 50,
                        experience: '15 years',
                        location: 'Florida',
                    },
                    {
                        name: 'Alice Brown',
                        age: 29,
                        experience: '5 years',
                        location: 'California',
                    },
                ]"
            />
        </UCard>
    </main>
</template>
<script lang="ts" setup></script>
