<template>
  <div class="kanban-column">
    <h2>{{ title }}</h2>
    <draggable
      :list="list"
      group="tasks"
      item-key="id"
      class="todo-list"
      @change="onDragChange"
    >
      <template #item="{ element }">
        <TodoItem
          :todo="element"
          @toggle="$emit('toggle', element)"
          @remove="$emit('remove', element)"
        >
          <template #tags>
            <div class="todo-tags">
              <span v-for="tag in element.tags" :key="tag" class="tag">{{ tag }}</span>
            </div>
          </template>
        </TodoItem>
      </template>
    </draggable>
  </div>
</template>

<script>
import TodoItem from './TodoItem.vue'
import draggable from 'vuedraggable'

export default {
  name: 'KanbanColumn',
  components: { TodoItem, draggable },
  props: {
    title: String,
    list: Array
  },
  methods: {
    onDragChange(evt) {
      this.$emit('change', evt)
    }
  }
}
</script>