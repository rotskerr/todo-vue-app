<template>
  <li>
    <span :style="{ textDecoration: todo.done ? 'line-through' : 'none' }">
      {{ todo.text }}
    </span>
    <button @click="$emit('toggle')">
      {{ todo.done ? 'Відновити' : 'Виконано' }}
    </button>
    <button @click="$emit('remove')">Видалити</button>
  </li>
</template>

<script>
export default {
  name: 'TodoItem',
  props: {
    todo: {
      type: Object,
      required: true
    }
  }
}
</script>