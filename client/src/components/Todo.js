import React, { useState, useEffect, useRef } from "react";

function Todo({ todo }) {
  const [todoContent, setTodo] = useState(todo);
  const isMounted = useRef(false);

  useEffect(() => {
    if (isMounted.current) {
      fetch("http://localhost:9000/todo/", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(todoContent),
      })
        .then((data) => {
          console.log("Success:", data);
        })
        .catch((error) => {
          console.error("Error:", error);
        });
    } else {
      isMounted.current = true;
    }
  }, [todoContent, isMounted]);

  const handleClick = () => {
    setTodo((prevState) => ({
      ...prevState,
      isFinished: !prevState.isFinished,
    }));
  };

  return (
    <div className={`content ${todoContent.isFinished ? "disabled" : ""}`}>
      <h2>{todoContent.title}</h2>

      <button onClick={() => handleClick()}>✔</button>
    </div>
  );
}

export default Todo;
