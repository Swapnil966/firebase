import { FaRegTrashAlt } from "react-icons/fa";

function TodoCard({ title, deletee, id }) {
  return (
    <>
      <div>
        <h1>{title}</h1>
        <button onClick={() => deletee(id)}>
          <FaRegTrashAlt />
        </button>
      </div>
    </>
  );
}

export default TodoCard;
