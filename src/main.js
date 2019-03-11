import Vue from 'vue'
import App from './App.vue'
import VueResource from 'vue-resource'
import VeeValidate from 'vee-validate'
import store from './store.js'
Vue.use(VueResource)
Vue.use(VeeValidate) 


new Vue({ // <= New vue instance
  el: '#app', // <= index.html/#app
  store,
  render: h => h(App) // <= import App.vue component
})