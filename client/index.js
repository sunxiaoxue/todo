import Vue from 'vue'
import App from './app.vue'
import VueRouter from 'vue-router'
import Vuex from 'vuex'
import createStore from './store/store'
import ElementUi from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import createRouter from './config/router'
import './assets/image/2.jpg'
import './assets/styles/global.styl'

Vue.use(VueRouter)
const router = createRouter()
Vue.use(Vuex)
const store = createStore()

Vue.use(ElementUi)
new Vue({
  router,
  store,
  render: (h) => h(App)
}).$mount('#root')
