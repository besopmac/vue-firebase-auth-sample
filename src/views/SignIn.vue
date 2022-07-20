<template>
  <h1>Create an Account</h1>

  <p>
    <input type="text" placeholder="Email" v-model="email" />
  </p>
  <p>
    <input type="password" placeholder="Password" v-model="password" />
  </p>
  <p>
    <button @click="signIn">Submit</button>
  </p>
  <p>
    <button @click="signInWithGoogle">Sign In Google</button>
  </p>
</template>

<script setup>
import { ref } from "vue";
// import { useRouter } from "vue-router";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";

const email = ref("");
const password = ref("");
// const router = useRouter();

const signIn = () => {
  const auth = getAuth();

  signInWithEmailAndPassword(auth, email.value, password.value)
    .then((data) => {
      console.log("Logged in!", data);
    })
    .catch((error) => {
      console.log(error.code);
    });
};

const signInWithGoogle = () => {};
</script>
