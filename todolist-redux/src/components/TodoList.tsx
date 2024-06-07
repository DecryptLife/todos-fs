import React, { Component, useEffect, useState } from "react";
import "./todolist.css";
import { useAppSelector, useAppDispatch } from "../hooks";
import {
  addTodo,
  fetchTodos,
  editTodo,
  removeTodo,
} from "../redux/Slice/TodoSlice";
import { getTodo } from "../APIs/todoAPIs";
import { get } from "http";
const TodoList = () => {
  interface ITodo {
    id: string;
    content: string;
  }

  const todos = useAppSelector((state) => state.todos as ITodo[]);
  const dispatch = useAppDispatch();

  const [todo, setTodo] = useState<string | "">("");
  const [editId, setEditId] = useState<string | null>(null);
  const [editInput, setEditInput] = useState<string | null>(null);

  useEffect(() => {
    dispatch(fetchTodos());
  }, [dispatch]);

  const handleSubmit = () => {
    const newItem = {
      content: todo,
    };

    try {
      console.log("handle submit fn");
      dispatch(addTodo(newItem));
      setTodo("");
    } catch (e) {
      console.log("error: ", e);
    }
  };

  const handleEdit = async (id: string) => {
    if (editId === null) {
      setEditId(id);
      const updatedContent =
        todos.find((todo: ITodo) => todo.id === id)?.content || "";
      setEditInput(updatedContent);
    } else {
      try {
        dispatch(editTodo({ id, content: editInput || "" }));
        setEditId(null);
        setEditInput(null);
      } catch (e) {
        console.log("Error: ", e);
      }
    }
  };

  const handleDelete = async (id: string) => {
    try {
      console.log("In handle delete");
      dispatch(removeTodo(id));
    } catch (e) {
      console.log("Error: ", e);
    }
  };
  return (
    <div className="todo-container">
      <div className="form-container">
        <input value={todo} onChange={(e) => setTodo(e.target.value)} />
        <button onClick={handleSubmit}>submit</button>
      </div>

      <div className="list-container">
        <ul>
          {todos.map((item: ITodo) => {
            const isEdit = item.id === editId;
            return (
              <li key={item.id}>
                {/* conditional rendering */}
                {isEdit ? (
                  <input
                    value={editInput || ""}
                    onChange={(e) => setEditInput(e.target.value)}
                  />
                ) : (
                  <span>{item.content}</span>
                )}

                {/* replace span */}
                <div className="todo-action">
                  <button onClick={() => handleEdit(item.id)}>
                    {editId === item.id ? "save" : "edit"}
                    {/* save */}
                  </button>
                  <button
                    onClick={() => {
                      handleDelete(item.id);
                    }}
                  >
                    delete
                  </button>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
};

export default TodoList;
