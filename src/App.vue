<!-- eslint-disable prettier/prettier -->
<!-- eslint-disable prettier/prettier -->
<template>
  <section class="section">

    <div class="container">
      <nav class="navbar is-light" role="navigation" aria-label="main navigation">
        <div id="navbarBasicExample" class="navbar-menu">
          <div class="navbar-start">
            <RouterLink class="navbar-item" to="/">Home</RouterLink>
            <RouterLink class="navbar-item" to="/feed">Feed</RouterLink>
            <RouterLink class="navbar-item" to="/register">Register</RouterLink>
            <RouterLink class="navbar-item" to="/sign-in">Login</RouterLink>
          </div>
        </div>

        <div class="navbar-end">
          <div class="navbar-item">
            <div class="buttons">
              <button class="button is-primary" @click="handleSignOut" v-if="isLoggedIn">
                Sign Out
              </button>
            </div>
          </div>
        </div>
      </nav>

      <RouterView />
    </div>
  </section>
</template>

<script setup>
import { onMounted, ref } from 'vue'
import { getAuth, onAuthStateChanged, signOut } from 'firebase/auth'
import router from './router'

const isLoggedIn = ref(false)

let auth

onMounted(() => {
    auth = getAuth()
    onAuthStateChanged(auth, (user) => {
        if (user) {
            isLoggedIn.value = true
        } else {
            isLoggedIn.value = false
        }
    })
})

const handleSignOut = () => {
    signOut(auth).then(() => {
        router.push('/')
    })
}
</script>

<style scoped>
.section {
    height: 100vh;
}
.container {
    width: 560px;
    margin-top: 20px;
    border-radius: 5px;
    border: 1px solid #e7e7e7;
    box-shadow: 0 10px 2rem -20px rgba(0, 0, 0, 0.2);
}
</style>
