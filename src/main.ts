import Vue from 'vue';
import App from './App.vue';
import store from './store';
import vuetify from './plugins/vuetify';
import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';

// Configuracion firebase
const firebaseConfig = {

  apiKey: "#########################",
  authDomain: "#########################",
  projectId: "#########################",
  storageBucket: "#########################",
  messagingSenderId: "#########################",
  appId: "#########################"
};

// inicializar firebase
firebase.initializeApp(firebaseConfig);
export const db = firebase.firestore();

Vue.config.productionTip = false;

new Vue({
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app')




