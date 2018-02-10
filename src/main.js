import Vue from 'vue'
import App from './App.vue'
import Router from './routers.js'

import VueResource from 'vue-resource'
import VeeValidate from 'vee-validate'
import store from './store.js'

Vue.use(VueResource) // http request 
Vue.use(VeeValidate) // use VeeValidate module

// Send access token to request server to grant access to secured 
// Vue.http.headers.common['Authorization'] = 'Bearer ' + Vue.auth.getToken()


Vue.http.interceptors.push((request, next) => { // catch the response from the server/handling errors globally/ post/pre proccess the request before sending it to server
    next(response => {
       if(response.status == 404){
          swal({
            icon: "warning",
            title: response.body.error,
            button: true
          });
          setTimeout(function(){  window.location.reload(); }, 1500);
       } else if (response.status == 500){
          swal({
            icon: "warning",
            title: 'We experiencing problems in our server!',
            button: true
          });
          //setTimeout(function(){  window.location.reload(); }, 1500);
       } else if (response.status == 401){
          swal({
            icon: "warning",
            title: 'The user credentials were incorrect!',
            button: true
          });
          setTimeout(function(){  window.location.reload(); }, 1500);
       } else if (response.status == 400){
          swal({
            icon: "warning",
            title: 'Email or Username has already been taken!',
            button: true
          });
          setTimeout(function(){  window.location.reload(); }, 1500);
       }
    })
}) 

Router.beforeEach(  // route guard / middleware
  (to,from,next) => {

    const verified = store.getters.verified

    const token = store.getters.access_token

    if(to.matched.some(record => record.meta.forAuth)){ // if route record/router.js/has a metafield forVisitors
      if(!token){ 
      next({
        path: '/'
      })

      } else next() // <= if not authenticated
    } 

    else if(to.matched.some(record => record.meta.isVerified)){ // if route record/router.js/has a metafield forVisitors
      if(verified === 0){ 
      next({
        path: '/'
      })

      } else next() // <= if not authenticated
    } 

  else next() 

  }
)

new Vue({ // <= New vue instance
  el: '#app', // <= index.html/#app
  store,
  render: h => h(App), // <= import App.vue component
  router: Router
})

