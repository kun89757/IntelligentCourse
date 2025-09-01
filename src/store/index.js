import Vue from 'vue'
import Vuex from 'vuex'
import user from './modules/user'
import login from './modules/login'
import course from './modules/course'
import admin from './modules/admin'
import concept from './modules/concept'
import getters from './getters'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {

  },
  mutations: {
  },
  actions: {
  },
  modules: {
    user, login, course, admin, concept
  }
})
