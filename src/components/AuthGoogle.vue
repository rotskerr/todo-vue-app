<template>
  <div class="auth-container">
    <button class="google-btn" @click="loginWithGoogle">
      <img src="https://www.svgrepo.com/show/475656/google-color.svg" alt="Google" class="google-icon" />
      Увійти через Google
    </button>
  </div>
</template>

<script>
import { auth } from '../firebase'
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth"

export default {
  name: 'AuthGoogle',
  methods: {
    async loginWithGoogle() {
      const provider = new GoogleAuthProvider()
      try {
        await signInWithPopup(auth, provider)
        this.$emit('login-success')
      } catch (e) {
        alert('Помилка входу: ' + e.message)
      }
    }
  }
}
</script>

<style scoped>
.auth-container {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 40vh;
}

.google-btn {
  display: flex;
  align-items: center;
  background: #fff;
  color: #444;
  border: 1px solid #ddd;
  border-radius: 6px;
  padding: 10px 24px;
  font-size: 1.1rem;
  font-weight: 500;
  cursor: pointer;
  box-shadow: 0 2px 8px rgba(60,60,60,0.07);
  transition: background 0.2s, box-shadow 0.2s;
}

.google-btn:hover {
  background: #f5f5f5;
  box-shadow: 0 4px 16px rgba(60,60,60,0.12);
}

.google-icon {
  width: 24px;
  height: 24px;
  margin-right: 12px;
}
</style>