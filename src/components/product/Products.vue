<template>

<div class="row">
     <product 
     v-for="product in products" 
     @delete-product="deleteProduct(product)"
     :key="product.id"
     :product="product">
     </product>
</div>     

</template>

<script>
import { getHeader, apiDomain } from '../../config.js'
import Product from './Product.vue'
import swal from 'sweetalert'
import { mapState } from 'vuex'

export default {

  computed: mapState({
    store: state => state.store
  }),
  
	data () {
		return {
			products: [] // <= api/products store in array then return
		}
	},

  //computed: { // computed properties is a function
      //authenticatedUser () {
         //return userData
      //}
  //},

  components: {
      'product': Product
  },

  methods: {

  deleteProduct (product) {

  swal({
  title: "Are you sure that you want to delete this product?",
  icon: "warning",
  dangerMode: true
  })
  .then(willDelete => {
  if (willDelete) {
    
  this.$http.delete(apiDomain + '/api/products/' + product.id, {headers:getHeader()})
    .then(response => {
        let index = this.products.indexOf(product) // product id in the products array
        this.products.splice(index, 1) // delete index products 1 item 
        swal({
          title: 'Your Product was deleted successfully!',
          button: true
        });
    })
  }
  });

  }
  },

	created () {

	  this.$http.get(apiDomain + '/api/products')
	   .then(response => {
	  	 this.products = response.body
	  })
	}
}
</script>

<style>

li {
	list-style-type: none;
}

</style>