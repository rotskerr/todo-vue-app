<template>
  <div>
    <div v-if="message" class="notify">{{ message }}</div>
    <h1>Todo App</h1>
    <input v-model="newTodo" @keyup.enter="addTodo" placeholder="Додати задачу" />
    <button @click="addTodo">Додати</button>
    <ul>
      <transition-group name="fade" tag="ul">
        <TodoItem
          v-for="(todo, index) in todos"
          :key="todo.text + index"
          :todo="todo"
          @toggle="toggleTodo(index)"
          @remove="removeTodo(index)"
        />
      </transition-group>
    </ul>
  </div>
</template>

<script>
import TodoItem from '../components/TodoItem.vue'
import notify from '../mixins/notify'

export default {
  name: 'HomePage',
  components: { TodoItem },
  mixins: [notify],
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
        this.showMessage('Задачу додано!');
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

<style scoped>
.fade-enter-active, .fade-leave-active {
  transition: all 0.4s;
}
.fade-enter-from, .fade-leave-to {
  opacity: 0;
  transform: translateY(20px);
}
.notify {
  color: green;
  margin-bottom: 10px;
}
</style>