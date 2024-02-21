"use client";

import { useContext, useState } from "react";

import { TodoContext, TodoProvider } from "./hooks";

const buttonClass = "border-2 border-gray-300 bg-gray-200";

const TaskList = () => {
    const { todo, up, down, remove } = useContext(TodoContext);

    return (
        <ul>
            {todo.map((t, i) => (
                <li key={i} className="flex gap-2">
                    <button className={buttonClass} onClick={() => up(i)}>
                        Up
                    </button>
                    <button className={buttonClass} onClick={() => down(i)}>
                        Down
                    </button>
                    <button className={buttonClass} onClick={() => remove(i)}>
                        Remove
                    </button>

                    <span>{t}</span>
                </li>
            ))}
        </ul>
    );
};

const TaskInput = () => {
    const { add } = useContext(TodoContext);
    const [text, setText] = useState<string>("");

    return (
        <div>
            <input
                type="text"
                className="border-2 border-gray-300"
                onChange={(e) => {
                    e.preventDefault();
                    setText(e.target.value);
                }}
                value={text}
            />
            <button
                onClick={() => {
                    add(text);
                    setText("");
                }}
                className={buttonClass}
            >
                Add
            </button>
        </div>
    );
};

export default function Page() {
    return (
        <TodoProvider>
            <TaskInput />
            <TaskList />
        </TodoProvider>
    );
}
