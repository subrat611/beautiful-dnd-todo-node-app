export default function TodosHeader({
  theme,
  setLeftTask,
  filterTodosType,
  setTodosFilter,
  handleClearCompleted,
}) {
  return (
    <div className="todos-filter-wrapper">
      <p className="filter-task-left">{setLeftTask} task left</p>
      <div className="filter-options">
        <button
          type="button"
          className={`${theme === "light" ? "light-theme" : "dark-theme"} ${
            filterTodosType === "All" ? "btn btn-active" : ""
          }`}
          onClick={() => setTodosFilter("All")}
        >
          All
        </button>
        <button
          type="button"
          className={filterTodosType === "Active" ? "btn-active" : null}
          onClick={() => setTodosFilter("Active")}
        >
          Active
        </button>
        <button
          type="button"
          className={filterTodosType === "Completed" ? "btn-active" : null}
          onClick={() => setTodosFilter("Completed")}
        >
          Completed
        </button>
      </div>
      <p className="filter-clear" onClick={handleClearCompleted}>
        Clear Completed
      </p>
    </div>
  );
}
