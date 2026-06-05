<script setup>
import { ref } from 'vue'
import { PRIORITY, PRIORITY_LABELS } from '../constants'

const emit = defineEmits(['add'])

const props = defineProps({
  categories: {
    type: Array,
    default: () => [],
  },
})

const title = ref('')
const priority = ref(PRIORITY.MEDIUM)
const dueDate = ref('')
const category = ref('')

function handleSubmit() {
  const trimmed = title.value.trim()
  if (!trimmed) return

  emit('add', {
    title: trimmed,
    priority: priority.value,
    dueDate: dueDate.value || null,
    category: category.value,
  })

  title.value = ''
  dueDate.value = ''
  category.value = ''
  priority.value = PRIORITY.MEDIUM
}
</script>

<template>
  <form class="todo-input" @submit.prevent="handleSubmit">
    <div class="todo-input__main">
      <input
        v-model="title"
        type="text"
        class="todo-input__field"
        placeholder="添加新的待办事项..."
        maxlength="200"
      />
      <button type="submit" class="todo-input__submit" :disabled="!title.trim()">
        添加
      </button>
    </div>

    <div class="todo-input__options">
      <label class="todo-input__option">
        <span class="todo-input__label">优先级</span>
        <select v-model="priority" class="todo-input__select">
          <option
            v-for="(label, key) in PRIORITY_LABELS"
            :key="key"
            :value="key"
          >
            {{ label }}
          </option>
        </select>
      </label>

      <label class="todo-input__option">
        <span class="todo-input__label">截止日期</span>
        <input v-model="dueDate" type="date" class="todo-input__date" />
      </label>

      <label class="todo-input__option">
        <span class="todo-input__label">分类</span>
        <select v-model="category" class="todo-input__select">
          <option value="">无分类</option>
          <option v-for="item in props.categories" :key="item" :value="item">
            {{ item }}
          </option>
        </select>
      </label>
    </div>
  </form>
</template>

<style scoped>
.todo-input {
  background: var(--color-surface);
  border-radius: var(--radius-lg);
  box-shadow: var(--shadow-sm);
  overflow: hidden;
}

.todo-input__main {
  display: flex;
  gap: var(--spacing-sm);
  padding: var(--spacing-md);
  border-bottom: 1px solid var(--color-border);
}

.todo-input__field {
  flex: 1;
  border: 1px solid var(--color-border);
  border-radius: var(--radius-md);
  padding: 10px 12px;
  font-size: var(--font-size-base);
  outline: none;
  transition: border-color 0.2s;
}

.todo-input__field:focus {
  border-color: var(--color-primary);
}

.todo-input__submit {
  border: none;
  border-radius: var(--radius-md);
  padding: 0 var(--spacing-md);
  background: var(--color-primary);
  color: #fff;
  font-size: var(--font-size-sm);
  font-weight: 500;
  transition: background-color 0.2s;
}

.todo-input__submit:hover:not(:disabled) {
  background: var(--color-primary-hover);
}

.todo-input__submit:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.todo-input__options {
  display: flex;
  flex-wrap: wrap;
  gap: var(--spacing-md);
  padding: var(--spacing-md);
}

.todo-input__option {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-xs);
  flex: 1;
  min-width: 120px;
}

.todo-input__label {
  font-size: 12px;
  color: var(--color-text-secondary);
}

.todo-input__select,
.todo-input__date {
  border: 1px solid var(--color-border);
  border-radius: var(--radius-sm);
  padding: 6px 8px;
  font-size: var(--font-size-sm);
  background: var(--color-surface);
  color: var(--color-text);
}

.todo-input__select:focus,
.todo-input__date:focus {
  outline: none;
  border-color: var(--color-primary);
}
</style>
