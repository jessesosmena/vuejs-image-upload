<template>
  <div class="col-lg-6">
    <div class="">
        <img :src="'https://arcane-chamber-27790.herokuapp.com/' + client.image" width="300" height="230" class="img-thumbnail main-img">
        <div class="caption">
          <h4>{{client.text}}</h4>


          <p v-if="client.id">
            <a @click="$emit('delete-image')" class="" role="button">
              x
            </a>
          </p>  
          
        </div>
    </div>
  </div>
</template>

<script>

export default {

  props: ['client']

}
</script>

<style>
 
</style>