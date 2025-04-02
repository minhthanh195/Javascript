"use client";

import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { Todo } from "../types/todo";
import TodoItem from "../components/TodoItem";
import Clock from "@/components/test";
import { useLocalStorage } from "@/hooks/useLocalStorage";
export default function Home() {
  const [newTodo, setNewTodo] = useState<string>("");
  const [show, setShow] = useState<boolean>(true);
  
  const [todos, setTodos] = useLocalStorage<Todo[]>('todos', [
    {id: 1, text: 'hello', completed: false},
    {id: 2, text: 'hello2', completed: false},
    {id: 3, text: 'hello3', completed: false}
  ]);

  const handleChangeInput = (e: ChangeEvent<HTMLInputElement>) => {
    setNewTodo(e.target.value);
  };

  const handleSubmitForm = (e: FormEvent) => {
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

  return (
    <>
      <h1 className="text-3xl font-bold underline">To-do App</h1>

      <ul>
        {todos.map((todo) => (
          <TodoItem
            key={todo.id}
            todo={todo}
            onToggle={toggleCompleted}
            onDelete={deleteTodo}
          />
        ))}
      </ul>

      <form onSubmit={handleSubmitForm} style={{ marginBottom: "20px" }}>
        <input
          type="text"
          value={newTodo}
          onChange={handleChangeInput}
          placeholder="add work here"
          style={{ padding: "8px", width: "300px" }}
        />
        <button type="submit" style={{ marginLeft: "10px", padding: "8px" }}>
          Add
        </button>
      </form>

      <div>
        <button onClick={() => setShow(!show)}>Toggle</button>
        {show && <Clock />}
      </div>

      
    </>
  );
}
