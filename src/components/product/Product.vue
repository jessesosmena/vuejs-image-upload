<template>
  <div class="col-lg-4">
    <div class="thumbnail">
        <img :src="'https://mysterious-tor-84597.herokuapp.com/images/' + product.image" width="350" class="img-thumbnail">
         <div class="caption">
          <h4>{{product.name}}</h4>
          <p>£{{product.price}}</p>
          <p>{{product.description}}</p>
          <!--- $emit onclick trigger an event => delete-product declared in Products.vue then will call the deleteProduct method -->
     
          <p v-if="product.user_id === client && store.isVerified == 1">

          <a @click="$emit('delete-product')" class="btn btn-danger btn-sm" role="button">
            Delete
          </a>
          <!--- :to => bind products/edit url + product_id -->
          <router-link class="btn btn-warning btn-sm" :to="'/products/' + product.id + '/edit'">
            Edit
          </router-link>

          </p>  
          <p>
            <a v-if="store.token" @click='addToCart(product)' class='btn btn-info btn-sm'>Add to cart</a>
          </p>
          
	    </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex';

export default {

  computed: mapState({
    store: state => state.store
  }),

  data () {
    let client
    if(this.$store.state.store.client){
      client = this.$store.state.store.client.id
    }
    return {
      client
    }
  },

  methods: mapActions([
    'addToCart'
  ]),

  props: ['product'],
  // properties['product'] defining => product.name .price

  create () {

  }

}
</script>

<style>

  #id{
    display: none;
  }
  .thumbnail{
    font-family: 'Roboto', sans-serif;
  }

</style>
