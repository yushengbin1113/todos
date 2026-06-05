<script setup>
import { useTodos } from './composables/useTodos'
import PersonalBanner from './components/PersonalBanner.vue'
import TodoInput from './components/TodoInput.vue'
import TodoFilter from './components/TodoFilter.vue'
import TodoList from './components/TodoList.vue'
import TodoFooter from './components/TodoFooter.vue'

const {
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
} = useTodos()

const avatarUrl = `${import.meta.env.BASE_URL}avatar.jpg`
</script>

<template>
  <div class="app">
    <PersonalBanner
      :image-src="avatarUrl"
      image-alt="个人头像"
      title="英雄联盟"
      subtitle="6.7-6.10高考加油"
    />

    <div class="app-body">
      <header class="app-header">
        <h1 class="app-title">Todos</h1>
        <p class="app-subtitle">管理你的待办事项</p>
      </header>

      <main class="app-main">
        <TodoInput :categories="categories" @add="addTodo" />

        <TodoFilter
          :filter="filter"
          :category-filter="categoryFilter"
          :categories="categories"
          @update:filter="setFilter"
          @update:category-filter="setCategoryFilter"
        />

        <TodoList
          :todos="filteredTodos"
          :categories="categories"
          :has-any-todos="todos.length > 0"
          @toggle="toggleTodo"
          @update="updateTodo"
          @remove="removeTodo"
        />

        <TodoFooter
          v-if="todos.length > 0"
          :active-count="activeCount"
          :completed-count="completedCount"
          @clear-completed="clearCompleted"
        />
      </main>
    </div>
  </div>
</template>

<style scoped>
.app {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

.app-body {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: var(--spacing-xl) var(--spacing-md) var(--spacing-xl);
  margin-top: var(--spacing-md);
}

.app-header {
  text-align: center;
  margin-bottom: var(--spacing-xl);
}

.app-title {
  font-size: var(--font-size-xl);
  font-weight: 600;
  color: var(--color-text);
  margin-bottom: var(--spacing-sm);
}

.app-subtitle {
  font-size: var(--font-size-sm);
  color: var(--color-text-secondary);
}

.app-main {
  width: 100%;
  max-width: var(--container-width);
}
</style>
