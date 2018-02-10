<template>
  <div class="col-lg-3" id='app'>
    <h5 class="text-success">Credit or debit card:</h5>
      <form @submit.prevent="pay">
      
        <card class='stripe-card'
          :class='{ complete }'
          stripe='pk_test_PfXoX14roz03gioKfJ3UDmlL'
          @change='complete = $event.complete'
        />

      <br/>
      <button class='btn btn-info' :disabled="!complete">Submit Payment</button>
      </form>
      <br/>

    <div class="">
      <h4 class="text-info">
      <p>One of Stripe's test card numbers, such as 4242424242424242</p>
        <p>Any three-digit CVC code</p>
        <p>Any expiration date in the future</p>
        <p>Any billing ZIP code, such as 12345</p>

        <p>4242424242424242 = Visa</p>
        <p>4000056655665556 = Visa (debit)</p>
        <p>5555555555554444 = Mastercard</p>
        </h4>
    </div>
  </div>
</template>
 
<script>
//import { stripeKey, stripeOptions } from './stripeConfig.json'
import { getHeader, apiDomain } from '../../config.js'
import { Card, createToken } from 'vue-stripe-elements'
import { mapGetters } from 'vuex'

export default {

  data () {
    return {
      complete: false,
        checkoutData: {
          quantity: '',
          total: '',
          email: '',
          token: '',
          name: this.$route.params.name
        }
    }

    console.log(checkoutData)
  },

  computed: {
    ...mapGetters({
     amount: 'total',
     email: 'email',
     quantity: 'QTY'
    })
  },

  components: { Card },

  beforeUpdate() {

      if(!this.checkoutData.token == ''){
      this.$http.post(apiDomain + '/api/checkout', this.checkoutData, {headers:getHeader()})
          .then(response => {

            this.$router.push('/')
          swal({
            title: 'Your order has been shipped! Receipt was sent to your email',
            button: true
          })
          })
      }
  },
 
  methods: {
    pay () {
      createToken().then(data => this.checkoutData.token = data.token.id)
      this.complete = false;
      setInterval(() => {
        this.checkoutData.quantity = this.quantity
        this.checkoutData.total = this.amount
        this.checkoutData.email = this.email
      }, 1000)
    }
  }
}
</script> 
 
<style>

#app {
  font-family: 'Roboto', sans-serif;
}

.StripeElement {
  background-color: white;
  height: 40px;
  width: 540px;
  padding: 10px 12px;
  border-radius: 4px;
  border: 1px solid transparent;
  box-shadow: 0 1px 3px 0 #e6ebf1;
  -webkit-transition: box-shadow 150ms ease;
  transition: box-shadow 150ms ease;
}

.StripeElement--focus {
  box-shadow: 0 1px 3px 0 #cfd7df;
}

.StripeElement--invalid {
  border-color: #fa755a;
}

.StripeElement--webkit-autofill {
  background-color: #fefde5 !important;
}

</style> 