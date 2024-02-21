import { useState } from "react";
import { createContext } from "react";

export const useTodo = () => {
    const [todo, setTodo] = useState<string[]>([]);

    // タスクを一覧に追加
    const add = (text: string) => {
        setTodo([...todo, text]);
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

    return { todo, add, remove, up, down };
};

type ContextType = ReturnType<typeof useTodo>;
export const TodoContext = createContext<ContextType>({} as ContextType);

export const TodoProvider = ({ children }: { children: React.ReactNode }) => {
    const todo = useTodo();
    return <TodoContext.Provider value={todo}>{children}</TodoContext.Provider>;
};
