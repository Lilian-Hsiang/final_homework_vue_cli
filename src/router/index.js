import { createRouter, createWebHashHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/about',
    name: 'about',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue')
  },
  {
    path: '/login',
    name: 'login',
    component: () => import(/* webpackChunkName: "about" */ '../views/Login.vue')
  },
  {
    path: '/dashboard',
    name: 'dashboard',
    component: () => import(/* webpackChunkName: "about" */ '../views/Dashboard.vue'),
    // 路由巢狀
    children: [
      {
        path: 'products',
        component: () => import(/* webpackChunkName: "about" */ '../views/Products.vue')
      },
      {
        path: 'orders',
        component: () => import(/* webpackChunkName: "about" */ '../views/Orders.vue')
      },
      {
        path: 'coupons',
        component: () => import(/* webpackChunkName: "about" */ '../views/Coupons.vue')
      },
      {
        path: 'logout',
        component: () => import(/* webpackChunkName: "about" */ '../views/Logout.vue')
      }
    ]
  },
  {
    path: '/user',
    component: () => import('../views/Userboard.vue'),
    children: [
      {
        path: 'cart',
        component: () => import('../views/UserCart.vue')
      },
      {
        path: 'product/:productId',
        component: () => import('../views/UserProduct.vue')
      },
      {
        path: 'cartList',
        component: () => import('../views/UserCartList.vue')
      }
    ]
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
