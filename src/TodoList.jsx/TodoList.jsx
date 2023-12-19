import React, { useEffect, useState } from "react";
import { IoMdClose } from "react-icons/io";
import { FaCheck } from "react-icons/fa";
import { v4 as uuidv4 } from "uuid";

const data = [];

function TodoList({darkMode, setDarkMode}) {
  const [todoList, setTodoList] = useState(data);
  const [text, setText] = useState("");
  const [lineThrough, setLineThrough] = useState(false);
  const [activeFilter, setActiveFilter] = useState("All"); // 'All', 'Active', or 'Completed'

  const handleSubmit = (e) => {
    e.preventDefault();

    const newTodo = {
      id: uuidv4(),
      text: text,
      checked: false,
    };

    setTodoList((prev) => [...prev, newTodo]);
    setText("");
  };

  const onDelete = (id) => {
    const updatedList = todoList.filter((todo) => todo.id !== id);
    setTodoList(updatedList);
  };

  const handleChecking = (id) => {
    setLineThrough(!lineThrough);
    setTodoList((prev) =>
      prev.map((todo) =>
        todo.id === id ? { ...todo, checked: !todo.checked } : todo
      )
    );
  };

  const handleFilterAll = () => {
    setActiveFilter("All");
    // No filtering needed for 'All', set the whole list
    setTodoList(todoList);
  };

  const handleFilterActive = () => {
    setActiveFilter("Active");
    const unCheckedList = todoList.filter((e) => !e.checked);
    setTodoList(unCheckedList);
  };

  const handleFilterCompleted = () => {
    setActiveFilter("Completed");
    const checkedList = todoList.filter((e) => e.checked);
    setTodoList(checkedList);
  };

  const handleReset = () => {
    setText("");
    setTodoList([]);
  };

  return (
    <div className="todo">
      <form className={`input-form ${darkMode ? "darker": "white"}`} onSubmit={handleSubmit}>
      {darkMode ? (<button
                onClick={() => handleChecking(item.id)}
                className={`checkbox-dark`}
              >
              </button>):
              (<button
                onClick={() => handleChecking(item.id)}
                className={`checkbox`}
              >
              </button>)}
        <input className={`${darkMode ? "darker": "white"}`}
          value={text}
          onChange={(e) => setText(e.target.value)}
          type="text"
          placeholder="create a new todo..."
        />
      </form>

      <ul className={`todo-lists ${darkMode ? "darker": "white"}`}>
        {todoList.map((item) => (
          <li className="todo-list" key={item.id}>
            <div>
              {darkMode ? (<button
                onClick={() => handleChecking(item.id)}
                className={`checkbox-dark ${item.checked ? "checked" : ""}`}
              >
                {item.checked && (
                  <FaCheck style={{ position: "relative", top: "3px" }} />
                )}
              </button>):
              (<button
                onClick={() => handleChecking(item.id)}
                className={`checkbox ${item.checked ? "checked" : ""}`}
              >
                {item.checked && (
                  <FaCheck style={{ position: "relative", top: "3px" }} />
                )}
              </button>)}
              <p className={item.checked ? "line-through" : ""}>{item.text}</p>
            </div>
            <IoMdClose
              onClick={() => onDelete(item.id)}
              className={`close ${darkMode ? "dark":"white"}`}
            ></IoMdClose>
          </li>
        ))}
        <div className="todo-functions">
          <div>
            {`${
              todoList.length -
              todoList.filter((e) => e.checked === true).length
            } ${todoList.length === 1 ? "task" : "tasks"} left`}
          </div>
          <div className="filters">
            <button
              onClick={handleFilterAll}
              className={`${activeFilter === "All" ? "active" : ""} ${darkMode ? "darker":"light"}`}
            >
              All
            </button>
            <button
              onClick={handleFilterActive}
              className={`${activeFilter === "Active" ? "active" : ""} ${darkMode ? "darker":"light"}`}
            >
              Active
            </button>
            <button
              onClick={handleFilterCompleted}
              className={`${activeFilter === "Completed" ? "active" : ""} ${darkMode ? "darker":"light"}`}
            >
              Completed
            </button>
          </div>
          <div>
            <button className={`${darkMode ? "darker":"light"}`} onClick={handleReset}>Clear</button>
            <button className={` ${darkMode ? "darker":"light"}`}>Completed</button>
          </div>
        </div>
      </ul>
      <div className="mobile-filters">
      <div className="filters">
            <button
              onClick={handleFilterAll}
              className={`${activeFilter === "All" ? "active" : ""} ${darkMode ? "darker":"light"}`}
            >
              All
            </button>
            <button
              onClick={handleFilterActive}
              className={`${activeFilter === "Active" ? "active" : ""} ${darkMode ? "darker":"light"}`}
            >
              Active
            </button>
            <button
              onClick={handleFilterCompleted}
              className={`${activeFilter === "Completed" ? "active" : ""} ${darkMode ? "darker":"light"}`}
            >
              Completed
            </button>
          </div>
        </div>
    </div>
  );
}

export default TodoList;
