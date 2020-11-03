import React, { useReducer, useState } from "react";

function reducer(state, action) {
  switch (action.type) {
    case "add-todo":
      return {
        todos: [...state.todos, { item: action.item, completed: false }],
      };
    case "toggle-todo":
      return {
        todos: state.todos.map((task, index) =>
          index === action.index
            ? { ...task, completed: !task.completed }
            : task
        ),
      };
    case "remove-completed":
      return {
        todos: state.todos.filter((task) => task.completed === false),
      };
    default:
      return state;
  }
}

const ToDo = () => {
  const [{ todos }, dispatch] = useReducer(reducer, { todos: [] });
  const [item, setItem] = useState();

  return (
    <div>
      <div>To Do:</div>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          dispatch({ type: "add-todo", item });
          setItem("");
        }}
      >
        <label>
          {" "}
          Add Task
          <input
            type="text"
            name="item"
            value={item}
            placeholder="task"
            onChange={(e) => setItem(e.target.value)}
          />
        </label>
        <button onClick={() => dispatch({ type: "add-todo" })}> Add</button>
        <button onClick={() => dispatch({ type: "remove-completed" })}>
          {" "}
          Clear Completed
        </button>
      </form>
      {todos.map((task, index) => (
        <div
          key={task.item}
          onClick={() => dispatch({ type: "toggle-todo", index })}
          style={{ textDecoration: task.completed ? "line-through" : "" }}
        >
          {task.item}
        </div>
      ))}
    </div>
  );
};

export default ToDo;
