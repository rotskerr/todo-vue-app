<template>
  <div>
    <h2>Вхід</h2>
    <input v-model="username" placeholder="Ім'я користувача" />
    <button @click="login">Увійти</button>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const username = ref('')
const router = useRouter()

function login() {
  if (username.value.trim()) {
    localStorage.setItem('user', username.value)
    router.push('/')
  }
}
</script>

<script>
export default {
  name: 'LoginPage',
}
</script>