import React from "react";

const Note = (props) => {
  let { id, title, content, deleteNote, editNote } = props;

  return (
    <>
      <div className="note">
        <h1>{title}</h1>
        <p>{content}</p>
        <div>
          <button
            className="app-btn"
            onClick={editNote.bind(this)}
            data-id={id}
          >
            Edit
          </button>
          <button
            className="app-btn"
            onClick={deleteNote.bind(this)}
            data-id={id}
          >
            Delete
          </button>
        </div>
      </div>
    </>
  );
};

export default Note;
