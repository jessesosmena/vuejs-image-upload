<template>
      <div class="row">
        <div id="update" class="panel panel-default col-lg-4 col-lg-offset-4" v-if="store.isVerified == 1">
        <br/>
            <form @submit.prevent="update" class="panel-body">
                  <div class="form-group">
                    <label>Name:</label>
                      <input 
                        name="name" 
                        type="text" 
                        class="form-control" 
                        v-model="product.name" 
                        v-validate="'required'"
                        placeholder="Product Name" 
                        required>

                      <div class="text-danger" 
                        v-show="errors.has('name')">
                        {{ errors.first('name') }}
                      </div>
                  </div>

                  <div class="form-group">
                    <label>Price:</label>
                      <input 
                        name="price" 
                        type="product.number" 
                        class="form-control" 
                        v-model="product.price" 
                        v-validate="'max_value:10000'"
                        placeholder="Product Price" 
                        required>

                      <div class="text-danger" 
                        v-show="errors.has('price')">
                        {{ errors.first('price') }}
                      </div>
                  </div>

                  <div class="form-group">
                    <label>Description:</label>
                      <input 
                        name="description" 
                        type="text" 
                        class="form-control" 
                        v-model="product.description"
                        v-validate="'required'"
                        placeholder="Product Description" 
                        required>

                      <div class="text-danger" 
                        v-show="errors.has('description')">
                        {{ errors.first('description') }}
                      </div>
                  </div>
                  <input v-bind:disabled="btnDisable" type="submit" class="btn btn-danger btn-sm" value="UPDATE">
                  <br/><br/>
            </form>
        </div>
      </div>
</template>

<script>
import swal from 'sweetalert'
import { getHeader, apiDomain } from '../../config.js'
import { mapState } from 'vuex';

export default {

  computed: mapState({
    store: state => state.store
  }),

	created () { // created life cycle hook when component enters this cycle it will call getProduct method
      this.getProduct()
	},

	data () {
		return {
      btnDisable: false,
			product: {}
		}
	},

	methods: {

		getProduct () {

        this.$http.get(apiDomain + '/api/products/' + this.$route.params.product, {headers:getHeader()}) // <= product id
        .then(response => {
        	this.product = response.body // get product data from server concatenate to empty product array

          //alert(this.$route.params.product)
        })
        .catch(response => {
             // swal(response.status.toString(), response.body.error, "error") // global errors/interceptors/main.js
        })
		},

		update () {

      this.btnDisable = true

			this.$http.put(apiDomain + '/api/products/' + this.$route.params.product, this.product,{headers:getHeader()}) // this.product parameter which is the product empty array => passing data to server to update this product

			.then(response => {
        this.$router.push('/')

				swal({
          title: 'Product updated successfully!',
          button: true
			  });
      });
		}
	}
}
</script>

<style>

#update {
  margin-top: 15px;
  font-size: 15px;
  font-family: 'Roboto', sans-serif;
}

#link-update{
  margin-top: 13px;
  font-size: 12px;
}

</style>