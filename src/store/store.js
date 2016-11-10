import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)
export default new Vuex.Store({

 state: {
   handCount: 0,
   handStats: []
 },
 mutations: {
   INCREMENT_HANDCOUNT (state){
     state.handCount = state.handCount + 1
   },
   INCREMENT_STATS (state, payload){
     state.handStats.push(payload)
   }
 },
 actions: {
   incrementHandcount({commit}){
     commit('INCREMENT_HANDCOUNT')
   },
   incrementStats({commit},payload){
     commit('INCREMENT_STATS', payload)
   }
 }
})
