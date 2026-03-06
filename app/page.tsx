'use client'
import { useState, useEffect } from "react";
import { Task } from './types/task'


export default function Home() {
  const [todos, setTodos] = useState<Task[]>([]);
  const [todo, setTodo] = useState<string>("");


  useEffect(() => {
    const savedTodos = localStorage.getItem("todos");
    if (savedTodos) {
      setTodos(JSON.parse(savedTodos));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  const updateToDoList = () => {
    if (todo.trim()) {
      const newTask: Task = {
        id:Date.now().toString(),
        title: todo,
        isCompleted: false,
        createdAt: new Date(),
      };
      setTodos([...todos, newTask]);
      setTodo("");
    }
  };

  const toggleTodo = (id: string) => {
    setTodos(
      todos.map((task) =>
      task.id === id ? { ...task, isCompleted: !task.isCompleted } : task
      )
    );
  };

  const deleteTodo = (id: string) => {
    setTodos(todos.filter((task) => task.id !== id));
  };

  return (
    <div className="min-h-screen bg-[#CFAB8D] flex items-center justify-center">
      <div className="bg-[#EEEEEE] shadow-2xl rounded p-6 w-full max-w-md">
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
            className="bg-[#CFAB8D] text-white px-4 py-1 rounded hover:bg-black">
            Add
          </button>
        </div>

        <ul className="space-y-2">
          {todos.map((task) => (
            <li
              key={task.id}
              className="flex justify-between items-center bg-gray-50 px-3 py-2 rounded"
            >
              <div className="flex items-center gap-2">
                <input 
                type="checkbox"
                checked={task.isCompleted}
                onChange={() => toggleTodo(task.id)}
                className="cursor-pointer accent-[#CFAB8D]"
                />
              </div>
              <span>{task.title}</span>
              <button
                onClick={() => deleteTodo(task.id)}
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
