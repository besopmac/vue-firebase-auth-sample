<template>
    <div class="register-container">
        <h1 class="title">Register</h1>

        <div v-if="errorMessage" class="notification is-danger">
            <button class="delete"></button>
            {{ errorMessage }}
        </div>

        <div class="field">
            <div class="control">
                <input
                    type="text"
                    class="input"
                    v-model="email"
                    placeholder="Email"
                />
            </div>
        </div>

        <div class="field">
            <div class="control">
                <input
                    class="input"
                    type="password"
                    v-model="password"
                    placeholder="Password"
                />
            </div>
        </div>

        <div class="field">
            <button
                @click="register"
                class="button is-normal is-dark is-fullwidth"
            >
                Submit
            </button>
        </div>
    </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth'

const email = ref('')
const password = ref('')
const errorMessage = ref()

const router = useRouter()

const register = () => {
    const auth = getAuth()

    createUserWithEmailAndPassword(auth, email.value, password.value)
        .then((data) => {
            console.log('SUCCESS! =>', data)
            router.push('/feed')
        })
        .catch((error) => {
            switch (error.code) {
                case 'auth/invalid-email':
                    errorMessage.value = 'Invalid email'
                    break
                case 'auth/user-not-found':
                    errorMessage.value = 'There is no account with that email'
                    break
                case 'auth/wrong-password':
                    errorMessage.value = 'Incorrect password'
                    break
                default:
                    errorMessage.value = 'Email or password was incorrect'
                    break
            }
        })
}
</script>

<style scoped>
.register-container {
    padding: 2rem;
}
</style>
