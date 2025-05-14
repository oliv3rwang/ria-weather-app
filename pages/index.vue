<template>
    <div>
        <HeaderBar @toggleSearch="showSearch = !showSearch" />
        <CityTabs :selectedCity="city" @changeCity="changeCity" />
        <HourlyForecast :forecast="hourlyData" />
        <DailyForecast :forecast="dailyData" />
        <FooterBar :timestamp="lastUpdated" />
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useWeather } from '~/composables/useWeather'

const city = ref('Los Angeles')
const hourlyData = ref([])
const dailyData = ref([])
const lastUpdated = ref('')
const showSearch = ref(false)

const { getHourlyForecast, getDailyForecast } = useWeather()

async function fetchWeather() {
    hourlyData.value = await getHourlyForecast(city.value)
    dailyData.value = await getDailyForecast(city.value)
    lastUpdated.value = new Date().toISOString()
}

function changeCity(newCity) {
    city.value = newCity
    fetchWeather()
}

onMounted(fetchWeather)
</script>