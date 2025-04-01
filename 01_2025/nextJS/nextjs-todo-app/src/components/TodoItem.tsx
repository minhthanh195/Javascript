'use client';

import { Todo } from "../types/todo";

interface TodoItemProps {
    todo: Todo;
    onToggle: (id : number) => void;
    onDelete: (id : number) => void;
}

export default function TodoItem({todo, onToggle, onDelete} : TodoItemProps) {
    return (
        <li
            style={{
            marginBottom: '10px',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            width: '300px',
          }}
        >
            <span 
                onClick={() => onToggle(todo.id)}
                style={{textDecoration: todo.completed ? 'line-through' : 'none',}}
            >{todo.text}
            </span>
            <button 
                onClick={()=> onDelete(todo.id)} 
                style={{ marginLeft: '10px' }}
            >
                X
            </button>
        </li>
    )
}