import { Droppable } from "react-beautiful-dnd";
import Todo from "./Todo";

export default function TodoList({
  theme,
  todos,
  handleDelete,
  handleTaskComplete,
}) {
  return (
    <Droppable droppableId="todos">
      {(provided) => (
        <div
          className="todos-wrapper"
          {...provided.droppableProps}
          ref={provided.innerRef}
        >
          {todos.map((todo, index) => (
            <Todo
              theme={theme}
              key={todo.id}
              index={index}
              todo={todo}
              deleteTodo={handleDelete}
              completeTodo={handleTaskComplete}
            />
          ))}
          {provided.placeholder}
        </div>
      )}
    </Droppable>
  );
}
