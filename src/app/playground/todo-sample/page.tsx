"use client";

import { useState } from "react";

const buttonClass = "border-2 border-gray-300 bg-gray-200";

export default function Page() {
    const [todo, setTodo] = useState<string[]>([]);
    const [text, setText] = useState<string>("");

    // タスクを一覧に追加
    const add = () => {
        setTodo([...todo, text]);
        setText("");
    };

    // タスクを一覧から削除
    const remove = (index: number) => {
        const newTodo = todo.filter((_, i) => i !== index);
        setTodo(newTodo);
    };

    // タスクを上に移動
    const up = (index: number) => {
        if (index === 0) return;
        const newTodo = [...todo];
        [newTodo[index - 1], newTodo[index]] = [newTodo[index], newTodo[index - 1]];
        setTodo(newTodo);
    };

    // タスクを下に移動
    const down = (index: number) => {
        if (index === todo.length - 1) return;
        const newTodo = [...todo];
        [newTodo[index + 1], newTodo[index]] = [newTodo[index], newTodo[index + 1]];
        setTodo(newTodo);
    };

    return (
        <>
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
                <button onClick={add} className={buttonClass}>
                    Add
                </button>
            </div>

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
        </>
    );
}
