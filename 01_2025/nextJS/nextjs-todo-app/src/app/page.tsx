"use client";

import { ChangeEvent, FormEvent, useEffect, useState, useRef } from "react";
import useDarkMode from "../hooks/useDarkMode";
import { Todo } from "../types/todo";
import TodoItem from "../components/TodoItem";
import { useLocalStorage } from "../hooks/useLocalStorage";
export default function Home() {
  type FilterType = "all" | "doing" | "completed";

  const [newTodo, setNewTodo] = useState<string>("");
  const [todos, setTodos] = useLocalStorage<Todo[]>("todos", []);
  const [filter, setFilter] = useState<FilterType>("all");
  const [deletedTodos, setDeletedTodos] = useState<Todo[]>([]);
  const undoTimers = useRef<Record<number, NodeJS.Timeout>>({});
  const [currentGroup, setCurrentGroup] = useState("Personal");
  const groupList = ["Personal", "Work", "Study"];
  const [newTags, setNewTags] = useState("");
  const { isDark, toggleDark, isReady } = useDarkMode();

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setNewTodo(e.target.value);
  };
  const handleAddTodo = (e: FormEvent) => {
    e.preventDefault();

    if (newTodo.trim() === "") return;

    const tags = newTags
      .split(",")
      .map((t) => t.trim())
      .filter(Boolean);

    const newItem: Todo = {
      id: Date.now(),
      text: newTodo,
      completed: false,
      createdAt: new Date().toISOString(),
      tags: tags,
    };

    setTodos([...todos, newItem]);
    setNewTodo("");
    setNewTags("");
  };
  const toggleCompleted = (id: number) => {
    const updateTodo = todos.map((todo) =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    );

    setTodos(updateTodo);
  };
  const deleteTodo = (id: number) => {
    const deleted = todos.find((todo) => todo.id === id);
    if (!deleted) return;

    setDeletedTodos((prev) => [deleted, ...prev]);
    setTodos((prev) => prev.filter((todo) => todo.id !== id));

    const timeout = setTimeout(() => {
      setDeletedTodos((prev) => prev.filter((todo) => todo.id !== id));
      delete undoTimers.current[id]; // xoá luôn timeout đã hết
    }, 10000);

    undoTimers.current[id] = timeout;
  };
  const editTodo = (id: number, newText: string) => {
    setTodos((prev) =>
      prev.map((todo) => (todo.id === id ? { ...todo, text: newText } : todo))
    );
    console.log("a");
  };

  const clearCompleted = () => {
    setTodos((prev) => prev.filter((todo) => !todo.completed));
  };
  const undoLastDelete = () => {
    const [last, ...rest] = deletedTodos;
    if (!last) return;
    if (undoTimers.current[last.id]) {
      clearTimeout(undoTimers.current[last.id]);
      delete undoTimers.current[last.id];
    }
    setTodos((prev) => [...prev, last]);
    setDeletedTodos(rest);
  };

  useEffect(() => {
    const saved = localStorage.getItem(`todos_${currentGroup}`);
    if (saved) {
      setTodos(JSON.parse(saved));
    } else {
      setTodos([]);
    }
  }, [currentGroup]);

  useEffect(() => {
    localStorage.setItem(`todos_${currentGroup}`, JSON.stringify(todos));
  }, [todos, currentGroup]);

  if (!isReady) {
    return (
      <div className="flex items-center justify-center h-screen bg-white dark:bg-gray-900 transition">
        <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <>
      <main className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
        <div className="w-full max-w-xl bg-white dark:bg-gray-800 shadow rounded-xl p-6">
          <div className="flex justify-end mb-4">
            <button
              onClick={toggleDark}
              className="text-sm text-blue-600 dark:text-blue-400 hover:underline cursor-pointer"
            >
              Chuyển sang giao diện {isDark ? "Sáng ☀️" : "Tối 🌙"}
            </button>
          </div>
          <div className="mb-6 flex items-center gap-4">
            <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
              📁 Danh sách:
            </label>

            <div className="relative">
              <select
                value={currentGroup}
                onChange={(e) => setCurrentGroup(e.target.value)}
                className="appearance-none bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 
                 text-sm rounded px-4 py-2 pr-8 focus:outline-none focus:ring-2 focus:ring-blue-400 
                 text-gray-800 dark:text-gray-100 shadow-sm transition"
              >
                {groupList.map((g) => (
                  <option key={g} value={g}>
                    {g}
                  </option>
                ))}
              </select>

              {/* ▼ icon */}
              <div className="pointer-events-none absolute top-1/2 right-3 -translate-y-1/2 text-gray-500 dark:text-gray-400">
                ▼
              </div>
            </div>
          </div>
          <h1 className="text-3xl font-bold text-blue-600 dark:text-blue-400 text-center mb-6">
            📝 To-do App
          </h1>

          <form onSubmit={handleAddTodo} className="flex gap-2 mb-6 flex-col">
            <input
              type="text"
              value={newTodo}
              onChange={handleInputChange}
              placeholder="Nhập việc cần làm..."
              className="flex-1 border border-gray-300 px-4 py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-400 text-zinc-700 dark:text-neutral-50"
            />
            <input
              type="text"
              value={newTags}
              onChange={(e) => setNewTags(e.target.value)}
              placeholder="Thêm tags: urgent, study, bug, personal, work, .etc"
              className="w-full mt-2 border border-gray-300 px-4 py-2 rounded text-sm focus:outline-none focus:ring-1 focus:ring-blue-400 text-zinc-700 dark:text-neutral-50"
            />
            <button
              type="submit"
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition cursor-pointer"
            >
              Thêm
            </button>
          </form>

          <div className="flex gap-2 mb-4 justify-center">
            <button
              onClick={() => setFilter("all")}
              className={`px-3 py-1 rounded ${
                filter === "all"
                  ? "bg-blue-500 text-white"
                  : "bg-gray-200 text-gray-700 cursor-pointer"
              }`}
            >
              All
            </button>
            <button
              onClick={() => setFilter("doing")}
              className={`px-3 py-1 rounded ${
                filter === "doing"
                  ? "bg-blue-500 text-white"
                  : "bg-gray-200 text-gray-700 cursor-pointer"
              }`}
            >
              Doing
            </button>
            <button
              onClick={() => setFilter("completed")}
              className={`px-3 py-1 rounded ${
                filter === "completed"
                  ? "bg-blue-500 text-white"
                  : "bg-gray-200 text-gray-700 cursor-pointer"
              }`}
            >
              Completed
            </button>
          </div>
          <ul className="space-y-2">
            {todos
              .filter((todo) => {
                if (filter === "doing") return !todo.completed;
                if (filter === "completed") return todo.completed;
                return true;
              })
              .map((todo) => (
                <TodoItem
                  key={todo.id}
                  todo={todo}
                  onToggle={toggleCompleted}
                  onDelete={deleteTodo}
                  onEdit={editTodo}
                />
              ))}
          </ul>
          {todos.some((todo) => todo.completed) && (
            <div className="mt-4 text-center">
              <button
                onClick={clearCompleted}
                className="text-sm text-red-500 hover:underline hover:text-red-600 transition cursor-pointer"
              >
                🧹 Xoá tất cả công việc đã hoàn thành
              </button>
            </div>
          )}
          {deletedTodos.length > 0 && (
            <div className="mt-4 text-center">
              <button
                onClick={undoLastDelete}
                className="text-sm text-blue-500 hover:text-blue-700 hover:underline transition cursor-pointer"
              >
                🔄 Hoàn tác
              </button>
            </div>
          )}
        </div>
      </main>
    </>
  );
}
