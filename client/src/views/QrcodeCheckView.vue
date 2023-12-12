<script setup>
import { ref } from 'vue'

const result = ref({})

const checkQrcodeToken = async () => {
  try {
    let queryString = window.location.search
    let urlParams = new URLSearchParams(queryString)
    let tokens = urlParams.get('token') ? urlParams.get('token') : ''

    const response = await fetch('/api/queue/token' + `?token=${tokens}`)
    const data = await response.json()

    result.value = data
  } catch (error) {
    console.error('Error fetching QR code token:', error)
  }
}

checkQrcodeToken()
</script>

<template>
  <main
    class="flex min-h-screen flex-col items-center justify-center bg-stone-300 lg:justify-start lg:py-10"
  >
    <div class="">
      <div class="text-4xl font-semibold lg:pb-5 lg:text-6xl">Queue Result</div>
      <div v-if="result.queue == null" class="text-3xl">Retry</div>
      <div v-if="result.queue != null" class="flex flex-col items-center gap-10 text-3xl">
        <div class="text-lg lg:text-2xl">Your queue number:</div>
        <div class="text-6xl">
          {{ result.queue.number }}
        </div>
        <div class="text-lg lg:text-xl">
          {{ new Date(result.queue.createAt).toLocaleString('ZH') }}
        </div>
      </div>
    </div>
  </main>
</template>
