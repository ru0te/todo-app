import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";

export interface Todo {
  name: string;
  id: string;
  isComplete: boolean;
}

interface TodoItemProps extends Todo {
  onDelete: (id: string) => void;
}

function TodoItem({ name, id, isComplete, onDelete }: TodoItemProps) {
  return (
    <>
      <li className={`todo ${isComplete ? "completed" : ""}`}>
        <p>{name}</p>
        <button
          type="button"
          aria-label="Delete todo"
          onClick={() => onDelete(id)}
        >
          <FontAwesomeIcon icon={faTrash} />
        </button>
      </li>
    </>
  );
}

export default TodoItem;
