'use client'
import { useState, useEffect } from "react";
import { Task } from "./types/task";
import { FaEdit, FaSave, FaTimes, FaTrash } from "react-icons/fa";

export default function Home() {
  const [todos, setTodos] = useState<Task[]>([]);
  const [todo, setTodo] = useState<string>("");
  const [archive, setArchive] = useState<Task[]>([]);
  const [dueDate, setDueDate] = useState<string>("");
  const [editDate, setEditDate] = useState<string>("");
  const [editText, setEditText] = useState<string>("");
  const [editingId, setEditingId] = useState<string | null>(null);

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
        id: Date.now().toString(),
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

  const toggleTodo = (id: string) => {
    setTodos((prev) =>
      prev.filter((task) => {
        if (task.id === id) {
          const updated = { ...task, isCompleted: !task.isCompleted };
          if (updated.isCompleted) {
            setArchive([...archive, updated]);
            return false;
          }
        }
        return true;
      })
    );
  };

  const deleteTodo = (id: string) => {
    setTodos(todos.filter((task) => task.id !== id));
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-[#CFAB8D] via-[#fde4cc] to-[#4B2E20] animate-gradient">
      <div className="bg-white/80 backdrop-blur-md border border-[#CFAB8D] rounded-xl shadow-2xl p-12 w-full max-w-3xl">
        <h1 className="text-5xl font-extrabold text-center text-[#4B2E20] mb-10">TodoApp</h1>

        <div className="flex gap-3 mb-6">
          <input
            type="text"
            value={todo}
            onChange={(e) => setTodo(e.target.value)}
            className="w-full px-5 py-3 rounded-lg border border-[#CFAB8D] focus:outline-none focus:ring-2 focus:ring-[#CFAB8D] focus:shadow-lg transition-all duration-300 text-lg font-semibold"
            placeholder="Add a task..."
          />
          <input
            type="date"
            value={dueDate}
            onChange={(e) => setDueDate(e.target.value)}
            className="px-3 py-3 rounded-lg border border-[#CFAB8D] text-lg"
          />
          <button
            onClick={updateToDoList}
            className="bg-[#CFAB8D] text-white px-6 py-3 rounded-lg shadow-md hover:bg-[#4B2E20] hover:shadow-lg active:scale-95 transition-all duration-300 text-lg font-semibold"
          >
            Add
          </button>
        </div>

        <ul className="space-y-3">
          {todos.map((task) => (
            <li
              key={task.id}
              className="flex justify-between items-center bg-gray-50 px-4 py-3 rounded-lg hover:shadow-lg hover:scale-[1.02] transition-all duration-300 text-lg"
            >
              <input
                type="checkbox"
                checked={task.isCompleted}
                onChange={() => toggleTodo(task.id)}
                className="w-6 h-6 accent-[#CFAB8D] cursor-pointer transition-transform duration-200 hover:scale-110"
              />

              {editingId === task.id ? (
                <div className="flex items-center gap-3">

                  <input
                    type="text"
                    value={editText}
                    onChange={(e) => setEditText(e.target.value)}
                    className="border border-[#CFAB8D] rounded px-3 py-2 text-lg"
                  />

                  <div className="ml-0">
                    <input
                      type="date"
                      value={
                        editDate ||
                        (task.dueDate
                          ? new Date(task.dueDate).toISOString().split("T")[0]
                          : "")
                      }
                      onChange={(e) => setEditDate(e.target.value)}
                      className="border border-[#CFAB8D] rounded px-3 py-2 text-lg"
                    />
                  </div>

                  <button
                    onClick={() => {
                      setTodos(
                        todos.map((t) =>
                          t.id === task.id
                            ? {
                                ...t,
                                title: editText,
                                dueDate: editDate
                                  ? new Date(editDate)
                                  : undefined,
                              }
                            : t
                        )
                      );
                      setEditingId(null);
                      setEditText("");
                      setEditDate("");
                    }}
                    className="text-[#CFAB8D] hover:text-[#4B2E20]"
                  >
                    <FaSave className="w-6 h-6" />
                  </button>
                  <button
                    onClick={() => {
                      setEditingId(null);
                      setEditText("");
                      setEditDate("");
                    }}
                    className="text-gray-500 hover:text-gray-700 flex items-center gap-1"
                  >
                    <FaTimes className="w-6 h-6" />
                  </button>
                </div>
              ) : (
                <span className="ml-3 font-bold text-[#4B2E20]">{task.title}</span>
              )}

              {task.dueDate && (
                <span className="text-sm text-[#4B2E20] ml-2 font-bold">
                  Due: {new Date(task.dueDate).toLocaleDateString()}
                </span>
              )}

              {editingId !== task.id && (
                <div className="flex items-center gap-4">
                  <button
                    onClick={() => {
                      setEditingId(task.id);
                      setEditText(task.title);
                      setEditDate(
                        task.dueDate
                          ? new Date(task.dueDate).toISOString().split("T")[0]
                          : ""
                      );
                    }}
                    className="text-[#4B2E20] hover:text-[#CFAB8D]"
                  >
                    <FaEdit className="w-6 h-6" />
                  </button>
                  <button
                    onClick={() => deleteTodo(task.id)}
                    className="text-[#4B2E20] hover:text-red-500"
                  >
                    <FaTrash className="w-6 h-6" />
                  </button>
                </div>
              )}
            </li>
          ))}
        </ul>

        <h2 className="text-3xl font-bold text-[#4B2E20] mt-10 mb-6">Archive</h2>
        <ul className="space-y-3">
          {archive.map((task) => (
            <li
              key={task.id}
              className="flex justify-between items-center bg-gray-300 px-4 py-3 rounded-lg opacity-70 text-lg"
            >
              <span className="line-through font-bold text-[#4B2E20]">
                {task.title}
              </span>
              <button
                onClick={() =>
                  setArchive(archive.filter((t) => t.id !== task.id))
                }
                className="text-[#4B2E20] hover:text-red-500 flex items-center gap-2"
              >
                <FaTrash className="w-6 h-6" />
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
