import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)
export default new Vuex.Store({
  
 state: {
   handCount: 0
 },
 mutations: {
   INCREMENT_HANDCOUNT (state){
     state.handCount = state.handCount + 1
   }
 },
 actions: {
   incrementHandcount({commit}){
     commit('INCREMENT_HANDCOUNT')
   }
 }
})
