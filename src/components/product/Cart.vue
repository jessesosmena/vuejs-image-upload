<template>
  <div class="col-lg-6">
    <h1 class="title">Your Cart</h1>
    <p class="cartEmpty" v-show="!products.length">
      <i>Your cart is empty!</i>
      <router-link to="/" class="Go">Go shopping</router-link>
    </p>
    <table class="table table-bordered table-lg table-inverse" v-show="products.length">
      <thead>
        <tr>
          <td>Name</td>
          <td>Price</td>
          <td>Quantity</td>
          <td>Delete</td>
        </tr>
      </thead>
      <tbody>
        <tr v-for="p in products">
            <td>{{ p.name }}</td>
            <td>£{{ p.price }}</td>
            <td>{{ p.quantity }}</td>
            <td><button class='btn btn-warning btn-xs' v-show="products.length" @click="deleteProduct(p)">Delete</button></td>
          </tr>
          <tr>
            <td><b>Total:</b></td>
            <td><b>£{{ total }}</b></td>
            <td></td>
            <td></td>
          </tr>
      </tbody>
</table>
    <button @click="shippingInfo()" class="btn btn-primary btn-sm" v-show="products.length">Checkout</button>
  </div>
</template>
<script>
import { mapGetters, mapActions } from 'vuex'

export default {

  computed: {
    ...mapGetters({
      products: 'cartProducts'
    }),

    total () {
      return this.products.reduce((total, p) => {
        return total + p.price * p.quantity
      }, 0)
    },

    quantity () {
      return this.products.reduce((quantity, q) => {
        return quantity + q.quantity
      }, 0)
    }
  },

  methods: {
    shippingInfo: function(){
      this.$router.push({ name: 'customerInfo', params: 
      { 
        total: this.total, 
        quantity: this.quantity 
      }})
    },

    ...mapActions([
    'deleteProduct'
    ]),

  }
}
</script>

<style>

.table {
  padding: 15px;
  font-family: 'Roboto', sans-serif;
  background: #f8f8f8;
}
.btn {
  font-family: 'Roboto', sans-serif;
}
.title {
  font-family: 'Roboto', sans-serif;
  
}

</style>