import { createRouter, createWebHashHistory } from 'vue-router'
import { getCookie } from '@/utils'
import { useMessage } from '@/utils/useMessage'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'

NProgress.configure({
  easing: 'ease',
  speed: 500,
  showSpinner: true,
  trickleSpeed: 200,
  minimum: 0.3
})

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
      title: '',
      isNeedLogin: false,
    }
  },
  // {
  //   name: 'test',
  //   path: '/test',
  //   component: () => import('@/view/test/index.vue'),
  //   meta: {
  //     title: '测试',
  //     isNeedLogin: false,
  //   }
  // },
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
      title: '',
      isNeedLogin: true,
      showTabBar: true
    }
  },
  {
    name: 'weather',
    path: '/weather',
    component: () => import('@/view/weather/index.vue'),
    meta: {
      title: '',
      isNeedLogin: true,
      showTabBar: true
    }
  },
  {
    name: 'weather-amap',
    path: '/weather/amap',
    component: () => import('@/view/weather/amap.vue'),
    meta: {
      title: '',
      isNeedLogin: true,
      showTabBar: true
    }
  },
  {
    name: 'oil',
    path: '/oil',
    component: () => import('@/view/oil/index.vue'),
    meta: {
      title: '',
      isNeedLogin: true,
      showTabBar: true
    }
  },
  {
    name: 'oilTool',
    path: '/oilTool',
    component: () => import('@/view/oilTool/index.vue'),
    meta: {
      title: '',
      isNeedLogin: true,
      showTabBar: true
    }
  },
  {
    name: 'juhe',
    path: '/juhe',
    component: () => import('@/view/juhe/index.vue'),
    meta: {
      title: '',
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
  },
]

const router = createRouter({
  routes,
  history: createWebHashHistory()
})

router.beforeEach((to, from, next) => {
  const title = to?.meta?.title
  const isLogin = getCookie('isLogin')
  const { showWarningMsg } = useMessage()
  NProgress.start()
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

router.afterEach(() => {
  NProgress.done()
})

export default router
