import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAJGpvN21QUL6VW79pAlX7R7Ok4Ku6h3Bg",
  authDomain: "vue-survey-8346f.firebaseapp.com",
  databaseURL: "https://vue-survey-8346f-default-rtdb.firebaseio.com",
  projectId: "vue-survey-8346f",
  storageBucket: "vue-survey-8346f.appspot.com",
  messagingSenderId: "1086579526615",
  appId: "1:1086579526615:web:d8245d257a88657eeb1992",
  measurementId: "G-5KQ3FCN65C",
};

initializeApp(firebaseConfig);
const app = createApp(App);

app.use(router);

app.mount("#app");
