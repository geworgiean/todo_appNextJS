'use client'
import { useState } from "react";

export default function Home() {
  const [todos, setTodos] = useState<string[]>([]);
  const [todo, setTodo] = useState<string>("");

  const updateToDoList = () => {
    if (todo.trim()) {
      setTodos([...todos, todo]);
      setTodo("");
    }
  };

  const deleteTodo = (index: number) => {
    setTodos(todos.filter((_, i) => i !== index));
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="bg-white shadow-lg rounded p-6 w-full max-w-md">
        <h1 className="text-2xl font-bold mb-4 text-center">TodoApp</h1>
        
        <div className="flex gap-2 mb-4">
          <input
            type="text"
            value={todo}
            onChange={(e) => setTodo(e.target.value)}
            className="flex-1 border rounded px-2 py-1 focus:outline-none focus:ring-2 focus:ring-blue-400"
            placeholder="Add a task..."
          />
          <button
            onClick={updateToDoList}
            className="bg-blue-500 text-white px-4 py-1 rounded hover:bg-blue-600"
          >
            Add
          </button>
        </div>

        <ul className="space-y-2">
          {todos.map((value, index) => (
            <li
              key={index}
              className="flex justify-between items-center bg-gray-50 px-3 py-2 rounded"
            >
              <span>{value}</span>
              <button
                onClick={() => deleteTodo(index)}
                className="text-red-500 hover:text-red-700"
              >
                Delete
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
