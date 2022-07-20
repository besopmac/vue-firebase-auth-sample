<template>
  <h1>Create an Account</h1>

  <p>
    <input type="text" placeholder="Email" v-model="email" />
  </p>
  <p>
    <input type="password" placeholder="Password" v-model="password" />
  </p>

  <p v-if="errorMessage">
    {{ errorMessage }}
  </p>

  <p>
    <button @click="register">Submit</button>
  </p>
  <p>
    <button @click="signInWithGoogle">Sign In Google</button>
  </p>
</template>

<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import {
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
} from "firebase/auth";

const email = ref("");
const password = ref("");
const errorMessage = ref();

const router = useRouter();

const register = () => {
  const auth = getAuth();

  createUserWithEmailAndPassword(auth, email.value, password.value)
    .then((data) => {
      console.log("SUCCESS! =>", data);
      router.push("/feed");
    })
    .catch((error) => {
      switch (error.code) {
        case "auth/invalid-email":
          errorMessage.value = "Invalid email";
          break;
        case "auth/user-not-found":
          errorMessage.value = "There is no account with that email";
          break;
        case "auth/wrong-password":
          errorMessage.value = "Incorrect password";
          break;
        default:
          errorMessage.value = "Email or password was incorrect";
          break;
      }
    });
};

const signInWithGoogle = () => {
  const provider = new GoogleAuthProvider();
  signInWithPopup(getAuth(), provider)
    .then((result) => {
      console.log(result.user);
      router.push("/feed");
    })
    .catch((error) => {
      console.log("There is no account with that email", error);
    });
};
</script>
