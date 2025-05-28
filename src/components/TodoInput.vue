<template>
  <div class="todo-input">
    <input v-model="localTodo" @keyup.enter="submit" placeholder="Назва задачі *" />
    <textarea v-model="localDetails" placeholder="Деталі (необов'язково)" rows="2"></textarea>
    <div class="tags-input">
      <input
        v-model="localTag"
        @keyup.enter="addTag"
        placeholder="Додати тег і натиснути Enter"
      />
      <span
        v-for="(tag, idx) in localTags"
        :key="tag"
        class="tag"
        @click="removeTag(idx)"
        title="Видалити тег"
      >{{ tag }} ×</span>
    </div>
    <button @click="submit">Додати</button>
  </div>
</template>

<script>
export default {
  name: 'TodoInput',
  props: ['value', 'details', 'tags'],
  data() {
    return {
      localTodo: this.value || '',
      localDetails: this.details || '',
      localTag: '',
      localTags: this.tags ? [...this.tags] : []
    }
  },
  methods: {
    addTag() {
      const tag = this.localTag.trim();
      if (tag && !this.localTags.includes(tag)) {
        this.localTags.push(tag);
      }
      this.localTag = '';
    },
    removeTag(idx) {
      this.localTags.splice(idx, 1);
    },
    submit() {
      this.$emit('add', {
        text: this.localTodo,
        details: this.localDetails,
        tags: this.localTags
      });
      this.localTodo = '';
      this.localDetails = '';
      this.localTags = [];
    }
  }
}
</script>