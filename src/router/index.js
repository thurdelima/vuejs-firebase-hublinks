import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import LinkCreate from '../views/LinkCreate.vue';
import Link from '../views/Link.vue';
import Login from '../views/Login.vue';
import CreateUser from '../views/CreateUser.vue';

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/criar-link',
    name: 'LinkCreate',
    component: LinkCreate
  },
  {
    path: '/link/:id',
    name: 'Link',
    component: Link,
    props: true
  },
  {
    path: '/criar-usuario',
    name: 'CreateUser',
    component: CreateUser
  },
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
