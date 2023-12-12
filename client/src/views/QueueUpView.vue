<script setup>
import { ref } from 'vue'
const date = ref()
const number = ref(null)
const result = ref({})

;(function () {
  date.value = new Date().toISOString().split('T')[0]
})()

const postQueue = (number) => {
  fetch('/api/queue?', {
    method: 'POST',
    body: JSON.stringify({
      number: number
    }),
    headers: {
      'Content-Type': 'application/json; charset=utf-8'
    }
  })
    .then((response) => response.json())
    .then((data) => (result.value = data))
}
</script>

<template>
  <main class="min-h-screen bg-gray-200">
    <div class="text-3xl">Date: {{ date }}</div>
    <div>
      <input v-model="number" />

      <button class="bg-green-200 p-2 text-3xl" @click="postQueue(number)">取號</button>
    </div>
    <div>
      {{ result }}
    </div>
  </main>
</template>
