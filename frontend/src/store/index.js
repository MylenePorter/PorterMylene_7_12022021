import Vue from "vue";
import Vuex from "vuex";
 
Vue.use(Vuex);
 
export default new Vuex.Store({
    state: {
        user: {
          username: 'mymy',
          fullName: 'Mylène Porter'
        }
    },
    getters: {},
    mutations: {},
    actions: {}
});