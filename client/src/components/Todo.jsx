import { Draggable } from "react-beautiful-dnd";

import { BsX } from "react-icons/bs";

export default function Todo({ theme, index, todo, deleteTodo, completeTodo }) {
  return (
    <Draggable draggableId={todo.id.toString()} index={index}>
      {(provided) => (
        <div
          className={`todo-wrapper ${theme === "light" ? "" : "dark-theme"}`}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}
        >
          <input
            type="checkbox"
            checked={todo.isCompleted}
            onChange={() => completeTodo(todo.id)}
          />
          <label
            htmlFor={todo.id}
            className={todo.isCompleted ? "todo-complete" : null}
          >
            {todo.task}
          </label>
          <BsX className="cross-icon" onClick={() => deleteTodo(todo.id)} />
        </div>
      )}
    </Draggable>
  );
}
