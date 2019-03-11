<template>
    <div>
         <!-- side pane -->
      <div class="sidepane">
        <form class="form" enctype="multipart/form-data" @submit.prevent="createImg">
          <h3>Image</h3>

            <input 
            type="file" 
            class="form-control" 
            placeholder="Upload Your Images" 
            name="upload" 
            @change="onFileChange"
            required>
          <!-- Upload Form here -->

        <div class="assets">
          <h3>Name</h3>

          <div class="text">
              <input 
              type="text" 
              class="form-control" 
              v-model="images.text" 
              placeholder="Enter Text"
              required>
              <br/>
              <div class="text-danger" 
                v-show="errors.has('text')">
                {{ errors.first('text') }}
              </div>
              
              <button id="addText" class="btn btn-success btn-md">Submit</button>
          </div>

          <div class="image">
              <h4>Images</h4>
                  <user 
                   v-for="user in clientImgs" 
                   :key="user.id"
                   :user="user">
                  </user>
              <ul class="list-unstyled">
                  <li>
                  </li>
              </ul>
          </div>

        </div>

        </form>
      </div>
      <!-- canvas v-for = loop over each images in the clientImgs array -->
      <div class="canvas col-sm-8 col-md-8 col-lg-8">
          <div class="block">
            <client
               v-for="client in clientImgs" 
               @delete-image="deleteImage(client)"
               :key="client.id"
               :client="client">
            </client>
          </div>
      </div>
  </div>

</template>

<script>
import Client from './Client.vue'
import User from './User.vue'

export default {

 
  data () {
    return {
        images: {
          image: '',
          text: ''
        },
        clientImgs: []
    }
  },

  components: {

      'client': Client,

      'user': User
  },

  methods: {

    deleteImage (client) {
        this.$http.delete('https://arcane-chamber-27790.herokuapp.com/api/image/' + client.id)
          .then(response => {
              let index = this.clientImgs.indexOf(client) // image id in the clientImgs array
              this.clientImgs.splice(index, 1) // delete index images 1 item 
              console.log(response)
          })
    },

    onFileChange: function(e) {
        let files = e.target.files || e.dataTransfer.files;
        if (!files.length)
            return;
        this.createImage(files[0]);
    },

    createImage(file) {
        let reader = new FileReader();
        reader.readAsDataURL(file); //Starts reading the contents of the specified Blob, once finished, the result attribute below contains a data: URL representing the file's data.
        reader.onload = (e) => {
            this.images.image = e.target.result;
        };
    },

    createImg () {
      this.$validator.validateAll().then(() => { // validates all input data
          this.$http.post('https://arcane-chamber-27790.herokuapp.com/api/image', this.images)
            .then(response => {
              console.log(response)
              window.location.reload()
          })
      })
    }
  },
  
  //created => life cycle hook invoked immediately right after the component is mounted 
  created () {
    this.$http.get('https://arcane-chamber-27790.herokuapp.com/api/image')
      .then(response => {
        this.clientImgs = response.data
    })
  }

}

</script>

<style lang="scss" scoped>
  @import "../app.scss"
</style>