"use client";

import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { Todo } from "../types/todo";
import TodoItem from "../components/TodoItem";
import { useLocalStorage } from "../hooks/useLocalStorage";
import { todo } from "node:test";
import useDarkMode from "../hooks/useDarkMode";
export default function Home() {
  type FilterType = 'all' | 'doing' | 'completed';


  const [newTodo, setNewTodo] = useState<string>("");
  const [todos, setTodos] = useLocalStorage<Todo[]>('todos', []);
  const [filter, setFilter] = useState<FilterType>('all');
  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setNewTodo(e.target.value);
  };
  const handleAddTodo = (e: FormEvent) => {
    e.preventDefault();

    if (newTodo.trim() === "") return;

    const newItem: Todo = {
      id: Date.now(),
      text: newTodo,
      completed: false,
    };

    setTodos([...todos, newItem]);
    setNewTodo("");
  };
  const toggleCompleted = (id: number) => {
    const updateTodo = todos.map((todo) =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    );

    setTodos(updateTodo);
  };
  const deleteTodo = (id: number) => {
    const updateTodo = todos.filter((todo) => todo.id !== id);

    setTodos(updateTodo);
  };
  const editTodo =(id: number, newText: string) => {
    setTodos(prev => 
      prev.map(todo =>
        todo.id === id ? {...todo,text : newText} : todo
      )
    )
    console.log('a');
    
  }
  const {isDark, toggleDark} = useDarkMode();

  return (
    <>
      <main className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
        <div className="w-full max-w-xl bg-white dark:bg-gray-800 shadow rounded-xl p-6">
        <div className="flex justify-end mb-4">
          <button
            onClick={toggleDark}
            className="text-sm text-blue-600 dark:text-blue-400 hover:underline"
          >
            Chuyển sang giao diện {isDark ? 'Sáng ☀️' : 'Tối 🌙'}
          </button>
        </div>
          <h1 className="text-3xl font-bold text-blue-600 dark:text-blue-400 text-center mb-6">📝 To-do App</h1>

          <form onSubmit={handleAddTodo} className="flex gap-2 mb-6">
            <input
              type="text"
              value={newTodo}
              onChange={handleInputChange}
              placeholder="Nhập việc cần làm..."
              className="flex-1 border border-gray-300 px-4 py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
            <button
              type="submit"
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition"
            >
              Thêm
            </button>
          </form>

          <div className="flex gap-2 mb-4 justify-center">
            <button
              onClick={() => setFilter('all')}
              className={`px-3 py-1 rounded ${
                filter === 'all' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700'
              }`}
            >
              All
            </button>
            <button
              onClick={() => setFilter('doing')}
              className={`px-3 py-1 rounded ${
                filter === 'doing' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700'
              }`}
            >
              Doing
            </button>
            <button
              onClick={() => setFilter('completed')}
              className={`px-3 py-1 rounded ${
                filter === 'completed' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700'
              }`}
            >
              Completed
            </button>
        </div>
        <ul className="space-y-2">
          {todos          
          .filter(todo => {
            if(filter === 'doing') return !todo.completed
            if(filter === 'completed') return todo.completed
            return true;
          })
          .map(todo => (
            <TodoItem
              key={todo.id}
              todo={todo}
              onToggle={toggleCompleted}
              onDelete={deleteTodo}
              onEdit={editTodo}
            />
          ))}
        </ul>
        </div>
      </main>
    </>
  );
}
