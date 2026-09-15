import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";

export interface Todo {
  name: string;
  id: string;
  isComplete: boolean;
}

interface TodoItemProps extends Todo {
  onDelete: (id: string) => void;
  onToggle: (id: string) => void;
}

function TodoItem({ name, id, isComplete, onDelete, onToggle }: TodoItemProps) {
  return (
    <>
      <li
        className={`todo ${isComplete ? "completed" : ""}`}
        onClick={() => onToggle(id)}
      >
        <p>{name}</p>
        <button
          type="button"
          aria-label="Delete todo"
          onClick={(e) => {
            e.stopPropagation();
            onDelete(id);
          }}
        >
          <FontAwesomeIcon icon={faTrash} />
        </button>
      </li>
    </>
  );
}

export default TodoItem;
