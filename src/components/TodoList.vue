<script setup>
import TodoItem from './TodoItem.vue'

defineProps({
  todos: {
    type: Array,
    required: true,
  },
  categories: {
    type: Array,
    default: () => [],
  },
  hasAnyTodos: {
    type: Boolean,
    default: false,
  },
})

defineEmits(['toggle', 'update', 'remove'])
</script>

<template>
  <div class="todo-list">
    <div v-if="todos.length === 0" class="todo-list__empty">
      <template v-if="hasAnyTodos">
        <p class="todo-list__empty-title">没有匹配的待办</p>
        <p class="todo-list__empty-desc">试试切换筛选条件</p>
      </template>
      <template v-else>
        <p class="todo-list__empty-title">还没有待办事项</p>
        <p class="todo-list__empty-desc">在上方输入框添加你的第一条待办吧</p>
      </template>
    </div>

    <ul v-else class="todo-list__items">
      <TodoItem
        v-for="todo in todos"
        :key="todo.id"
        :todo="todo"
        :categories="categories"
        @toggle="$emit('toggle', $event)"
        @update="(id, updates) => $emit('update', id, updates)"
        @remove="$emit('remove', $event)"
      />
    </ul>
  </div>
</template>

<style scoped>
.todo-list__empty {
  padding: var(--spacing-xl);
  text-align: center;
  background: var(--color-surface);
  border-radius: var(--radius-lg);
  box-shadow: var(--shadow-sm);
}

.todo-list__empty-title {
  font-size: var(--font-size-base);
  color: var(--color-text);
  margin-bottom: var(--spacing-xs);
}

.todo-list__empty-desc {
  font-size: var(--font-size-sm);
  color: var(--color-text-secondary);
}

.todo-list__items {
  border-radius: var(--radius-lg);
  box-shadow: var(--shadow-sm);
  overflow: hidden;
}
</style>
