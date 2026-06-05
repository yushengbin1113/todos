<script setup>
import { ref, nextTick } from 'vue'
import { PRIORITY_LABELS } from '../constants'
import { getDueDateStatus, formatDueDate } from '../utils/date'

const props = defineProps({
  todo: {
    type: Object,
    required: true,
  },
  categories: {
    type: Array,
    default: () => [],
  },
})

const emit = defineEmits(['toggle', 'update', 'remove'])

const isEditing = ref(false)
const editTitle = ref('')
const editInputRef = ref(null)

const dueDateStatus = () =>
  getDueDateStatus(props.todo.dueDate, props.todo.completed)

function startEdit() {
  if (props.todo.completed) return
  isEditing.value = true
  editTitle.value = props.todo.title
  nextTick(() => editInputRef.value?.focus())
}

function saveEdit() {
  const trimmed = editTitle.value.trim()
  if (!trimmed) {
    cancelEdit()
    return
  }

  emit('update', props.todo.id, { title: trimmed })
  isEditing.value = false
}

function cancelEdit() {
  isEditing.value = false
  editTitle.value = props.todo.title
}

function handleEditKeydown(event) {
  if (event.key === 'Enter') {
    event.preventDefault()
    saveEdit()
  } else if (event.key === 'Escape') {
    cancelEdit()
  }
}
</script>

<template>
  <li
    class="todo-item"
    :class="{
      'todo-item--completed': todo.completed,
      'todo-item--editing': isEditing,
    }"
  >
    <label class="todo-item__checkbox-wrap">
      <input
        type="checkbox"
        class="todo-item__checkbox"
        :checked="todo.completed"
        @change="emit('toggle', todo.id)"
      />
      <span class="todo-item__checkmark"></span>
    </label>

    <div class="todo-item__content">
      <div v-if="isEditing" class="todo-item__edit">
        <input
          ref="editInputRef"
          v-model="editTitle"
          type="text"
          class="todo-item__edit-input"
          maxlength="200"
          @keydown="handleEditKeydown"
          @blur="saveEdit"
        />
      </div>
      <div v-else class="todo-item__view" @dblclick="startEdit">
        <span class="todo-item__title">{{ todo.title }}</span>
        <div class="todo-item__meta">
          <span
            class="todo-item__priority"
            :class="`todo-item__priority--${todo.priority}`"
            :title="`优先级：${PRIORITY_LABELS[todo.priority]}`"
          ></span>
          <span
            v-if="todo.dueDate"
            class="todo-item__due"
            :class="`todo-item__due--${dueDateStatus()}`"
          >
            {{ formatDueDate(todo.dueDate) }}
          </span>
          <span v-if="todo.category" class="todo-item__category">
            {{ todo.category }}
          </span>
        </div>
      </div>
    </div>

    <div v-if="!isEditing" class="todo-item__actions">
      <button
        type="button"
        class="todo-item__action"
        title="编辑"
        :disabled="todo.completed"
        @click="startEdit"
      >
        编辑
      </button>
      <button
        type="button"
        class="todo-item__action todo-item__action--danger"
        title="删除"
        @click="emit('remove', todo.id)"
      >
        删除
      </button>
    </div>
  </li>
</template>

<style scoped>
.todo-item {
  display: flex;
  align-items: flex-start;
  gap: var(--spacing-md);
  padding: var(--spacing-md);
  background: var(--color-surface);
  border-bottom: 1px solid var(--color-border);
  transition: background-color 0.2s;
}

.todo-item:first-child {
  border-top-left-radius: var(--radius-lg);
  border-top-right-radius: var(--radius-lg);
}

.todo-item:last-child {
  border-bottom: none;
  border-bottom-left-radius: var(--radius-lg);
  border-bottom-right-radius: var(--radius-lg);
}

.todo-item:hover {
  background: #fafbfc;
}

.todo-item--completed .todo-item__title {
  text-decoration: line-through;
  color: var(--color-text-secondary);
}

.todo-item__checkbox-wrap {
  position: relative;
  display: flex;
  align-items: center;
  margin-top: 2px;
  cursor: pointer;
}

.todo-item__checkbox {
  position: absolute;
  opacity: 0;
  width: 0;
  height: 0;
}

.todo-item__checkmark {
  position: relative;
  display: block;
  width: 20px;
  height: 20px;
  border: 2px solid var(--color-border);
  border-radius: var(--radius-sm);
  transition: all 0.2s;
}

.todo-item__checkbox:checked + .todo-item__checkmark {
  background: var(--color-primary);
  border-color: var(--color-primary);
}

.todo-item__checkbox:checked + .todo-item__checkmark::after {
  content: '';
  position: absolute;
  left: 6px;
  top: 2px;
  width: 5px;
  height: 10px;
  border: solid #fff;
  border-width: 0 2px 2px 0;
  transform: rotate(45deg);
}

.todo-item__content {
  flex: 1;
  min-width: 0;
}

.todo-item__title {
  display: block;
  word-break: break-word;
  line-height: 1.5;
}

.todo-item__meta {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: var(--spacing-sm);
  margin-top: var(--spacing-xs);
}

.todo-item__priority {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  flex-shrink: 0;
}

.todo-item__priority--high {
  background: var(--color-priority-high);
}

.todo-item__priority--medium {
  background: var(--color-priority-medium);
}

.todo-item__priority--low {
  background: var(--color-priority-low);
}

.todo-item__due {
  font-size: 12px;
  padding: 2px 6px;
  border-radius: var(--radius-sm);
  background: #eef2f7;
  color: var(--color-text-secondary);
}

.todo-item__due--today {
  background: var(--color-warning-bg);
  color: var(--color-warning);
}

.todo-item__due--overdue {
  background: var(--color-danger-bg);
  color: var(--color-danger);
}

.todo-item__category {
  font-size: 12px;
  padding: 2px 8px;
  border-radius: var(--radius-sm);
  background: var(--color-primary-light);
  color: var(--color-primary);
}

.todo-item__edit-input {
  width: 100%;
  border: 1px solid var(--color-primary);
  border-radius: var(--radius-sm);
  padding: 6px 8px;
  font-size: var(--font-size-base);
  outline: none;
}

.todo-item__actions {
  display: flex;
  gap: var(--spacing-xs);
  opacity: 0;
  transition: opacity 0.2s;
}

.todo-item:hover .todo-item__actions {
  opacity: 1;
}

.todo-item__action {
  border: none;
  background: transparent;
  padding: 4px 8px;
  font-size: 12px;
  color: var(--color-text-secondary);
  border-radius: var(--radius-sm);
  transition: all 0.2s;
}

.todo-item__action:hover:not(:disabled) {
  background: #eef2f7;
  color: var(--color-text);
}

.todo-item__action:disabled {
  opacity: 0.4;
  cursor: not-allowed;
}

.todo-item__action--danger:hover {
  background: var(--color-danger-bg);
  color: var(--color-danger);
}

@media (max-width: 480px) {
  .todo-item__actions {
    opacity: 1;
  }
}
</style>
