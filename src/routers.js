import Vue from 'vue'
import VueRouter from 'vue-router' // <= vue-router library

import Login from './components/authentication/Login.vue' // import login component
import VerifyToken from './components/authentication/VerifyToken.vue' // import login component
import Register from './components/authentication/Register.vue' // import register component
import Home from './components/Home.vue' // import home component
import Create from './components/product/Create.vue'
import Edit from './components/product/Edit.vue'
import Profile from './components/profile/Profile.vue'
import UserUpdate from './components/profile/UserUpdate.vue'
import Cart from './components/product/Cart.vue'
import Customer from './components/product/Customer.vue'
import Checkout from './components/product/Checkout.vue'


Vue.use(VueRouter)

const router = new VueRouter({ // <= instance
   routes: [

      { // objects/route record
      	 path: "/login", // url
      	 component: Login, // import login component
      	 meta: {
      	 	forVisitors: true // route for visitors
      	 }
      },

      { // objects/route record
             path: "/verify/:token", // url
             component: VerifyToken
      },

      { // objects/route record
      	 path: "/signup", // url
      	 component: Register,// import register component
      	 meta: {
      	 	forVisitors: true // route for visitors
      	 }
      },

      { // objects/route record
      	 path: "/", // url
      	 component: Home, // import home component
      	 meta: {
      	 	forVisitors: true
      	 }
      },

      { // objects/route record
             path: "/products/create", // url
             component: Create, // import create component
             meta: {
                  isVerified: true
             }
      },

      { // objects/route record
             path: "/products/:product/edit", // :product/id => route parameter
             component: Edit, // import Edit component
             meta: {
                  isVerified: true
             }
      },

      { // objects/route record
             path: "/profile", 
             component: Profile, 
             meta: {
                  isVerified: true
             }
      },

      { // objects/route record
             path: "/updateProfile/:id", 
             component: UserUpdate, 
             name: "update",
             meta: {
                  isVerified: true
             }
      },

      { // objects/route record
             path: "/cart", 
             component: Cart, 
             meta: {
                  forAuth: true
             }
      },

      { // objects/route record
             path: "/customerInfo", 
             name: "customerInfo",
             component: Customer, 
             meta: {
                  forAuth: true
             }
      },

      { // objects/route record
             path: "/checkout",
             name: "checkout",
             component: Checkout, 
             meta: {
                  forAuth: true
             }
      }

   ]

});
export default router