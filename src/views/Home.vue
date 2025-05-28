<template>
  <div>
    <h1>Todo App</h1>
    <input v-model="newTodo" @keyup.enter="addTodo" placeholder="Додати задачу" />
    <button @click="addTodo">Додати</button>
    <ul>
      <transition-group name="fade" tag="ul">
        <TodoItem
          v-for="(todo, index) in todoStore.todos"
          :key="todo.text + index"
          :todo="todo"
          @toggle="toggleTodo(index)"
          @remove="removeTodo(index)"
        />
      </transition-group>
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

<style scoped>
.fade-enter-active, .fade-leave-active {
  transition: all 0.4s;
}
.fade-enter-from, .fade-leave-to {
  opacity: 0;
  transform: translateY(20px);
}
</style>

<script>
export default {
  name: 'HomePage'
}
</script>