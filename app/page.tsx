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
    <div className="min-h-screen flex items-center justify-center bg-[#CFAB8D] _#FDFBF9,_#CFAB8D)]">
      <div className="bg-white/80 backdrop-blur-md border border-[#CFAB8D] rounded-xl shadow-2xl p-8 w-full max-w-lg">
        <h1 className="text-4xl font-extrabold text-center text-[#4B2E20] mb-8">TodoApp</h1>
        <div className="flex gap-2 mb-4">
          <input
            type="text"
            value={todo}
            onChange={(e) => setTodo(e.target.value)}
            className={"w-full px-4 py-2 rounded-lg border border-[#CFAB8D] focus:outline-none focus:ring-2 focus:ring-[#CFAB8D] focus:shadow-lg transition-all duration-300"}
            placeholder="Add a task..."
          />
          <button
            onClick={updateToDoList}
            className="bg-[#CFAB8D] text-white px-5 py-2 rounded-lg shadow-md 
                       hover:bg-[#4B2E20] hover:shadow-lg 
                       active:scale-95 transition-all duration-300 font-semibold">
                       Add
          </button>
        </div>

        <ul className="space-y-2">
          {todos.map((task) => (
            <li
              key={task.id}
              className="flex justify-between items-center bg-gray-50 px-3 py-2 rounded hover:shadow-lg hover:scale-[1.02] transation-all duration-300"
            >
              <div className="flex items-center gap-2">
                <input 
                type="checkbox"
                checked={task.isCompleted}
                onChange={() => toggleTodo(task.id)}
                className="w-5 h-5 accent-[#CFAB8D] cursor-pointer transition-transform duration-200 hover:scale-110"
/>
              </div>
              <span className="font-bold text-center text-[#4B2E20]">{task.title}</span>
              <button
                onClick={() => deleteTodo(task.id)}
                className="text-red-500 hover:text-red-900">
                Delete
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
