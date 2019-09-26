import Vue from 'vue'
import App from './app.vue'
import VueRouter from 'vue-router'
import Vuex from 'vuex'
import createStore from './store/store'
import createRouter from './config/router'
import './assets/styles/global.styl'
import Meta from 'vue-meta'
import Notification from './components/notification'
Vue.use(VueRouter)
Vue.use(Vuex)
Vue.use(Meta)
Vue.use(Notification)
export default () => {
  const router = createRouter()
  const store = createStore()
  const app = new Vue({

    router,
    store,
    render: h => h(App)
  })

  return { app, router, store }
}
