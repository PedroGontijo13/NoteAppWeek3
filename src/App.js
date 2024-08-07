import "./App.css";
import Editor from "./components/Editor/Editor";
import React from "react";
import Sidebar from "./components/Sidebar/Sidebar";
import Split from "react-split";
import "react-mde/lib/styles/css/react-mde-all.css";
import { useState, useEffect } from "react";
import { nanoid } from "nanoid";

function App() {
  const [notes, setNotes] = useState(JSON.parse(localStorage.getItem('notes')) || []);

  useEffect(() => {
    localStorage.setItem("notes", JSON.stringify(notes));
  }, [notes]);

  function LogData() {
    const storedNotes = localStorage.getItem("notes");
    if (storedNotes) {
      console.log(storedNotes);
      setNotes(JSON.parse(storedNotes));
    }
  }

  const [currentNoteId, setCurrentNoteId] = useState(
    (notes[0] && notes[0].id) || ""
  );

  const createNewNote = () => {
    const newNote = {
      id: nanoid(),
      body: "#Title Here",
      summary: "#Title Here",
    };
    const firstLine = newNote.summary.split("\n")[0].replace(/^#+\s*/, "");
    newNote.summary = firstLine !== "" ? firstLine : "Untitled";
    LogData();
    setNotes((prev) => [newNote, ...prev]);
    setCurrentNoteId(newNote.id);
  };

  const findCurrentNote = () => {
    return (
      notes.find((note) => {
        return note.id === currentNoteId;
      }) || notes[0]
    );
  };

  const updateNote = (text) => {
    setNotes((oldNotes) => {
      oldNotes.summary = text !== "" ? `${text}` : `Title`
      const updatedNote = oldNotes.find((note) => note.id === currentNoteId);
      const otherNotes = oldNotes.filter((note) => note.id !== currentNoteId);
      return updateNote
        ? [{ ...updatedNote, body: text, summary: oldNotes.summary.split("\n")[0].replace(/^#+\s*/, ""), modifiedAt: new Date() }, ...otherNotes]
        : oldNotes;
    })
  };

  const deleteNotes = (id) => {
    setNotes((oldNote) => {
      const newNotes = oldNote.filter((note) => note.id !== id);
      return newNotes;
    });
  };

  return (
    <main>
      {notes.length > 0 ? (
        <Split sizes={[20, 80]} direction="horizontal" className="split">
          <Sidebar
            notes={notes}
            currentNote={findCurrentNote()}
            setCurrentNoteId={setCurrentNoteId}
            newNote={createNewNote}
            deleteNote={deleteNotes}
          />
          {currentNoteId && notes.length > 0 && (
            <Editor currentNote={findCurrentNote()} updateNote={updateNote} />
          )}
        </Split>
      ) : (
        <div className="empty-notes">
          <h1>You have no notes</h1>
          <button onClick={createNewNote}>Create a new one</button>
        </div>
      )}
    </main>
  );
}

export default App;
