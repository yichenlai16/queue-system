<script setup>
import { ref } from 'vue'
const products = ref(null)
const date = ref('2023-12-07')
const number = ref(2)
const inDateQueue = ref(null)
const getQueue = (date) => {
  fetch(
    '/api/queue?' +
      new URLSearchParams({
        date: date
      })
  )
    .then((response) => response.json())
    .then((data) => (inDateQueue.value = data.inDateQueue))
}

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
    .then((data) => (products.value = data))
}
</script>

<template>
  <main class="min-h-screen bg-gray-200">
    {{ products }}
    <button class="rounded-md bg-slate-300 text-3xl" @click="getQueue()">getQueue</button>

    <button class="rounded-md bg-slate-300 text-3xl" @click="postQueue(number)">postQueue</button>
    <input v-model="number" />
    <button class="rounded-md bg-slate-300 text-3xl" @click="getQueue(date)">getQueue(date)</button>
    <input v-model="date" />
    <ul class="text-3xl font-bold">
      <li>First</li>
      <li v-for="item in inDateQueue" :key="item.id">
        No.{{ item.number }} {{ item.status }} {{ item.date.split('T')[0] }}
      </li>
    </ul>
  </main>
</template>
