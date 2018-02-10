import Vue from 'vue'
import Vuex from 'vuex'

import store from './store/index.js'

Vue.use(Vuex);

const debug = process.env.NODE_ENV !== 'production';

export default new Vuex.Store({

	modules: {
	 store
	},

	strict: debug // if NODE_ENV is not equal to production
});
