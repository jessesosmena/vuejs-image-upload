<template>

    <div>
      <div class="col-lg-6 sub-img">
           <img :src="'https://arcane-chamber-27790.herokuapp.com/' + user.image" alt="user-image" width="90" height="90">
      </div>
    </div>

</template>

<script>

export default {

  props: ['user']

}
</script>

<style>
 
</style>