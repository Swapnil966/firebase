import { FaRegTrashAlt } from "react-icons/fa";
import Loader from "./Loader";
import { useState } from "react";

function TodoCard({ title, deletee, id }) {
  let [deleteStatus, setDeleteStatus] = useState(false);

  function deleteHandler() {
    setDeleteStatus(true);
    deletee(id);
  }

  return (
    <>
      <div className="flex items-center justify-between rounded-md border border-gray-200 bg-white p-4 shadow-sm">
        <h1 className="break-words pr-4 text-lg font-medium text-gray-800">
          {title}
        </h1>

        <button
          onClick={deleteHandler}
          className="shrink-0 rounded-md cursor-pointer bg-red-100 p-2 text-red-500 hover:bg-red-200"
        >
          {deleteStatus ? <Loader /> : <FaRegTrashAlt />}
        </button>
      </div>
    </>
  );
}

export default TodoCard;
