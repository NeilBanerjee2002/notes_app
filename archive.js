import { renderNotes } from "./app.js";

let archivedNotes = document.querySelector(".archive-notes-container");

archivedNotes.innerHTML = renderNotes(
    JSON.parse(localStorage.getItem("notes")).filter((note) => note.isArchived == true)
);

archivedNotes.addEventListener("click", (event) => {
    switch(event.target.dataset.type) {
        case "delete":
            let arrayOfNotes = JSON.parse(localStorage.getItem("notes"));
            arrayOfNotes = arrayOfNotes.filter((note) => note.id != event.target.dataset.id);
            localStorage.setItem("notes", JSON.stringify(arrayOfNotes));
            archivedNotes.innerHTML = renderNotes(
                JSON.parse(localStorage.getItem("notes")).filter((note) => note.isArchived == true)
            );
            break;
        case "archive":
            let notes = JSON.parse(localStorage.getItem("notes"));
            notes = notes.map((note) => note.id == event.target.dataset.id ? {...note, isArchived: !note.isArchived} : note);
            localStorage.setItem("notes", JSON.stringify(notes));
            archivedNotes.innerHTML = renderNotes(
                JSON.parse(localStorage.getItem("notes")).filter((note) => note.isArchived == true)
            );
            break;
        case "pinned":
            let notesArray = JSON.parse(localStorage.getItem("notes"));
            notesArray = notesArray.map((note) => note.id == event.target.dataset.id ? {...note, isPinned: !note.isPinned} : note);
            localStorage.setItem("notes", JSON.stringify(notesArray));
            archivedNotes.innerHTML = renderNotes(
                JSON.parse(localStorage.getItem("notes")).filter((note) => note.isArchived == true)
            );
            break;    
    }
});