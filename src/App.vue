<template>
  <div id="app">
    <navbar></navbar>
    <router-view></router-view> <!-- <= all routed components/objects will be bind here from routers.js -->
  </div>
</template>

<script>
import Navbar from './components/Navbar.vue'
import { mapState } from 'vuex';

export default {

    computed: mapState({
      store: state => state.store
    }),

    components: {
      'navbar':  Navbar
    }
}
</script>

<style>

body {
  background-color: #f8f8f8;
}

</style>

