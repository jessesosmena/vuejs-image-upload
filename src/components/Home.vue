<template>
    <div>
	    <div class="container">

        <div v-if="store.isVerified == 0" class="col-lg-12
        alert alert-success"><button type="button" class="close" data-dismiss="alert" aria-label="Close">
        <span aria-hidden="true">&times;</span>
        </button>A verification email was sent to {{store.client.email}}. Please verify your email to activate admin panel</div>

		    <products></products>
	    </div>
    </div>
</template>

<script>
import { apiDomain } from '../config.js';
import Products from './product/Products.vue';
import { mapState } from 'vuex';

export default {

	  computed: mapState({
       store: state => state.store
    }),
    
    components: {
       'products': Products
    },

    created () {

        this.$store.dispatch('setToken', JSON.parse(window.localStorage.getItem('token')))
        this.$store.dispatch('setClient', JSON.parse(window.localStorage.getItem('client')));
        this.$store.dispatch('isVerified', JSON.parse(window.localStorage.getItem('verified')));

        let expires_in
        if(this.$store.state.store.token){
          expires_in = this.$store.state.store.token.expires_in
        }
       
        if(Date.now() > expires_in){
          window.localStorage.removeItem('token');
          window.localStorage.removeItem('client');
          window.localStorage.removeItem('verified');

          this.$store.dispatch('unsetToken');
          this.$store.dispatch('unsetId');
          this.$router.push('/');
        }

        const products = {}

        this.$http.get(apiDomain + '/api/products')
          .then(response => {
           this.$store.dispatch('setProducts', response.body);
        })
    }
}
</script>

<style>

.alert {
  font-size: 16px;
  font-family: 'Roboto', sans-serif;
}

</style>
