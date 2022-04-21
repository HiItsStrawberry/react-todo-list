import React, { useState } from "react";
import { FiEdit, FiDelete } from "react-icons/fi";
import { MdRestore } from "react-icons/md";
import { Link } from "react-router-dom";

const Card = ({
  id,
  title,
  description,
  deleteTask,
  restoreTask,
  deletetable,
}) => {
  const [isReadMore, setIsReadMore] = useState(false);

  const length = Math.ceil(description.length / 2);
  return (
    <div className='card__body'>
      <div className='card__header flex'>
        <h3>{title}</h3>
        {deletetable ? (
          <div className='flex'>
            <button className='deletable' onClick={() => deleteTask(id)}>
              <FiDelete />
            </button>
            <Link className='not__deletable' to={`/edit-task/${id}`}>
              <FiEdit />
            </Link>
          </div>
        ) : (
          <button
            className='flex not__deletable'
            onClick={() => restoreTask(id)}
          >
            <MdRestore />
          </button>
        )}
      </div>
      <p>
        {length > 150 ? (
          <>
            {isReadMore
              ? description
              : `${description.substring(0, length)} ...`}
            <button onClick={() => setIsReadMore(!isReadMore)}>
              &nbsp;{isReadMore ? "read less" : "read more"}
            </button>
          </>
        ) : (
          description
        )}
      </p>
    </div>
  );
};

export default Card;
