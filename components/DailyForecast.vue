<template>
    <div class="bg-white rounded-b-lg p-4">
        <h2 class="text-base font-semibold mb-4 text-gray-800">
            Next 5 days
        </h2>
        <div class="space-y-3">
            <div v-for="day in forecast" :key="day.date"
                class="flex justify-between items-center bg-gray-50 dark:bg-gray-800 px-4 py-3 rounded-lg shadow-sm transition-colors">
                <div class="flex items-center gap-3">
                    <img :src="`https://openweathermap.org/img/wn/${day.icon}@2x.png`" class="w-8 h-8"
                        :alt="day.description" />
                    <div>
                        <div class="font-medium text-gray-800 dark:text-gray-200">
                            {{ formatDate(day.date) }}
                        </div>
                        <div class="text-sm text-gray-500 dark:text-gray-400 capitalize">
                            {{ day.description }}
                        </div>
                    </div>
                </div>
                <div class="text-sm text-right text-gray-700 dark:text-gray-200">
                    <div>High: {{ Math.round(day.temp_max) }}°F</div>
                    <div>Low: {{ Math.round(day.temp_min) }}°F</div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
defineProps({ forecast: Array })

function formatDate(dateStr) {
    const dt = new Date(dateStr + 'T00:00:00')
    return dt.toLocaleDateString(undefined, {
        weekday: 'short',
        month: 'short',
        day: 'numeric'
    })
}
</script>
