import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/login',
    name: 'Login',
    component: () => import('@/views/Login.vue'),
    meta: { title: '登录', requiresAuth: false }
  },
  {
    path: '/',
    name: 'Layout',
    component: () => import('@/views/Layout.vue'),
    redirect: '/dashboard',
    meta: { title: '首页', requiresAuth: true },
    children: [
      {
        path: 'dashboard',
        name: 'Dashboard',
        component: () => import('@/views/Dashboard.vue'),
        meta: { title: '主监控', requiresAuth: true }
      },
      {
        path: 'task',
        name: 'Task',
        component: () => import('@/views/Task.vue'),
        meta: { title: '任务管理', requiresAuth: true }
      },
      {
        path: 'print',
        name: 'Print',
        component: () => import('@/views/Print.vue'),
        meta: { title: '用药指导打印', requiresAuth: true }
      },
      {
        path: 'log',
        name: 'Log',
        component: () => import('@/views/Log.vue'),
        meta: { title: '日志查询', requiresAuth: true }
      },
      {
        path: 'statistics',
        name: 'Statistics',
        component: () => import('@/views/Statistics.vue'),
        meta: { title: '工作量统计', requiresAuth: true }
      },
      {
        path: 'system',
        name: 'System',
        component: () => import('@/views/System.vue'),
        meta: { title: '系统管理', requiresAuth: true }
      }
    ]
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

// 路由守卫
router.beforeEach((to, from, next) => {
  // 设置页面标题
  document.title = to.meta.title ? `${to.meta.title} - 门诊预调配管理系统` : '门诊预调配管理系统'
  
  // 检查是否需要登录
  if (to.meta.requiresAuth) {
    const token = localStorage.getItem('token')
    if (!token) {
      next('/login')
      return
    }
  }
  
  next()
})

export default router
