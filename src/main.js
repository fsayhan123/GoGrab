import Vue from 'vue'
import App from './App.vue'
import VueRouter from 'vue-router'
import Routescomp from './routes.js'
import firebase from "firebase"
import { BootstrapVue, IconsPlugin} from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'


require("firebase/firestore");
Vue.use(VueRouter);
Vue.use(BootstrapVue);
Vue.use(IconsPlugin);
Vue.config.productionTip = false;


require("firebase/firestore");

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
const database = firebase.firestore();
export default database;

const myRouter =  new VueRouter({
  routes:Routescomp,
  mode:'history'  
});

new Vue({
  render: h => h(App),
  router: myRouter
}).$mount('#app')

