import Vue from 'vue'
import Vuex from 'vuex'

import firebase from '../config/firebase.js';
import 'firebase/auth';


Vue.use(Vuex)

let token = window.localStorage.getItem('token');
let email = window.localStorage.getItem('email');

export default new Vuex.Store({
  state: {
    loginToken: token ? JSON.parse(token) : '',
    email: email ? JSON.parse(email) : '',
  },
  mutations: {
    SET_TOKEN(state, payload) {
      state.loginToken = payload
      this.commit('SAVE_DATA');
    },
    SET_EMAIL(state, payload) {
      state.email = payload
      console.log('EMAIL_SET: ', state.email);
    },
    SAVE_DATA(state) {
      window.localStorage.setItem('token', JSON.stringify(state.loginToken));
      window.localStorage.setItem('email', JSON.stringify(state.email));
    },
    DESTROY_DATA() {
      window.localStorage.setItem('token', '');
      window.localStorage.setItem('email', '');
    }
  },
  actions: {
     getToken(context, payload) {
      return new Promise((resolve, reject) => {
     
        return  firebase.auth().signInWithEmailAndPassword(payload.email, payload.password).then(result =>{
          
          context.commit("SET_TOKEN", result.user.refreshToken );
          context.commit("SET_EMAIL", result.user.email );

          console.log('result.user.email: ', result.user.email);
          resolve(result)
         
          // setTimeout(() => {
          //     dispatch({type: 'LOG_IN', usuarioEmail: email});
            // }, 2000);
        }).catch(erro => {
          console.log('ERRO: ', erro);
          reject(erro)
        });
      
      });
     
        
     
    },
    destroyToken(context) {
      context.commit("SET_TOKEN", '' );
      context.commit('DESTROY_DATA');
    }
  },
  modules: {
  }
})
