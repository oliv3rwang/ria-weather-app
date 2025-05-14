<template>
    <div class="flex justify-center bg-white border-b shadow-sm py-2">
        <button v-for="city in cities" :key="city" @click="$emit('changeCity', city)" type="button" :class="[
            'font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 focus:outline-none focus:ring-4 transition-colors duration-150 cursor-pointer',
            selectedCity === city
                ? 'text-white bg-blue-600 hover:bg-blue-800 focus:ring-blue-300'
                : 'text-gray-700 bg-white border border-gray-200 hover:bg-gray-100 focus:ring-gray-300'
        ]">
            {{ city }}
        </button>
    </div>
</template>

<script setup>
defineProps({ selectedCity: String })
const cities = ['Rio de Janeiro', 'Beijing', 'Los Angeles']
</script>
