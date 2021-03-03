import Vue from 'vue';
import Vuex from 'vuex'
import App from './App.vue';
import router from './router';
import axios from "axios";
import store from './store';

const token = sessionStorage.getItem('token');
axios.defaults.baseURL = 'http://localhost:3000/api/';
if (token) {
    axios.defaults.headers.common['Authorization'] = 'Bearer ' + token;
}

Vue.prototype.$axios = axios;
Vue.config.productionTip = false;
Vue.use(Vuex);

new Vue({ store, router, render: h => h(App) }).$mount('#app');