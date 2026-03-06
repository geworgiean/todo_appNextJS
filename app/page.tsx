'use client'
import { useState, useEffect } from "react";
import { Task } from './types/task'


export default function Home() {
  const [todos, setTodos] = useState<Task[]>([]);
  const [todo, setTodo] = useState<string>("");
  const [archive, setArchive] = useState<Task[]>([]);

  
  useEffect(() => {
    const savedTodos = localStorage.getItem("todos");
    const savedArchive = localStorage.getItem("archive");
    if (savedTodos) setTodos(JSON.parse(savedTodos));
    if (savedArchive) setArchive(JSON.parse(savedArchive));
  }, []);

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
    localStorage.setItem("archive", JSON.stringify(archive));
  }, [todos, archive]);

  const updateToDoList = () => {
    if (todo.trim()) {
      const newTask: Task = {
        id:Date.now().toString(),
        title: todo,
        isCompleted: false,
        createdAt: new Date(),
        dueDate: dueDate ? new Date(dueDate) : undefined,
      };
      setTodos([...todos, newTask]);
      setTodo("");
      setDueDate("");
    }
  };

  const [dueDate, setDueDate] = useState<string>("");

  const toggleTodo = (id: string) => {
  setTodos((prev) => {
    return prev.filter((task) => {
      if (task.id === id) {
        const updated = { ...task, isCompleted: !task.isCompleted };
        if (updated.isCompleted) {
          setArchive([...archive, updated]);  
          return false;  
        }
      }
      return true;
    });
  });
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
          <input 
          type="date"
          value={dueDate}
          onChange={(e) => setDueDate(e.target.value)}
          className="px-2 py-2 rounded-lg border border-[#CFAB8D]"
          />
          <button
            onClick={updateToDoList}
            className={"bg-[#CFAB8D] text-white px-5 py-2 rounded-lg shadow-md  hover:bg-[#4B2E20] hover:shadow-lg  active:scale-95 transition-all duration-300 font-semibold"}>
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
                className="w-5 h-5 accent-[#CFAB8D] cursor-pointer transition-transform duration-200 hover:scale-110"/>
              </div>
              <span className="font-bold text-center text-[#4B2E20]">{task.title}</span>
              {task.dueDate && (
                <span className="text-sm text-[#4B2E20] ml-2 font-bold">
                  Due: {new Date(task.dueDate).toLocaleDateString()}
                </span>
              )}
              <button
                onClick={() => deleteTodo(task.id)}
                className="text-red-500 hover:text-red-900">
                Delete
              </button>
            </li>
          ))}
        </ul>
        <h2 className="text-2xl font-bold text-[#4B2E20] mt-8 mb-4">Archive</h2>
        <ul className="space-y-2">
          {archive.map((task) => (
            <li 
            key={task.id}
            className="flex justify-between items-center bg-gray-300 px-3 py-2 rounded opacity-70"
            >
              <span className="line-through font-bold text-[#4B2E20]">{task.title}</span>
              <button 
                onClick={() => setArchive(archive.filter((t) => t.id !== task.id))}
                className="text-red-600 hover:text-red-900"
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
