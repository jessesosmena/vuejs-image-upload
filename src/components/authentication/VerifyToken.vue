<template>

</template>

<script>
import { apiDomain } from '../../config.js';
import swal from 'sweetalert';
import { mapState } from 'vuex';

    export default {
       
  	 	created () {

        this.$http.get(apiDomain + '/api/verify/' + this.$route.params.token)
        .then(response => {

        window.localStorage.removeItem('token');
        window.localStorage.removeItem('client');
        window.localStorage.removeItem('verified');

        this.$store.dispatch('unsetToken');
        this.$store.dispatch('unsetId');
        this.$router.push('/');

        swal({
          title: 'Congratulations! You have successfully verified your email',
          button: true
        });

        });
            
      }
  	}
</script>

<style>
</style>

