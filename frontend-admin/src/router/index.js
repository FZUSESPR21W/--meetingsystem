import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../views/Login'
import Brief from '../views/Brief'
import Participant from '../views/Participant'
import Publish from '../views/Publish'
import Coat from '../views/Coat'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'login',
    component: Login,
    meta: {
      title: '登入'
    }
  },
  {
    path: '/center',
    name: 'center',
    component: Coat,
    children:[
      {
        path: 'brief',
        name: 'brief',
        component: Brief,
        meta: {
          title: '信息'
        }
      },
      {
        path: 'participant',
        name: 'participant',
        component: Participant,
        meta: {
          title: '成员'
        }
      },
      {
        path: 'publish',
        name: 'publish',
        component: Publish,
        meta: {
          title: '通知'
        }
      },
    ]
  },
]

const router = new VueRouter({
  routes
})

export default router
