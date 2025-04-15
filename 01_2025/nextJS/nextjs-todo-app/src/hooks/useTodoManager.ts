import { useEffect, useRef, useState } from 'react'
import { Todo } from '@/types/todo'

export function useTodoManager(currentGroup: string) {
  const [todos, setTodos] = useState<Todo[]>([])
  const [deletedTodos, setDeletedTodos] = useState<Todo[]>([])
  const [loading, setLoading] = useState(true)
  const undoTimers = useRef<Record<number, NodeJS.Timeout>>({})
  const [error, setError] = useState(false)

  useEffect(() => {
    fetch('/api/todos')
      .then(res => res.json())
      .then(data => setTodos(data))
      .catch(err => {
        console.error('Lỗi gọi API:', err)
        setError(true)
      })
      .finally(() => setLoading(false))
  }, [])

  useEffect(() => {
    const saved = localStorage.getItem(`todos_${currentGroup}`)
    if (saved) {
      setTodos(JSON.parse(saved))
    } else {
      setTodos([])
    }
  }, [currentGroup])

  useEffect(() => {
    if (todos.length === 0) return
    localStorage.setItem(`todos_${currentGroup}`, JSON.stringify(todos))

    const updateTodos = async () => {
      await fetch('/api/todos', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(todos),
      })
    }

    updateTodos()
  }, [todos, currentGroup])

  const addTodo = async (todo: Todo) => {
    await fetch('/api/todos', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(todo),
    })
    setTodos(prev => [todo, ...prev])
  }

  const toggleCompleted = (id: number) => {
    const updated = todos.map(todo =>
      todo.id === id
        ? {
            ...todo,
            completed: !todo.completed,
            completedAt: !todo.completedAt ? new Date().toISOString() : undefined,
          }
        : todo
    )
    setTodos(updated)
  }

  const deleteTodo = async (id: number) => {
    const deleted = todos.find(todo => todo.id === id)
    if (!deleted) return

    await fetch('/api/todos', {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id }),
    })

    setDeletedTodos(prev => [deleted, ...prev])
    setTodos(prev => prev.filter(todo => todo.id !== id))

    const timeout = setTimeout(() => {
      setDeletedTodos(prev => prev.filter(todo => todo.id !== id))
      delete undoTimers.current[id]
    }, 10000)

    undoTimers.current[id] = timeout
  }

  const editTodo = (id: number, newText: string) => {
    setTodos(prev =>
      prev.map(todo => (todo.id === id ? { ...todo, text: newText } : todo))
    )
  }

  const clearCompleted = () => {
    setTodos(prev => prev.filter(todo => !todo.completed))
  }

  const undoLastDelete = () => {
    const [last, ...rest] = deletedTodos
    if (!last) return

    if (undoTimers.current[last.id]) {
      clearTimeout(undoTimers.current[last.id])
      delete undoTimers.current[last.id]
    }

    setTodos(prev => [...prev, last])
    setDeletedTodos(rest)
  }

  return {
    todos,
    deletedTodos,
    loading,
    error,
    addTodo,
    toggleCompleted,
    deleteTodo,
    editTodo,
    clearCompleted,
    undoLastDelete,
    setTodos,
  }
}
