<template>
  <header class="app-header">
    <nav>
      <router-link to="/">Головна</router-link>
      <router-link to="/about">Про додаток</router-link>
    </nav>
    <div v-if="user" class="user-info">
      <img :src="user.photoURL" alt="avatar" class="avatar" />
      <span>{{ user.displayName }}</span>
      <span class="email">{{ user.email }}</span>
      <button @click="logout">Вийти</button>
    </div>
  </header>
  <router-view />
</template>

<script>
import { auth } from './firebase'
import { onAuthStateChanged, signOut } from 'firebase/auth'

export default {
  data() {
    return { user: null }
  },
  created() {
    onAuthStateChanged(auth, (user) => {
      this.user = user
    })
  },
  methods: {
    async logout() {
      await signOut(auth)
      this.$router.push('/login')
    }
  }
}
</script>

<style scoped>
.app-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 18px 32px;
  background: #f8fafc;
  border-bottom: 1px solid #e0e7ef;
}
nav a {
  margin-right: 18px;
  text-decoration: none;
  color: #222;
  font-weight: 500;
}
.user-info {
  display: flex;
  align-items: center;
  gap: 12px;
}
.avatar {
  width: 36px;
  height: 36px;
  border-radius: 50%;
}
.email {
  color: #888;
  font-size: 0.95em;
}
button {
  margin-left: 10px;
  background: #e53e3e;
  color: #fff;
  border: none;
  border-radius: 6px;
  padding: 6px 14px;
  cursor: pointer;
  font-weight: 500;
}
button:hover {
  background: #c53030;
}
</style>