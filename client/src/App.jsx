import { useState } from "react";
import { BsSun, BsMoonFill } from "react-icons/bs";
import { DragDropContext } from "react-beautiful-dnd";
import TodoList from "./components/TodoList";
import TodosHeader from "./components/TodosHeader";

export default function App() {
  const [theme, setTheme] = useState("dark");
  const [todos, setTodos] = useState([]);
  const [inputTask, setInputTask] = useState("");
  const [filterTodosType, setTodosFilterType] = useState("All");

  const handleTodos = (e) => {
    setInputTask(e.target.value);
  };

  const handleSubmit = (e) => {
    if (e.keyCode === 13 && inputTask !== "") {
      setTodos((prev) => [
        {
          id: prev.length + 1,
          task: inputTask,
          isCompleted: false,
        },
        ...prev,
      ]);
      setInputTask("");
    }

    if (e.target.name === "add-todo" && inputTask !== "") {
      setTodos((prev) => [
        {
          id: prev.length + 1,
          task: inputTask,
          isCompleted: false,
        },
        ...prev,
      ]);
      setInputTask("");
    }
  };

  const handleDelete = (selectedTodoId) => {
    setTodos(todos.filter((todo, _) => todo.id !== selectedTodoId));
  };

  const handleTaskComplete = (checkedItemId) => {
    setTodos(
      todos.map((todo, _) => {
        if (todo.id === checkedItemId) {
          return {
            ...todo,
            isCompleted: !todo.isCompleted,
          };
        }
        return todo;
      })
    );
  };

  const handleTodosFilter = () => {
    if (filterTodosType === "All") return todos;
    if (filterTodosType === "Active")
      return todos.filter((todo, _) => todo.isCompleted !== true);
    if (filterTodosType === "Completed")
      return todos.filter((todo, _) => todo.isCompleted === true);
  };

  const handleClearCompleted = () => {
    setTodos(todos.filter((todo, _) => todo.isCompleted !== true));
  };

  const setLeftTaskInTodos = () => {
    return todos.filter((todo, _) => todo.isCompleted !== true).length;
  };

  const handleOnDragEnd = (result) => {
    const { source, destination } = result;
    if (!destination) return;
    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    )
      return;

    let add,
      active = todos;

    if (source.droppableId === "todos") {
      add = active[source.index];
      active.splice(source.index, 1);
    }

    if (destination.droppableId === "todos") {
      active.splice(destination.index, 0, add);
    }
  };

  return (
    <DragDropContext onDragEnd={handleOnDragEnd}>
      <div className={theme === "light" ? "App" : "App dark-theme"}>
        <div className="app-header">
          <h2>TODO APP</h2>
          {theme === "light" ? (
            <BsMoonFill
              className="moon-icon"
              onClick={() => setTheme("dark")}
            />
          ) : (
            <BsSun className="sun-icon" onClick={() => setTheme("light")} />
          )}
        </div>
        <input
          className={theme === "light" ? "light-theme" : " dark-theme"}
          type="text"
          placeholder="Add a task"
          value={inputTask}
          onChange={handleTodos}
          onKeyDown={handleSubmit}
        />
        <button
          className="add-todo-btn visible"
          name="add-todo"
          onClick={handleSubmit}
        >
          Add Todo
        </button>
        <div className="todos">
          {todos.length > 0 && (
            <TodosHeader
              theme={theme}
              setLeftTask={setLeftTaskInTodos()}
              filterTodosType={filterTodosType}
              setTodosFilter={setTodosFilterType}
              handleClearCompleted={handleClearCompleted}
            />
          )}
          {handleTodosFilter().length > 0 && (
            <TodoList
              theme={theme}
              todos={handleTodosFilter()}
              handleDelete={handleDelete}
              handleTaskComplete={handleTaskComplete}
            />
          )}
        </div>
      </div>
    </DragDropContext>
  );
}
