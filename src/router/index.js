import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '@/layout/index'
import Layout1 from '@/layout/home.vue'

/**
 * Note: sub-menu only appear when route children.length >= 1
 * Detail see: https://panjiachen.github.io/vue-element-admin-site/guide/essentials/router-and-nav.html
 *
 * hidden: true                   if set true, item will not show in the sidebar(default is false)
 * alwaysShow: true               if set true, will always show the root menu
 *                                if not set alwaysShow, when item has more than one children route,
 *                                it will becomes nested mode, otherwise not show the root menu
 * redirect: noRedirect           if set noRedirect will no redirect in the breadcrumb
 * name:'router-name'             the name is used by <keep-alive> (must set!!!)
 * meta : {
    roles: ['admin','editor']    control the page roles (you can set multiple roles)
    title: 'title'               the name show in sidebar and breadcrumb (recommend set)
    icon: 'svg-name'             the icon show in the sidebar
    breadcrumb: false            if set false, the item will hidden in breadcrumb(default is true)
    activeMenu: '/example/list'  if set path, the sidebar will highlight the path you set
  }
 */

/**
 * constantRoutes
 * a base page that does not have permission requirements
 * all roles can be accessed
 */
export const constantRoutes = [
  {
    path: '/login',
    component: Layout,
    children: [{
      path: '',
      name: 'login',
      component: () => import('@/views/login/index'),
      meta: {
        title: '用户登录'
      }
    }]
  },

  {
    path: '/404',
    component: () => import('@/views/404'),
    hidden: true
  },
  {
    path: '/',
    component: Layout1,
    redirect: '/index',
    children: [
      {
        path: '',
        name: 'index',
        component: () => import('@/views/youge/company/index.vue'),
        meta: { title: '公司介绍' }
      }
    ]
  },

  {
    path: '/',
    component: Layout,
    children: [
      {
        path: 'newsList',
        name: 'newsList',
        component: () => import('@/views/youge/newsList.vue'),
        meta: { title: '查看更多' }
      },
      {
        path: 'more',
        name: 'more',
        component: () => import('@/views/youge/company/more.vue'),
        meta: { title: '查看更多' }
      },
      {
        path: 'details',
        name: 'details',
        component: () => import('@/views/youge/company/details.vue'),
        meta: { title: '查看详情' }
      },
      {
        path: 'agent',
        name: 'agent',
        component: () => import('@/views/youge/agent.vue'),
        meta: { title: '代理加盟' }
      },
      {
        path: 'partners',
        name: 'partners',
        component: () => import('@/views/youge/partners'),
        meta: { title: '合伙人中心' }
      },
      {
        path: 'contact',
        name: 'contact',
        component: () => import('@/views/youge/contact'),
        meta: { title: '联系我们' }
      },
      {
        path: 'product',
        name: 'product',
        component: () => import('@/views/product/index.vue')
      },
      {
        path: 'product_detail/:id',
        name: 'productDetail',
        component: () => import('@/views/product/detail.vue')
      },
      {
        path: 'confirm',
        name: 'confirm',
        component: () => import('@/views/order/confirm.vue')
      },
      {
        path: 'myorder',
        name: 'myorder',
        component: () => import('@/views/order/myorder.vue')
      },
      {
        path: 'orderinfo/:id',
        name: 'orderinfo',
        component: () => import('@/views/order/detail.vue')
      },
      {
        path: 'express',
        name: 'express',
        component: () => import('@/views/order/express.vue')
      },
      {
        path: 'cart',
        name: 'cart',
        component: () => import('@/views/order/cart.vue')
      },
      {
        path: 'offline',
        name: 'offline',
        component: () => import('@/views/order/offline.vue')
      },
      {
        path: 'pay',
        name: 'pay',
        component: () => import('@/views/order/pay.vue')
      }
    ]
  },

  {
    path: '/register',
    component: Layout,
    children: [{
      path: '',
      name: 'register',
      component: () => import('@/views/login/register'),
      meta: {
        title: '用户注册'
      }
    }]
  },

  { path: '*', redirect: '/404', hidden: true }
]

const createRouter = () => new Router({
  // mode: 'history', // require service support
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRoutes
})

const router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router
