import { defineStore } from 'pinia'

export const useTodoStore = defineStore('todo', {
  state: () => ({
    todos: []
  }),
  actions: {
    addTodo(text) {
      if (text.trim()) {
        this.todos.push({ text, done: false })
      }
    },
    toggleTodo(index) {
      this.todos[index].done = !this.todos[index].done
    },
    removeTodo(index) {
      this.todos.splice(index, 1)
    }
  }
})