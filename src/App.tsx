import { useState } from "react";
import type { Todo } from "./components/TodoItem";
import TodoItem from "./components/TodoItem";

function App() {
  const [todos, setTodos] = useState<Todo[] | null>(null);

  const [inputValue, setInputValue] = useState("");

  function handleAddTodo(value: string): void {
    if (value) {
      const newTodo: Todo = {
        name: value,
        isComplete: false,
        id: crypto.randomUUID(),
      };
      setTodos((todos) => [...(todos ?? []), newTodo]);
      setInputValue("");
    }
  }

  function handleDeleteTodo(id: string): void {
    setTodos((prevTodos) => (prevTodos ?? []).filter((todo) => todo.id !== id));
  }

  function handleToggleTodo(id: string): void {
    setTodos((prevTodos) =>
      (prevTodos ?? []).map((todo) =>
        todo.id === id ? { ...todo, isComplete: !todo.isComplete } : todo,
      ),
    );
  }

  return (
    <>
      <div className="container">
        <div className="addTodo">
          <input
            type="text"
            placeholder="Enter task"
            value={inputValue}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setInputValue(e.target.value)
            }
          />
          <button onClick={() => handleAddTodo(inputValue)}>Add</button>
        </div>

        <ul>
          {todos?.map((todo) => (
            <TodoItem
              name={todo.name}
              id={todo.id}
              isComplete={todo.isComplete}
              key={todo.id}
              onDelete={() => handleDeleteTodo(todo.id)}
              onToggle={() => handleToggleTodo(todo.id)}
            />
          ))}
        </ul>
      </div>
    </>
  );
}

export default App;
