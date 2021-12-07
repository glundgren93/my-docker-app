import React, { useState, useEffect } from "react";
import "./App.css";

import Todo from "./components/Todo";

function App() {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState({ title: "", isFinished: false });

  useEffect(() => {
    fetch("http://localhost:9000/todos")
      .then((res) => res.json())
      .then((data) => setTodos(data));
  }, []);

  const addTodo = () => {
    fetch("http://localhost:9000/todo/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newTodo),
    })
      .then((data) => {
        console.log("Success:", data);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  return (
    <main className="App">
      <div className="form">
        <form onSubmit={addTodo}>
          <label>
            Title
            <input
            className="todo-input"
              value={newTodo.title}
              onChange={(e) =>
                setNewTodo((prevState) => ({
                  ...prevState,
                  title: e.target.value,
                  id: todos.length + 1,
                }))
              }
            ></input>
          </label>
          <input type="submit" value="Create" />
        </form>
      </div>
      <div className="container">
        <div>
          {todos &&
            todos.length > 0 &&
            todos.map((todo, ix) => <Todo key={todo.id} todo={todo} />)}
        </div>
      </div>
    </main>
  );
}

export default App;
