<template>
    <div class="text-center text-sm text-gray-500 py-3">
        Last updated on {{ format(timestamp) }}
    </div>
</template>

<script setup>
defineProps({ timestamp: String })
function format(ts) {
    const d = new Date(ts)
    return d.toLocaleString([], { dateStyle: 'short', timeStyle: 'short' })
}
</script>