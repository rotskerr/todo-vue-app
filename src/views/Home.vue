<template>
  <div>
    <h1>Todo App</h1>
    <input v-model="newTodo" @keyup.enter="addTodo" placeholder="Додати задачу" />
    <button @click="addTodo">Додати</button>
    <ul>
      <TodoItem
        v-for="(todo, index) in todoStore.todos"
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
import { useTodoStore } from '../stores/todo'

const newTodo = ref('')
const todoStore = useTodoStore()

function addTodo() {
  todoStore.addTodo(newTodo.value)
  newTodo.value = ''
}
function toggleTodo(index) {
  todoStore.toggleTodo(index)
}
function removeTodo(index) {
  todoStore.removeTodo(index)
}
</script>

<script>
export default {
  name: 'HomePage'
}
</script>