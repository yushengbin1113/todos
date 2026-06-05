export function toDateString(date = new Date()) {
  const year = date.getFullYear()
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const day = String(date.getDate()).padStart(2, '0')
  return `${year}-${month}-${day}`
}

export function getDueDateStatus(dueDate, completed) {
  if (!dueDate || completed) return 'none'

  const today = toDateString()
  if (dueDate < today) return 'overdue'
  if (dueDate === today) return 'today'
  return 'upcoming'
}

export function formatDueDate(dueDate) {
  if (!dueDate) return ''
  const [year, month, day] = dueDate.split('-')
  return `${month}/${day}`
}
