<template>
    <div class="row col-lg-4 col-lg-offset-4">
      <div style="width:400px" class="row">
        <br/>
        <div id="register" class="panel panel-default"><br/>
          <h3 class="text-center">SignUp</h3>
          <div class="col-lg-4 col-lg-offset-4" style="width:150px"><hr/></div>
            <form @submit.prevent="register" class="panel-body">
                  <div class="form-group">
                    <input 
                      name="username" 
                      type="text" 
                      class="inputStyle form-control" 
                      v-model="username" 
                      v-validate="'required'"
                      placeholder="Username" 
                      required>

                    <div class="text-danger" 
                      v-show="errors.has('username')">
                      {{ errors.first('username') }}
                    </div>
                  </div>

                  <div class="form-group">
                    <input 
                      name="email" 
                      type="text" 
                      class="inputStyle form-control" 
                      v-model="email" 
                      v-validate="'required'"
                      placeholder="Email" 
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
                  </div>

                  <div class="form-group">
                      <input 
                        name="confirm password" 
                        type="password" 
                        class="inputStyle form-control" 
                        v-model="confirm_password"
                        v-validate="'confirmed:password'"
                        placeholder="Confirm Password" 
                        required>

                      <div class="text-danger" 
                        v-show="errors.has('confirm password')">
                        {{ errors.first('confirm password') }}
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
import { registerUrl, userUrl, getHeader } from '../../config.js'

  export default {

    data () {
      return {
        btnTitle: 'Submit',
        btnDisable: false,
        username: '',
        email: '',
        password: '',
        confirm_password: ''
      }
    },

    methods: {
      
      register () {

        this.btnDisable = true;
        this.btnTitle = 'Signing Up...'

        var data = {
          username: this.username, // export default/data() return method <= two way binding
          email: this.email, // export default/data() return method <= two way binding
          password: this.password
        }

        const authToken = {}
        const authClient = {}
        const verified = {}

        this.$http.post(registerUrl, data)
        .then(response => {
            // setToken => method/packages/auth/Auth.js
            authToken.access_token = response.body.access_token

            authToken.refresh_token = response.body.refresh_token

            authToken.expires_in = response.body.expires_in + Date.now()

            window.localStorage.setItem('token', JSON.stringify(authToken))

            this.$http.get(userUrl, {headers:getHeader()})
            .then(response => {
                  
              authClient.id = response.body.id

              authClient.username = response.body.username

              authClient.email = response.body.email

              verified.verified = response.body.verified

              window.localStorage.setItem('client', JSON.stringify(authClient))
              window.localStorage.setItem('verified', JSON.stringify(verified.verified))

                this.$router.push('/');

                swal({
                  title: 'You are Registered Successfully!',
                  button: true
                });

            });
            
        });

        return authToken.expires_in;   

      }
    }
  }
</script>

<style lang="scss">

  #register {
    margin-top: 15px;
    font-size: 15px;
    font-family: 'Roboto', sans-serif;

    h3{
      font-size: 19px;
    }
  }

  .inputStyle{
    height: 45px;
    font-size:13px;
  }

</style>
