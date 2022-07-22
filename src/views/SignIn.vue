<template>
    <div class="signin-container">
        <h1 class="title">Login</h1>

        <div v-if="errorMessage" class="notification is-danger is-light">
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
                @click="signIn"
                class="button is-normal is-dark is-fullwidth"
            >
                Submit
            </button>
        </div>

        <div class="field">
            <button
                @click="signInWithGoogle"
                class="button is-small is-text is-fullwidth"
            >
                Sign In Google
            </button>
        </div>
    </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import {
    getAuth,
    signInWithPopup,
    GoogleAuthProvider,
    signInWithEmailAndPassword
} from 'firebase/auth'

const email = ref('')
const password = ref('')
const router = useRouter()

const errorMessage = ref()

const signIn = () => {
    const auth = getAuth()

    signInWithEmailAndPassword(auth, email.value, password.value)
        .then((data) => {
            console.log('Logged in!', data)
        })
        .catch((error) => {
            console.log(error.code)
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

const signInWithGoogle = () => {
    const provider = new GoogleAuthProvider()
    signInWithPopup(getAuth(), provider)
        .then((result) => {
            console.log(result.user)
            router.push('/feed')
        })
        .catch((error) => {
            console.log('There is no account with that email', error)
        })
}
</script>

<style scoped>
.signin-container {
    padding: 2rem;
}
</style>
