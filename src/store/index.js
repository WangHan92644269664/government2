import Vue from 'vue'
import Vuex from 'vuex'
import Axios from 'axios'


Vue.use(Vuex)

let store = new Vuex.Store({
    state:{
        
        sidebar: false
    },
    getters: {
        
    },
    mutations: {
        open(state){
            state.sidebar = !state.sidebar
        }
    },
    actions: {
        togglebar({commit}){
            commit('open')
        }
    },
    modules:{

    }
})

export default store