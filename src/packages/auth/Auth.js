export default function (Vue){ 
  	
	Vue.auth = {
     
	    getToken ()  {

        var token =  JSON.parse(window.localStorage.getItem('token'));
        
        var access_token = token.access_token

          if(!access_token){
            return null;
          }else{
            return access_token
          }
	    }
	}

	Object.defineProperties (Vue.prototype, { 
        $auth: {
          get ()  {
            return Vue.auth;
          }
        }
	})

}
