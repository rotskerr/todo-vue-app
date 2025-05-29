<template>
  <li :class="['todo-card', todo.status]">
    <div class="todo-main">
      <span class="todo-title">{{ todo.text }}</span>
      <span v-if="todo.points" class="todo-points" title="Бали">+{{ todo.points }}</span>
      <button @click="$emit('remove', todo)">✕</button>
    </div>
    <div v-if="todo.details" class="todo-details">{{ todo.details }}</div>
    <div v-if="todo.deadline" class="todo-deadline" :class="{ overdue: isOverdue }">
      Дедлайн: {{ formatDate(todo.deadline) }}
    </div>
    <!-- Додай кнопки для зміни статусу, якщо треба -->
  </li>
</template>

<script>
export default {
  props: ['todo'],
  computed: {
    isOverdue() {
      if (!this.todo.deadline) return false;
      return new Date(this.todo.deadline) < new Date() && this.todo.status !== 'done';
    }
  },
  methods: {
    formatDate(date) {
      if (!date) return '';
      return new Date(date).toLocaleDateString();
    }
  }
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
.todo-deadline {
  margin-top: 6px;
  font-size: 0.95em;
  color: #2563eb;
}
.todo-deadline.overdue {
  color: #e53e3e;
  font-weight: bold;
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
.todo-points {
  background: #f6ad55;
  color: #fff;
  border-radius: 6px;
  padding: 2px 8px;
  font-size: 0.95em;
  margin-left: 10px;
  font-weight: 600;
}
</style>