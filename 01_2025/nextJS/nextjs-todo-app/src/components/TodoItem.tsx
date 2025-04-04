"use client";

import dayjs from "../lib/dayjs";
import { useState } from "react";
import { Todo } from "../types/todo";
import { getTagColor } from "../utils/getTagColor";
interface TodoItemProps {
  todo: Todo;
  onToggle: (id: number) => void;
  onDelete: (id: number) => void;
  onEdit: (id: number, newtext: string) => void;
}

export default function TodoItem({
  todo,
  onToggle,
  onDelete,
  onEdit,
}: TodoItemProps) {
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [editedText, setEditedText] = useState<string>(todo.text);

  const handleEditSubmit = () => {
    if (editedText.trim() !== "") {
      onEdit(todo.id, editedText.trim());
    }
    setIsEditing(false);
  };
  return (
    <li
      className="flex flex-col justify-between px-4 py-2 border rounded 
          bg-gray-50 dark:bg-gray-700 hover:bg-blue-50 dark:hover:bg-gray-600
          group transition"
      onDoubleClick={() => setIsEditing(true)}
    >
      <div className="flex justify-between flex-1">
        {isEditing ? (
          <input
            type="text"
            value={editedText}
            onChange={(e) => setEditedText(e.target.value)}
            onBlur={handleEditSubmit}
            onKeyDown={(e) => {
              if (e.key === "Enter") handleEditSubmit();
              if (e.key === "Escape") setIsEditing(false);
            }}
            autoFocus
            className="flex-1 border px-2 py-1 rounded focus:outline-none focus:ring-2 focus:ring-blue-300"
          />
        ) : (
          <>
            <span
              onClick={() => onToggle(todo.id)}
              className={`cursor-pointer flex-1 ${
                todo.completed
                  ? "line-through text-gray-400"
                  : "text-gray-800 dark:text-neutral-50"
              } group-hover:text-blue-700 transition`}
            >
              {todo.text}
            </span>
            <p className="text-xs text-gray-400 mt-1">
              🕒 {dayjs(todo.createdAt).fromNow()}
            </p>
          </>
        )}
        <button
          onClick={() => onDelete(todo.id)}
          className="text-red-400 hover:text-red-600 transition ml-4 cursor-pointer"
        >
          ❌
        </button>
      </div>
      {todo.tags && todo.tags.length > 0 && (
        <div className="flex flex-wrap gap-1 mt-1 justify-end">
          {todo.tags.map((tag, idx) => (
            <span
              key={idx}
              className={`text-xs px-2 py-0.5 rounded-full font-medium ${getTagColor(
                tag
              )}`}
            >
              #{tag}
            </span>
          ))}
        </div>
      )}
    </li>
  );
}
