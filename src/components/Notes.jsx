import React, { useState, useEffect } from "react";
import Note from "./Note";
function Notes() {
  const [notes, setNotes] = useState([]);

  const fetchNotes = () => {
    let list = JSON.parse(localStorage.getItem("notes_list")) || [];
    if (list.length > 0) {
      setNotes(list);
    } else {
      let staticNotes = [
        {
          id: 1,
          title: "Example Note 1",
          content: `Lorem ipsum dolor sit amet consectetur, adipisicing elit.`
        },
        {
          id: 2,
          title: "Example Note 2",
          content: `Lorem ipsum dolor sit amet consectetur, adipisicing elit.`
        },
        {
          id: 3,
          title: "Example Note 3",
          content: `Lorem ipsum dolor sit amet consectetur, adipisicing elit.`
        },
        {
          id: 4,
          title: "Example Note 4",
          content: `Lorem ipsum dolor sit amet consectetur, adipisicing elit.`
        }
      ];
      localStorage.setItem("notes_list", JSON.stringify(staticNotes));
      setNotes(staticNotes);
    }
  };

  useEffect(() => {
    fetchNotes();
  }, []);

  const createNote = (event = null, id = null, title = "", content = "") => {
    console.log(title);
    let note_save = document.getElementById("note_save");
    if (!note_save) {
      let notes_el = document.getElementById("notes");
      let temp = `<div class="note" id="createNoteSection">
                  <h1>
                    <input type="text" class="note-input" id="note_title" value="${title}" placeholder="Enter title" />
                  </h1>
                  <p>
                    <textarea class="note-content"
                      placeholder="Write something.."
                      id="note_content"
                      rows="10"
                    >${content}</textarea>
                  </p>
                  ${
                    id != null
                      ? `<input type="hidden" id="note_update_id" value="${id}" >`
                      : ""
                  }
                  <div>
                    <button class="app-btn" id="cancel_save">Cancel</button>
                    <button class="app-btn" id="note_save">Save</button>
                  </div>
                </div>`;

      notes_el.insertAdjacentHTML("afterbegin", temp);

      document
        .getElementById("note_save")
        .addEventListener("click", function (e) {
          let note_id_el = document.getElementById("note_update_id");
          let title = document.getElementById("note_title").value;
          let content = document.getElementById("note_content").value;
          if (title !== "" && content !== "") {
            let newList = [];
            let update_flag = false;
            if (note_id_el && id != null) {
              let nid = note_id_el.value;
              newList = notes.map((d) => {
                if (d.id == nid) {
                  update_flag = true;
                  return {
                    ...d,
                    title,
                    content
                  };
                } else return d;
              });
            } else {
              let maxid = notes.reduce((v, d) => (v = v > d.id ? v : d.id), 0);
              newList = [
                ...notes,
                {
                  id: maxid + 1,
                  title,
                  content
                }
              ];
            }

            localStorage.setItem("notes_list", JSON.stringify(newList));
            document.getElementById("createNoteSection").remove();
            if (update_flag) {
              alert("Update Note");
            } else {
              alert("Save Note");
            }
            fetchNotes();
          } else {
            alert("Can not be empty title & content");
          }
        });

      document
        .getElementById("cancel_save")
        .addEventListener("click", function (e) {
          document.getElementById("createNoteSection").remove();
        });
    } else {
      alert("Please save/cancel open note");
    }
  };

  let deleteNote = (e) => {
    if (confirm("Are you sure want to delete")) {
      let note_id = e.target.getAttribute("data-id");
      let list = JSON.parse(localStorage.getItem("notes_list")) || [];

      let newNotes = list.filter((d) => d.id != note_id);
      localStorage.setItem("notes_list", JSON.stringify(newNotes));
      fetchNotes();
    }
  };
  let editNote = (e) => {
    let note_id = e.target.getAttribute("data-id");
    let list = JSON.parse(localStorage.getItem("notes_list")) || [];

    let match = list.filter((d) => d.id == note_id)[0] || null;
    if (match != null) {
      let createSection = document.getElementById("createNoteSection");
      if (createSection) {
        createSection.remove();
      }
      createNote(null, match.id, match.title, match.content);
    }
  };

  return (
    <div>
      <div className="add-section">
        <button className="app-btn app-btn-lg " onClick={createNote}>
          ADD NEW
        </button>
      </div>
      <div id="notes">
        {notes.map((d, i) => {
          return (
            <div key={i}>
              <Note
                id={d.id}
                title={d.title}
                content={d.content}
                deleteNote={deleteNote}
                editNote={editNote}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Notes;
