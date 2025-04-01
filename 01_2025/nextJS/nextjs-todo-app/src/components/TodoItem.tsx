'use client';

import { Todo } from "../types/todo";

interface TodoItemProps {
    todo: Todo;
    onToggle: (id : number) => void;
    onDelete: (id : number) => void;
}

export default function TodoItem({todo, onToggle, onDelete} : TodoItemProps) {
    return (
        <li></li>
    )
}