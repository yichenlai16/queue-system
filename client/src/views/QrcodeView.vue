<script setup>
import { ref } from 'vue'
import QrcodeVue from 'qrcode.vue'

const websockerServerStatus = ref(false)
const token = ref('')
const hostUrl = ref(window.location.href.split(window.location.host)[0] + window.location.host)

function qrcodeInit() {
  fetch('/api/queue/token')
}

function connect() {
  let socket = new WebSocket(`ws://${window.location.host}/api/queue/token`)

  socket.onopen = function (event) {
    websockerServerStatus.value = true
    console.log(event)
    qrcodeInit()
  }

  socket.onmessage = function (event) {
    const dataJson = JSON.parse(event.data)
    token.value = dataJson.msg
  }

  socket.onclose = function (e) {
    websockerServerStatus.value = false
    console.log('Socket is closed. Reconnect will be attempted in 3 second.', e.reason)
    setTimeout(function () {
      connect()
    }, 3000)
  }

  socket.onerror = function (err) {
    websockerServerStatus.value = false
    console.error('Socket encountered error: ', err.message, 'Closing socket')
    socket.close()
  }
}
connect()
</script>

<template>
  <main class="flex min-h-screen flex-col items-center justify-center bg-stone-300">
    <div class="flex -translate-y-[240px] transform flex-col items-center justify-center">
      <div class="text-6xl">Scan to queue up!</div>
      <div class="text-2xl">Websocket Server Status: {{ websockerServerStatus }}</div>
    </div>

    <div class="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 transform">
      <router-link :to="{ path: '/qrcode/check', query: { token: token } }">
        <qrcode-vue
          v-if="websockerServerStatus"
          :value="hostUrl + '/qrcode/check?token=' + token"
          :size="300"
        />
      </router-link>
    </div>
  </main>
</template>
