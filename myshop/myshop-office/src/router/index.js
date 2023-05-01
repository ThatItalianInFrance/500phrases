import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import ProductsList from '../views/ProductsList.vue'
import ProductsEdit from '../views/ProductsEdit.vue'
import Login from '../views/LoginView.vue'


const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
      meta: { requiresAuth: true }
    },
    {
      path: '/products/edit/:id',
      name: 'edit',
      component: ProductsEdit
    },
    {
      path: '/office/login',
      name: 'login',
      component: Login
    },
    {
      path: '/products/list',
      name: 'products',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: ProductsList,
      
    }
  ]
})
router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    const user = JSON.parse(localStorage.getItem('user'))
    if (user?.token) {
      next() 
    } else {
      next({ name: 'login' })
    }
  } else {
    next() 
  }
})
export default router
