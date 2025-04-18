import { renderNotes } from "./app.js";

let archivedNotes = document.querySelector(".archive-notes-container");

archivedNotes.innerHTML = renderNotes(
    JSON.parse(localStorage.getItem("notes")).filter((note) => note.isArchived == true)
);

