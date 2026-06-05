<script setup>
defineProps({
  activeCount: {
    type: Number,
    required: true,
  },
  completedCount: {
    type: Number,
    required: true,
  },
})

defineEmits(['clearCompleted'])
</script>

<template>
  <footer class="todo-footer">
    <span class="todo-footer__count">
      剩余 <strong>{{ activeCount }}</strong> 项
    </span>

    <button
      v-if="completedCount > 0"
      type="button"
      class="todo-footer__clear"
      @click="$emit('clearCompleted')"
    >
      清空已完成 ({{ completedCount }})
    </button>
  </footer>
</template>

<style scoped>
.todo-footer {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: var(--spacing-md);
  padding: var(--spacing-md);
  background: var(--color-surface);
  border-radius: var(--radius-lg);
  box-shadow: var(--shadow-sm);
}

.todo-footer__count {
  font-size: var(--font-size-sm);
  color: var(--color-text-secondary);
}

.todo-footer__count strong {
  color: var(--color-text);
  font-weight: 600;
}

.todo-footer__clear {
  border: none;
  background: transparent;
  font-size: var(--font-size-sm);
  color: var(--color-danger);
  padding: 4px 8px;
  border-radius: var(--radius-sm);
  transition: background-color 0.2s;
}

.todo-footer__clear:hover {
  background: var(--color-danger-bg);
}
</style>
