import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('../views/HomeView.vue')
    },
    {
      path: '/manage',
      name: 'manage',
      component: () => import('../views/ManageView.vue')
    },
    {
      path: '/qrcode',
      name: 'Qrcode',
      component: () => import('../views/QrcodeView.vue')
    },
    {
      path: '/qrcode/check',
      name: 'QRCodeCheck',
      component: () => import('../views/QrcodeCheckView.vue')
    }
  ]
})

export default router
