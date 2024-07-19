import { createApp } from 'vue'
import axios from 'axios'
import VueAxios from 'vue-axios'
// Import component
import Loading from 'vue3-loading-overlay'
// Import stylesheet
import 'vue3-loading-overlay/dist/vue3-loading-overlay.css'
import App from './App.vue'
import router from './router'
import { currency, date } from './methods/filters'
import i18n from './i18n'
import { library } from '@fortawesome/fontawesome-svg-core'
import { fas } from '@fortawesome/free-solid-svg-icons'
import { far } from '@fortawesome/free-regular-svg-icons'
import { fab } from '@fortawesome/free-brands-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
// import store from './store'
import { createPinia } from 'pinia'
library.add(fas, far, fab)

const app = createApp(App).use(i18n)
const pinia = createPinia()
app.config.globalProperties.$filters = {
  currency,
  date
}
// app.config.globalProperties.$httpMessageState = $httpMessageState
app.use(router)
app.use(VueAxios, axios)
// app.use(store)
app.use(pinia)
app.component('Loading', Loading)
app.component('font-awesome-icon', FontAwesomeIcon)
app.mount('#app')
