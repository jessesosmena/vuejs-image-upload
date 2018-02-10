<template>
    <div class="row">
      <div id="shipping" class="panel panel-default col-md-4 col-md-offset-4">
      <br/>
            <h3 class="text-center">Customer Info</h3>
            <form @submit.prevent="submit" class="panel-body">
                  <div class="form-group">
                    <label>Name:</label>
                      <input 
                        name="name" 
                        type="text" 
                        class="form-control" 
                        v-model="customer.name" 
                        v-validate="'required'"
                        placeholder="Enter Name" 
                        required>

                      <div class="text-danger" 
                        v-show="errors.has('name')">
                        {{ errors.first('name') }}
                      </div>
                  </div>

                  <div class="form-group">
                    <label>Address:</label>
                      <input 
                        name="address" 
                        type="text" 
                        class="form-control" 
                        v-model="customer.address" 
                        v-validate="'required'"
                        placeholder="Enter Address" 
                        required>

                      <div class="text-danger" 
                        v-show="errors.has('address')">
                        {{ errors.first('address') }}
                      </div>
                  </div>

                  <div class="form-group">
                    <label>City:</label>
                      <input 
                        name="city" 
                        type="text" 
                        class="form-control" 
                        v-model="customer.city" 
                        v-validate="'required'"
                        placeholder="Enter City" 
                        required>

                      <div class="text-danger" 
                        v-show="errors.has('city')">
                        {{ errors.first('city') }}
                      </div>
                  </div>

                  <div class="form-group">
                    <label>Zip:</label>
                      <input 
                        name="zip" 
                        type="number" 
                        class="form-control" 
                        v-model="customer.zip" 
                        v-validate="'max_value:16000'"
                        placeholder="Enter ZipCode" 
                        required>

                      <div class="text-danger" 
                        v-show="errors.has('zip')">
                        {{ errors.first('zip') }}
                      </div>
                  </div>

                  <div class="form-group">
                    <label>Country:</label>
                      <input 
                        name="country" 
                        type="text" 
                        class="form-control" 
                        v-model="customer.country" 
                        v-validate="'required'"
                        placeholder="Enter Country" 
                        required>

                      <div class="text-danger" 
                        v-show="errors.has('country')">
                        {{ errors.first('country') }}
                      </div>
                  </div>

                  <div class="form-group">
                    <label>Phone:</label>
                      <input 
                        name="phone" 
                        type="number" 
                        class="form-control" 
                        v-model="customer.phone" 
                        v-validate="'required'"
                        placeholder="Enter Phone" 
                        required>

                      <div class="text-danger" 
                        v-show="errors.has('phone')">
                        {{ errors.first('phone') }}
                      </div>
                  </div>
             
                  <input v-bind:disabled="btnDisable" type="submit" class="btn btn-danger btn-sm" value="SUBMIT">
                  <br/><br/>
            </form>
      </div>
    </div>
</template>


<script>
import swal from 'sweetalert'
import { mapGetters } from 'vuex'
import { getHeader, apiDomain } from '../../config.js'

export default {

	data () {
        return {
          btnDisable: false,
          customer: {
            name: '',
            address: '',
            city: '',
            zip: '',
            country: '',
            phone: '',
            quantity: '',
            amount: ''
          },
        }
	},

	created () {
    const quantity = this.$route.params.quantity
		const total = this.$route.params.total
    this.customer.quantity = quantity
    this.customer.amount = total
    this.$store.dispatch('setTotalQTY', quantity);
		this.$store.dispatch('setTotalAmount', total);
		this.$store.dispatch('emptyCartValue');
	},

	methods: {

	submit () {

    this.btnDisable = true

		this.$validator.validateAll().then(() => { // validates all input data

      this.$http.post(apiDomain + '/api/shipping-info', this.customer, {headers:getHeader()})
		  .then(response => {
		    this.$router.push({ name: 'checkout', params: { name: this.customer.name }})
			swal({
	        title: 'Customer info has been submitted successfully!',
	        button: true
	        })
		  })
		})
	}

  }
}
</script>

<style>

#shipping{
	font-family: 'Roboto', sans-serif;
}

</style>