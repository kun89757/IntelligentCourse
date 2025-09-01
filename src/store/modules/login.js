import Vue from 'vue'
import Vuex from 'vuex'
import { loginApi, registerApi, sendCodeApi, updatePasswordApi, verifyCodeApi, sendEmailApi, sendPhoneApi, verifyEmailApi, verifyPhoneApi, logoutApi, resetPasswordEmailCaptchaApi} from '@/api/login';

Vue.use(Vuex)


export default({
  namespaced: true,
  state: {
    token: "",
  },
  mutations: {
    setToken: (state, token) => {
      state.token = token;
    },
    clearToken: (state) => {
      localStorage.removeItem('token'),
      state.token = "";
    }
  },
  actions: {
    login({ commit }, data) {
      const {username, password, roleId} = data;
      return new Promise((resolve, reject) => {
        loginApi({
          username,
          password,
          roleId
          }
        ).then(response => {
          // console.log(response.data);
          // localStorage.setItem("token", response.data.token);
          // commit("setToken", localStorage.getItem("token"));
          console.log(response);
          resolve(response);
        }).catch((error) => {
            console.log(error);
            reject(error);
          });
      })
    },
    sendCode({commit}, data) {
      const {email} = data;
      return new Promise((resolve, reject) => {
        sendCodeApi({
          email,
        }).then(response => {
          console.log(response);
          resolve(response);
        }).catch(error => {
          console.log(error);
          reject(error)
        })
      })
    },
    register({commit}, data) {
      const { username, password, phone, email, verCode, roleId} = data;
      return new Promise((resolve, reject) => {
        registerApi({
          username,
          password,
          phone,
          email,
          verCode,
          roleId
        }).then(response => {
          console.log(response);
          resolve(response);
        }).catch(error => {
          console.log(error);
          reject(error)
        })
      })
    },
    updatePassword({ commit }, data) {
      const {newPassword, token} = data;
      return new Promise((resolve, reject) => {
        updatePasswordApi({
          newPassword,
          token,
        }).then(response => {
          console.log(response);
          resolve(response);
        }).catch(error => {
          console.log(error);
          reject(error);
        })
      })
    },
    verifyCode({commit}, data) {
      const {email, verCode} = data;
      return new Promise((resolve, reject) => {
        verifyCodeApi({
          email,
          verCode
        }).then(response => {
          console.log(response);
          resolve(response);
        }).catch(error => {
          console.log(error);
          reject(error);
        })
      })
    },
    sendEmail({commit}, data) {
      const {email} = data;
      return new Promise((resolve, reject) => {
        sendEmailApi({
          email,
        }).then(response => {
          console.log(response);
          resolve(response);
        }).catch(error => {
          console.log(error);
          reject(error)
        })
      })
    },
    verifyEmail({commit}, data) {
      const{email, verCode} = data;
      return new Promise((resolve, reject) => {
        verifyEmailApi({
          email,
          verCode,
        }).then(response => {
          console.log(response);
          localStorage.setItem('token', response.data.token);
          resolve(response);
        }).catch(error => {
          console.log(error);
          reject(error);
        })
      })
    },
    sendPhone({commit}, data) {
      const {phone} = data;
      return new Promise((resolve, reject) => {
        sendPhoneApi({
          phone
        }).then(response => {
          console.log(response);
          resolve(response);
        }).catch(error => {
          console.log(error);
          reject(error)
        })
      })
    },
    verifyPhone({commit}, data) {
      const{phone, code} = data;
      return new Promise((resolve, reject) => {
        verifyPhoneApi({
          phone,
          code,
        }).then(response => {
          console.log(response);
          localStorage.setItem('token', response.data.token);
          resolve(response);
        }).catch(error => {
          console.log(error);
          reject(error);
        })
      })
    },
    logout({commit}) {
      return new Promise((resolve, reject) => {
        logoutApi({
        }).then(response => {
          resolve(response);
          console.log(response);
        }).catch(error => {
          reject(error);
          console.log(error);
        })
      })
    },
    resetPasswordEmailCaptcha({commit}, data) {
      const {email} = data;
      return new Promise((resolve, reject) => {
        resetPasswordEmailCaptchaApi({
          email
        }).then(response => {
          resolve(response);
          console.log(response);
        }).catch(error => {
          reject(error);
          console.log(error);
        })
      })
    }
  }
})
