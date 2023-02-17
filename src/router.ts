import { createRouter, createWebHashHistory } from 'vue-router'

const routes = [
  {
    name: 'notFound',
    path: '/:path(.*)+',
    redirect: {
      name: 'home'
    }
  },
  {
    name: 'home',
    path: '/home',
    component: () => import('@/view/home/index.vue'),
    meta: {
      title: '',
    }
  },
  {
    name: 'fund',
    path: '/fund',
    component: () => import('@/view/fund/index.vue'),
    meta: {
      title: '',
      showTabBar: true
    }
  },
  {
    name: 'weather',
    path: '/weather',
    component: () => import('@/view/weather/index.vue'),
    meta: {
      title: '天气',
      showTabBar: true
    }
  },
]

const router = createRouter({
  routes,
  history: createWebHashHistory()
})

router.beforeEach((to, from, next) => {
  const title = to?.meta?.title
  if (title) {
    document.title = title as string
  }
  next()
})

export default router
