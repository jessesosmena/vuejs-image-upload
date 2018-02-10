<template>
    <div class="col-lg-4 col-lg-offset-4">
      <div style="width:400px" class="row">
          <br/>
          <div id="login" class="panel panel-default"><br/>
            <h3 class="text-center">Login</h3>
            <div class="col-lg-4 col-lg-offset-4" style="width:150px"><hr/></div>
              <form @submit.prevent="login" class="panel-body">
                    <div class="form-group">
                   
                        <input 
                          name="email" 
                          type="text" 
                          class="inputStyle form-control" 
                          v-model="email" 
                          v-validate="'required'"
                          placeholder="Username Or Email" 
                          required>

                        <div class="text-danger" 
                          v-show="errors.has('email')">
                          {{ errors.first('email') }}
                        </div>
                    </div>

                    <div class="form-group">
                        <input 
                          name="password" 
                          type="password" 
                          class="inputStyle form-control" 
                          v-model="password"
                          v-validate="'required'"
                          placeholder="Password" 
                          required>

                        <div class="text-danger" 
                          v-show="errors.has('password')">
                          {{ errors.first('password') }}
                        </div>
                    </div><hr><br/>

                    <input v-bind:value="btnTitle" v-bind:disabled="btnDisable" style="font-size:15px" type="submit" class="btn btn-danger btn-lg btn-block">
                    <br/><br/>
              </form>
          </div>
      </div>
    </div>
</template>

<script>
import swal from 'sweetalert'
import { getHeader, loginUrl, userUrl } from '../../config.js'
import { mapState } from 'vuex'

  export default {

      computed: mapState({
        store: state => state.store
      }),
    
  	  data () {
        return {
          btnTitle: 'Login to your account',
          btnDisable: false,
       	  email: '',
       	  password: ''
        }
  	  },
      
  	  methods: {

  	 	login () {

        this.btnDisable = true;
        this.btnTitle = 'Logging In...'
        
  	 		var data = {
            username: this.email, // export default/data() return method <= two way binding
            password: this.password // export default/data() return method <= two way binding
  	 		}

        const authToken = {}
        const authClient = {}
        const verified = {}
        
        this.$validator.validateAll().then(() => { 

    	 		this.$http.post(loginUrl, data)
    	 		.then(response => {

              if(response.status == 401){
                console.log('Error');
              }
      
              authToken.access_token = response.body.access_token

              authToken.refresh_token = response.body.refresh_token

              authToken.expires_in = response.body.expires_in + Date.now()

              window.localStorage.setItem('token', JSON.stringify(authToken))

            this.$http.get(userUrl, {headers:getHeader()})
            .then(response => {
                  
                authClient.id = response.body.id

                authClient.username = response.body.username

                authClient.email = response.body.email

                authClient.created_at = response.body.created_at

                verified.verified = response.body.verified

                if(response.body){
                  console.log(response.body)
                }

                window.localStorage.setItem('client', JSON.stringify(authClient))
                window.localStorage.setItem('verified', JSON.stringify(verified.verified))

                this.$router.push('/');

                swal({
                title: 'Login was Successful!',
                button: true
                });
            });
            
          });

          return authToken.expires_in; 
          
        }); 
  	 	}
  	}
  }
</script>

<style lang="scss">
 
  #login {
    margin-top: 15px;
    font-size: 15px;
    font-family: 'Roboto', sans-serif;

    h3{
      font-size: 19px;
    }
  }

  .inputStyle{
    height: 43px;
    font-size:13px;
  }

</style>

