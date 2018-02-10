<template>
    <div class="row">
      <div id="create" class="panel panel-default col-md-4 col-md-offset-4" v-if="store.isVerified == 1">
        <br/>
            <h3 class="text-center">Create Products</h3>
            <form enctype="multipart/form-data" @submit.prevent="create" class="panel-body">
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
                        v-validate="'max_value:100000'"
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
                  
                  <h5>Upload images(Drag or Click)</h5>
                    <div class="dropbox">
                      <input type="file" @change="onFileChange" class="input-file">
                    </div>
                  <br/>
                  
                  <input v-bind:disabled="btnDisable" type="submit" class="btn btn-danger btn-sm" value="SUBMIT">
                  <br/><br/>
            </form>
      </div>
    </div>
</template>

<script>
import { apiDomain } from '../../config.js'
import swal from 'sweetalert'
import { mapState } from 'vuex'
export default {

  computed: mapState({
   store: state => state.store
  }),

	data () {
		return {
      btnDisable: false,
			product: {
				name: '',
				price: 0,
				description: '',
        image: '',
        client_id: ''
			}
		}
	},

	methods: {

    onFileChange: function(e) {
        let files = e.target.files || e.dataTransfer.files;
        if (!files.length)
            return;
        this.createImage(files[0]);
    },

    createImage(file) {
        let reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = (e) => {
            this.product.image = e.target.result;
        };
    },

		create () {

      this.btnDisable = true

			this.$validator.validateAll().then(() => { // validates all input data

        this.$http.post(apiDomain + '/api/products', this.product)
  		  .then(response => {
  		  this.$router.push('/')
        
    		  swal({
            title: 'Product created successfully!',
            button: true
          })

  		  })
			})

      this.product.client_id = this.store.client.id
		}
	}
}
</script>

<style>

#create {
  margin-top: 15px;
  font-size: 15px;
  font-family: 'Roboto', sans-serif;
}

#link-create{
  margin-top: 13px;
  font-size: 12px;
}

.dropbox {
  outline: 2px dashed grey; /* the dash box */
  outline-offset: -10px;
  background: lightcyan;
  color: dimgray;
  padding: 5px 5px;
  min-height: 50px; /* minimum height */
  position: relative;
  cursor: pointer;
}

.input-file {
  opacity: 0; /* invisible but it's there! */
  width: 50%;
  height: 50px;
  cursor: pointer;
}

.dropbox:hover {
  background: lightblue; /* when mouse over to the drop zone, change color */
}

.dropbox p {
  font-size: 1.2em;
  text-align: center;
  padding: 50px 0;
}

</style>