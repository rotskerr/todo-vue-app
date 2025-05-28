<template>
  <li :class="['todo-card', todo.status]">
    <div class="todo-main">
      <span class="todo-title">{{ todo.text }}</span>
      <button @click="$emit('remove', todo)">✕</button>
    </div>
    <div v-if="todo.details" class="todo-details">{{ todo.details }}</div>
    <!-- Додай кнопки для зміни статусу, якщо треба -->
  </li>
</template>

<script>
export default {
  props: ['todo']
}
</script>

<style scoped>
.todo-card {
  background: #fff;
  border-radius: 10px;
  box-shadow: 0 2px 8px rgba(60,60,60,0.07);
  margin-bottom: 14px;
  padding: 14px 16px;
  transition: background 0.2s;
  border-left: 6px solid #3182ce;
}
.todo-card.planned { border-color: #3182ce; background: #e3f0ff; }
.todo-card.in-progress { border-color: #f6ad55; background: #fff7e6; }
.todo-card.done { border-color: #38a169; background: #e6ffed; }
.todo-main {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.todo-title {
  font-weight: 600;
}
.todo-details {
  margin-top: 6px;
  color: #555;
  font-size: 0.97em;
}
button {
  background: none;
  border: none;
  color: #888;
  font-size: 1.1em;
  cursor: pointer;
}
button:hover {
  color: #e53e3e;
}
li {
  list-style: none;
  margin: 0;
  padding: 0;
}
</style>