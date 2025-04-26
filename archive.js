import { renderNotes } from "./app.js";

let title = document.querySelector(".archive-notes");
let archivedNotes = document.querySelector(".archive-notes-container");

let arrayOfNotes = JSON.parse(localStorage.getItem("notes"));

archivedNotes.innerHTML = renderNotes(
    JSON.parse(localStorage.getItem("notes")).filter((note) => note.isArchived == true)
);

function toggleTitles(arrayOfNotes){
    if(arrayOfNotes.some(note => note.isArchived == true)){
        title.classList.remove("d-none"); // show
    }
    else{
        title.classList.add("d-none"); // hide
    }
}


archivedNotes.addEventListener("click", (event) => {
    switch(event.target.dataset.type) {
        case "delete":
            arrayOfNotes = arrayOfNotes.filter((note) => note.id != event.target.dataset.id);
            localStorage.setItem("notes", JSON.stringify(arrayOfNotes));
            archivedNotes.innerHTML = renderNotes(
                JSON.parse(localStorage.getItem("notes")).filter((note) => note.isArchived == true)
            );
            toggleTitles(arrayOfNotes)
            break;
        case "archive":
            arrayOfNotes = arrayOfNotes.map((note) => note.id == event.target.dataset.id ? {...note, isArchived: !note.isArchived} : note);
            localStorage.setItem("notes", JSON.stringify(arrayOfNotes));
            archivedNotes.innerHTML = renderNotes(
                JSON.parse(localStorage.getItem("notes")).filter((note) => note.isArchived == true)
            );
            toggleTitles(arrayOfNotes)
            break;
        case "pinned":
            arrayOfNotes = arrayOfNotes.map((note) => note.id == event.target.dataset.id ? {...note, isPinned: !note.isPinned} : note);
            localStorage.setItem("notes", JSON.stringify(arrayOfNotes));
            archivedNotes.innerHTML = renderNotes(
                JSON.parse(localStorage.getItem("notes")).filter((note) => note.isArchived == true)
            );
            toggleTitles(arrayOfNotes)
            break;    
    }
});
toggleTitles(arrayOfNotes)