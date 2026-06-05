import { ref, computed } from 'vue'
import {
  STORAGE_KEY,
  CATEGORIES_STORAGE_KEY,
  FILTER_STATUS,
  FILTER_ALL_CATEGORY,
  PRIORITY,
  PRIORITY_ORDER,
  DEFAULT_CATEGORIES,
} from '../constants'
import { getItem, setItem } from '../utils/storage'
import { createId } from '../utils/id'

function createTodo({
  title,
  priority = PRIORITY.MEDIUM,
  dueDate = null,
  category = '',
}) {
  const now = Date.now()
  return {
    id: createId(),
    title: title.trim(),
    completed: false,
    priority,
    dueDate,
    category,
    createdAt: now,
    updatedAt: now,
  }
}

export function useTodos() {
  const todos = ref(getItem(STORAGE_KEY, []))
  const categories = ref(getItem(CATEGORIES_STORAGE_KEY, DEFAULT_CATEGORIES))
  const filter = ref(FILTER_STATUS.ALL)
  const categoryFilter = ref(FILTER_ALL_CATEGORY)

  function persistTodos() {
    setItem(STORAGE_KEY, todos.value)
  }

  function persistCategories() {
    setItem(CATEGORIES_STORAGE_KEY, categories.value)
  }

  function addTodo({ title, priority, dueDate, category }) {
    const trimmed = title?.trim()
    if (!trimmed) return false

    todos.value.unshift(
      createTodo({
        title: trimmed,
        priority: priority || PRIORITY.MEDIUM,
        dueDate: dueDate || null,
        category: category || '',
      }),
    )
    persistTodos()
    return true
  }

  function toggleTodo(id) {
    const todo = todos.value.find((item) => item.id === id)
    if (!todo) return

    todo.completed = !todo.completed
    todo.updatedAt = Date.now()
    persistTodos()
  }

  function updateTodo(id, updates) {
    const todo = todos.value.find((item) => item.id === id)
    if (!todo) return false

    if (updates.title !== undefined) {
      const trimmed = updates.title.trim()
      if (!trimmed) return false
      todo.title = trimmed
    }

    if (updates.priority !== undefined) todo.priority = updates.priority
    if (updates.dueDate !== undefined) todo.dueDate = updates.dueDate || null
    if (updates.category !== undefined) todo.category = updates.category || ''

    todo.updatedAt = Date.now()
    persistTodos()
    return true
  }

  function removeTodo(id) {
    todos.value = todos.value.filter((item) => item.id !== id)
    persistTodos()
  }

  function clearCompleted() {
    todos.value = todos.value.filter((item) => !item.completed)
    persistTodos()
  }

  function setFilter(value) {
    filter.value = value
  }

  function setCategoryFilter(value) {
    categoryFilter.value = value
  }

  function addCategory(name) {
    const trimmed = name?.trim()
    if (!trimmed || categories.value.includes(trimmed)) return false

    categories.value.push(trimmed)
    persistCategories()
    return true
  }

  const filteredTodos = computed(() => {
    let result = [...todos.value]

    if (filter.value === FILTER_STATUS.ACTIVE) {
      result = result.filter((item) => !item.completed)
    } else if (filter.value === FILTER_STATUS.COMPLETED) {
      result = result.filter((item) => item.completed)
    }

    if (categoryFilter.value !== FILTER_ALL_CATEGORY) {
      result = result.filter((item) => item.category === categoryFilter.value)
    }

    result.sort((a, b) => {
      const priorityDiff =
        PRIORITY_ORDER[a.priority ?? PRIORITY.MEDIUM] -
        PRIORITY_ORDER[b.priority ?? PRIORITY.MEDIUM]
      if (priorityDiff !== 0) return priorityDiff
      return b.createdAt - a.createdAt
    })

    return result
  })

  const activeCount = computed(
    () => todos.value.filter((item) => !item.completed).length,
  )

  const completedCount = computed(
    () => todos.value.filter((item) => item.completed).length,
  )

  return {
    todos,
    categories,
    filter,
    categoryFilter,
    filteredTodos,
    activeCount,
    completedCount,
    addTodo,
    toggleTodo,
    updateTodo,
    removeTodo,
    clearCompleted,
    setFilter,
    setCategoryFilter,
    addCategory,
  }
}
