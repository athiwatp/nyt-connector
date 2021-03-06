import Vue from 'vue'
import Vuelidate from 'vuelidate'
import Vuetify from 'vuetify'
import 'vuetify/dist/vuetify.min.css'

import axios from 'axios'
import {store} from './store.js'
import App from './App.vue'

Vue.use(Vuetify)
Vue.use(Vuelidate)

// render app
const app = new Vue({
  el: '#app',
  store,
  render: h => h(App)
})

window.Alteryx.Gui = {

	SetConfiguration: j => {

		// update Vuex store with Alteryx Designer XML config, if exists
		store.state.ui = j.Configuration.Configuration ? j.Configuration.Configuration : store.state.ui
		window.Alteryx.JsEvent(JSON.stringify({Event: 'SetConfiguration'}))

	},
	GetConfiguration: () => {

		// give Vuex store to the Alteryx Designer XML config
		window.Alteryx.JsEvent(JSON.stringify({
			Event: 'GetConfiguration',
			Configuration: {
				Configuration: store.state.ui,
				Annotation: store.state.config.appTitle
			}
		}))
	}

}