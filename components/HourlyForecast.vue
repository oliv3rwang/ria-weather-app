<template>
    <div class="bg-white p-4">
        <h2 class="text-base font-semibold mb-4 text-gray-800">
            Upcoming Weather (3-Hour Intervals)
        </h2>

        <div class="overflow-x-auto flex justify-center pb-4">
            <div class="flex gap-4 px-2">
                <div v-for="hour in forecast" :key="hour.dt"
                    class="flex-shrink-0 flex flex-col items-center bg-gray-50 px-3 py-2 rounded-lg shadow-sm min-w-[64px]">
                    <span class="text-base font-medium text-gray-800">
                        {{ Math.round(hour.temp) }}°F
                    </span>
                    <span class="text-xs text-blue-500">
                        {{ Math.round(hour.pop * 100) }}%
                    </span>
                    <img :src="`https://openweathermap.org/img/wn/${hour.icon}@2x.png`" :alt="hour.weather"
                        class="w-10 h-10 my-1" />
                    <span class="text-xs text-gray-600">
                        {{ formatHour(hour.dt_txt) }}
                    </span>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
defineProps({ forecast: Array })

function formatHour(dt_txt) {
    const date = new Date(dt_txt + ' UTC')
    return date.toLocaleTimeString(undefined, {
        hour: 'numeric',
        hour12: true
    })
}
</script>
