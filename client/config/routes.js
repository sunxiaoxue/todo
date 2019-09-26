import Shouye from '../todo/projectView/shouye.vue'
import Zhishi from '../todo/projectView/zhishi.vue'
import Mode from '../todo/projectView/mode.vue'
import My from '../todo/projectView/my.vue'
import Login from '../login/login.vue'
export default [
  {
    path: '/',
    redirect: '/shouye'
  },
  {
    path: '/shouye',
    component: Shouye
  },
  {
    path: '/login',
    component: Login
  },
  {
    path: '/zhishi',
    component: Zhishi
  },
  {
    path: '/mode',
    component: Mode
  },
  {
    path: '/my',
    component: My
  }
]
