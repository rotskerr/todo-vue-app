<template>
  <div class="tags-filter" v-if="tags.length">
    <span
      v-for="tag in tags"
      :key="tag"
      :class="['tag', { active: filterTag === tag }]"
      @click="$emit('update:filterTag', filterTag === tag ? '' : tag)"
      style="display: flex; align-items: center;"
    >
      {{ tag }}
      <button class="remove-tag-btn" @click.stop="$emit('removeTag', tag)" title="Видалити тег">×</button>
    </span>
    <span v-if="filterTag" class="clear-filter" @click="$emit('update:filterTag', '')">Скинути фільтр</span>
  </div>
</template>

<script>
export default {
  name: 'TagsFilter',
  props: {
    tags: Array,
    filterTag: String
  }
}
</script>