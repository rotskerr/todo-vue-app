<template>
  <div id="app">
    <nav>
      <router-link to="/">Головна</router-link> |
      <router-link to="/about">Про додаток</router-link>
    </nav>
    <router-view />
  </div>
</template>

<script>
export default {
  name: 'App',
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
input {
  padding: 8px;
  font-size: 16px;
}
button {
  margin-left: 5px;
}
li {
  margin: 10px 0;
  list-style: none;
}
nav {
  margin-bottom: 20px;
}
</style>