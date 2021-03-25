import Vue from 'vue'
import App from './App.vue'
import VueRouter from 'vue-router'
import Routescomp from './routes.js'
import firebase from "firebase"

const firebaseConfig = {
  apiKey: "AIzaSyAmHDfkCOHsEdgjQeGNpQWqYp5KxxUUgbA",
  authDomain: "gograb-4c451.firebaseapp.com",
  projectId: "gograb-4c451",
  storageBucket: "gograb-4c451.appspot.com",
  messagingSenderId: "80331420725",
  appId: "1:80331420725:web:e930a264c0e3447f236d7c",
  measurementId: "G-W7Z3B5B7MF"
};

firebase.initializeApp(firebaseConfig);
var database = firebase.firestore();
export default database;

Vue.use(VueRouter)
Vue.config.productionTip = false
Vue.use(VueRouter);


//for router
const myRouter = new VueRouter({ routes: Routescomp,
  mode: 'history'
  });

const myRouter =  new VueRouter({
  routes:Routescomp,
  mode:'history'
})

new Vue({
  render: h => h(App),
  router: myRouter
}).$mount('#app')
