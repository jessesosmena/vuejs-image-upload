<template>
       <nav class="navbar navbar-inverse" role="navigation">
        <!-- Brand and toggle get grouped for better mobile display -->
        <div class="container">
            <div class="navbar-header">
                <button type="button" class="navbar-toggle" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1">
                    <span class="sr-only">Toggle navigation</span>
                    <span class="icon-bar"></span>
                    <span class="icon-bar"></span>
                    <span class="icon-bar"></span>
                </button>
                <a v-if="store.token" class="navbar-brand" href="#">Hello, {{store.client.username}}</a>
            </div>
            <!-- Collect the nav links, forms, and other content for toggling -->
            <div class="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
                <ul class="nav navbar-nav">
                    <li v-if="!store.token">
                      <router-link to="/">
                        Vue.js E-commerce
                      </router-link>
                    </li>
                    <li v-if="!store.token" class="">
                       <router-link to="/login">
                          Login
                       </router-link>
                    </li>
                    <li v-if="!store.token">
                       <router-link to="/signup">
                          Sign Up
                       </router-link>
                    </li>
                    <li><a @click="logout" v-if="store.token" href="#">Logout</a></li>

                    <li v-if="store.token">
                     <router-link to='/cart'>
                      <span>Checkout ({{itemsInCart}})</span>
                    </router-link>
                    </li>

                </ul>
                <ul v-if="store.isVerified == 1 && store.token" class="nav navbar-nav navbar-right">
                    <li class="dropdown" @click="dropdownMenu">
                        <a href="#" data-toggle="dropdown" class="dropdown-toggle">Admin <b class="caret"></b></a>
                        <ul class="dropdown-menu">
                            <li>
                              <router-link to="/products/create">
                                Create
                              </router-link>
                            </li>
                            <li>
                              <router-link to="/profile">
                                Your Profile 
                              </router-link>
                            </li>
                        </ul>
                    </li>
                       <a v-if="store.products" class="navbar-brand" href="#"> {{store.products.price}}</a>
                </ul>
            </div><!-- /.navbar-collapse -->
        </div>
    </nav>
</template>

<script>
import swal from 'sweetalert'
import { mapState, mapGetters } from 'vuex';


export default {

  computed: {

    ...mapState({
    store: state => state.store
    }),

    itemsInCart(){
      let cart = this.$store.getters.cartProducts;
      return cart.reduce((accum, item) => accum + item.quantity, 0)
    }
  },

  methods: {
    
    logout () {
      window.localStorage.removeItem('token');
      window.localStorage.removeItem('verified');
      window.localStorage.removeItem('client');

      this.$store.dispatch('unsetToken');
      this.$store.dispatch('unsetId');
      this.$router.push('/');
      
      swal({
        title: 'Logout Successfully!',
        button: true
      });
    },

    dropdownMenu () {
      
    }
}

}
</script>

<style>

  #capitalize:first-letter {
    text-transform: capitalize;
  }
  .navbar{
    font-family: 'Roboto', sans-serif;
    border-radius: 0;
    font-size: 15px;
  }
  #updateBtn{
    cursor: pointer;
  }

  .dropdown-menu li a{
    font-size: 16px;
  }

</style>
