export const apiDomain = 'https://mysterious-tor-84597.herokuapp.com'
export const loginUrl = apiDomain + '/api/login'
export const registerUrl = apiDomain + '/api/users'
export const userUrl = apiDomain + '/api/user'

import Vue from 'vue'
import Auth from './packages/auth/Auth.js'

Vue.use(Auth)

export const getHeader = function () {

	const token = Vue.auth.getToken();

	const headers = { // headers object

		'Accept': 'application/json', 

		'Authorization': 'Bearer ' + token // send bearer token
	}

	return headers
}
