import { createRouter, createWebHashHistory } from 'vue-router'
import { getCookie } from '@/utils'
import { useMessage } from '@/utils/useMessage'

const routes = [
  {
    name: 'notFound',
    path: '/:path(.*)+',
    redirect: {
      name: 'login'
    }
  },
  {
    name: 'login',
    path: '/login',
    component: () => import('@/view/login/index.vue'),
    meta: {
      title: '登录',
      isNeedLogin: false,
    }
  },
  {
    name: 'home',
    path: '/home',
    component: () => import('@/view/home/index.vue'),
    meta: {
      title: '',
      isNeedLogin: true,
    }
  },
  {
    name: 'fund',
    path: '/fund',
    component: () => import('@/view/fund/index.vue'),
    meta: {
      title: '基金',
      isNeedLogin: true,
      showTabBar: true
    }
  },
  {
    name: 'weather',
    path: '/weather',
    component: () => import('@/view/weather/index.vue'),
    meta: {
      title: '天气',
      isNeedLogin: true,
      showTabBar: true
    }
  },
  {
    name: 'oil',
    path: '/oil',
    component: () => import('@/view/oil/index.vue'),
    meta: {
      title: '油价',
      isNeedLogin: true,
      showTabBar: true
    }
  },
  {
    name: 'juhe',
    path: '/juhe',
    component: () => import('@/view/juhe/index.vue'),
    meta: {
      title: '聚合',
      isNeedLogin: true,
      showTabBar: true
    }
  },
  {
    name: 'amap',
    path: '/amap',
    component: () => import('@/components/aMap/index.vue'),
    meta: {
      isNeedLogin: true
    }
  }
]

const router = createRouter({
  routes,
  history: createWebHashHistory()
})

router.beforeEach((to, from, next) => {
  const title = to?.meta?.title
  const isLogin = getCookie('isLogin')
  const { showWarningMsg } = useMessage()
  if (title) {
    document.title = title as string
  }
  if (to.meta.isNeedLogin) {
    if (isLogin) {
      next()
    } else {
      if (to.path === '/') {
        next()
      } else {
        showWarningMsg('请先登录！', 2000)
        next('/login')
      }
    }
  } else {
    next()
  }
})

export default router
