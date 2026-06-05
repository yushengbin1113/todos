<script setup>
import { FILTER_STATUS, FILTER_ALL_CATEGORY } from '../constants'

const props = defineProps({
  filter: {
    type: String,
    required: true,
  },
  categoryFilter: {
    type: String,
    required: true,
  },
  categories: {
    type: Array,
    default: () => [],
  },
})

const emit = defineEmits(['update:filter', 'update:categoryFilter'])

const statusOptions = [
  { value: FILTER_STATUS.ALL, label: '全部' },
  { value: FILTER_STATUS.ACTIVE, label: '进行中' },
  { value: FILTER_STATUS.COMPLETED, label: '已完成' },
]

function setFilter(value) {
  emit('update:filter', value)
}

function setCategoryFilter(value) {
  emit('update:categoryFilter', value)
}
</script>

<template>
  <div class="todo-filter">
    <div class="todo-filter__status">
      <button
        v-for="option in statusOptions"
        :key="option.value"
        type="button"
        class="todo-filter__btn"
        :class="{ 'todo-filter__btn--active': props.filter === option.value }"
        @click="setFilter(option.value)"
      >
        {{ option.label }}
      </button>
    </div>

    <div class="todo-filter__category">
      <label class="todo-filter__category-label" for="category-filter">
        分类
      </label>
      <select
        id="category-filter"
        class="todo-filter__select"
        :value="props.categoryFilter"
        @change="setCategoryFilter($event.target.value)"
      >
        <option :value="FILTER_ALL_CATEGORY">全部分类</option>
        <option v-for="item in props.categories" :key="item" :value="item">
          {{ item }}
        </option>
      </select>
    </div>
  </div>
</template>

<style scoped>
.todo-filter {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  gap: var(--spacing-md);
  margin: var(--spacing-lg) 0 var(--spacing-md);
}

.todo-filter__status {
  display: flex;
  gap: var(--spacing-xs);
  background: var(--color-surface);
  padding: var(--spacing-xs);
  border-radius: var(--radius-md);
  box-shadow: var(--shadow-sm);
}

.todo-filter__btn {
  border: none;
  background: transparent;
  padding: 6px 14px;
  border-radius: var(--radius-sm);
  font-size: var(--font-size-sm);
  color: var(--color-text-secondary);
  transition: all 0.2s;
}

.todo-filter__btn:hover {
  color: var(--color-text);
}

.todo-filter__btn--active {
  background: var(--color-primary);
  color: #fff;
}

.todo-filter__category {
  display: flex;
  align-items: center;
  gap: var(--spacing-sm);
}

.todo-filter__category-label {
  font-size: var(--font-size-sm);
  color: var(--color-text-secondary);
}

.todo-filter__select {
  border: 1px solid var(--color-border);
  border-radius: var(--radius-sm);
  padding: 6px 10px;
  font-size: var(--font-size-sm);
  background: var(--color-surface);
  color: var(--color-text);
}

.todo-filter__select:focus {
  outline: none;
  border-color: var(--color-primary);
}
</style>
