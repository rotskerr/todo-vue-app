<template>
  <div>
    <h1>Todo App</h1>
    <input v-model="newTodo" @keyup.enter="addTodo" placeholder="Додати задачу" />
    <button @click="addTodo">Додати</button>
    <ul>
      <TodoItem
        v-for="(todo, index) in todos"
        :key="index"
        :todo="todo"
        @toggle="toggleTodo(index)"
        @remove="removeTodo(index)"
      />
    </ul>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import TodoItem from '../components/TodoItem.vue'

const newTodo = ref('')
const todos = ref([])

function addTodo() {
  if (newTodo.value.trim()) {
    todos.value.push({ text: newTodo.value, done: false });
    newTodo.value = '';
  }
}

function toggleTodo(index) {
  todos.value[index].done = !todos.value[index].done;
}

function removeTodo(index) {
  todos.value.splice(index, 1);
}
</script>

<script>
export default {
  name: 'HomePage'
}
</script>