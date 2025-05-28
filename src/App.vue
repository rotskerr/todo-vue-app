<template>
  <div id="app">
    <h1>Todo App</h1>
    <input v-model="newTodo" @keyup.enter="addTodo" placeholder="Додати задачу" />
    <button @click="addTodo">Додати</button>
    <ul>
      <li v-for="(todo, index) in todos" :key="index">
        <span :style="{ textDecoration: todo.done ? 'line-through' : 'none' }">
          {{ todo.text }}
        </span>
        <button @click="toggleTodo(index)">
          {{ todo.done ? 'Відновити' : 'Виконано' }}
        </button>
        <button @click="removeTodo(index)">Видалити</button>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'App',
  data() {
    return {
      newTodo: '',
      todos: []
    }
  },
  methods: {
    addTodo() {
      if (this.newTodo.trim()) {
        this.todos.push({ text: this.newTodo, done: false });
        this.newTodo = '';
      }
    },
    toggleTodo(index) {
      this.todos[index].done = !this.todos[index].done;
    },
    removeTodo(index) {
      this.todos.splice(index, 1);
    }
  }
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
</style>