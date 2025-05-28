<template>
  <div class="login-container">
    <div class="login-card">
      <h2>Вхід до ToDo</h2>
      <AuthGoogle @login-success="onLoginSuccess" />
    </div>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router'
import AuthGoogle from '../components/AuthGoogle.vue'

const router = useRouter()

function onLoginSuccess() {
  router.push('/')
}
</script>

<script>
export default {
  name: 'LoginPage',
  components: { AuthGoogle },
}
</script>

<style scoped>
.login-container {
  min-height: 80vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, #f8fafc 0%, #e0e7ef 100%);
}

.login-card {
  background: #fff;
  border-radius: 14px;
  box-shadow: 0 4px 24px rgba(60,60,60,0.12);
  padding: 40px 32px 32px 32px;
  min-width: 320px;
  display: flex;
  flex-direction: column;
  align-items: center;
}

h2 {
  margin-bottom: 32px;
  color: #222;
  font-weight: 700;
  letter-spacing: 1px;
}
</style>