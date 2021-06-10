import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";

// Buefy connecting
import Buefy from "buefy";
import "buefy/dist/buefy.css";
Vue.use(Buefy);

//Firebase connection
import firebase from "firebase";

var firebaseConfig = {
  apiKey: "AIzaSyAdI6mhlQShqQP5SRFVg8PHrO6ApAeXbwE",
  authDomain: "choise-disciplines-app.firebaseapp.com",
  projectId: "choise-disciplines-app",
  storageBucket: "choise-disciplines-app.appspot.com",
  messagingSenderId: "12240330782",
  appId: "1:12240330782:web:91c4fdde9d5258310bce0f",
  databaseURL: "https://choise-disciplines-app-default-rtdb.firebaseio.com",
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

firebase.auth().onAuthStateChanged((user) => {
  store.dispatch("fetchUser", user);
});

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
