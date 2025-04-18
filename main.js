import { renderNotes } from "./app.js";

let title = document.querySelector(".title");
let note = document.querySelector(".note");
let addBtn = document.querySelector(".add-btn");
let otherNotes = document.querySelector(".notes-container");
let arrayOfNotes = localStorage.getItem("notes") ? JSON.parse(localStorage.getItem("notes")) : [];
let displayNotes = document.querySelector(".notes-display");
let pinnedNotes = document.querySelector(".pinned-notes-container");
let pinnedTitle = document.querySelector(".pin-title");
let otherTitle = document.querySelector(".other-title");

function toggleTitles(arrayOfNotes){
    let hasPinnedNotes = arrayOfNotes.some(note => note.isPinned && note.isArchived == false);
    let hasUnpinnedNotes = arrayOfNotes.some(note => note.isPinned == false && note.isArchived == false);

    if (hasUnpinnedNotes) {
    otherTitle.classList.remove("d-none"); // show
    }
    else{
        otherTitle.classList.add("d-none"); // hide
    }

    if (hasPinnedNotes) {
    pinnedTitle.classList.remove("d-none"); // show
    } else {
    pinnedTitle.classList.add("d-none"); // hide
    } 
} 

displayNotes.addEventListener("click", (event)=>{
    let type = event.target.dataset.type;
    let id = event.target.dataset.id;

    console.log(type, id);

    switch(type){
        case "delete":
            arrayOfNotes = arrayOfNotes.filter((note)=> note.id != id);
            localStorage.setItem("notes", JSON.stringify(arrayOfNotes));
            toggleTitles(arrayOfNotes);
            otherNotes.innerHTML = renderNotes(arrayOfNotes.filter((note)=> note.isArchived == false && note.isPinned == false));
            pinnedNotes.innerHTML = renderNotes(arrayOfNotes.filter((note)=> note.isPinned == true && note.isArchived == false));   
            break;

        case "pinned":
            arrayOfNotes = arrayOfNotes.map((note)=> note.id == id ? {...note, isPinned: !note.isPinned} : note);
            localStorage.setItem("notes", JSON.stringify(arrayOfNotes));
            toggleTitles(arrayOfNotes);
            otherNotes.innerHTML = renderNotes(arrayOfNotes.filter((note)=> note.isPinned == false && note.isArchived == false));
            pinnedNotes.innerHTML = renderNotes(arrayOfNotes.filter((note)=> note.isPinned == true && note.isArchived == false));   
            break; 
            
        case "archive":
            arrayOfNotes = arrayOfNotes.map((note)=> note.id == id ? {...note, isArchived: !note.isArchived} : note);
            localStorage.setItem("notes", JSON.stringify(arrayOfNotes));
            toggleTitles(arrayOfNotes);
            pinnedNotes.innerHTML = renderNotes(arrayOfNotes.filter((note)=> note.isPinned == true && note.isArchived == false));   
            otherNotes.innerHTML = renderNotes(arrayOfNotes.filter((note)=> note.isArchived == false && note.isPinned == false));
            break;    
    }
})

addBtn.addEventListener("click", (event)=>{
    if(title.value.trim().length > 0  || note.value.trim().length > 0){
        arrayOfNotes = [...arrayOfNotes, {title: title.value, note: note.value, id: Date.now(), isPinned: false, isArchived: false}];
        localStorage.setItem("notes", JSON.stringify(arrayOfNotes));
        title.value = note.value = "";
        otherNotes.innerHTML = renderNotes(arrayOfNotes.filter((note)=> note.isPinned == false && note.isArchived == false));
        pinnedNotes.innerHTML = renderNotes(arrayOfNotes.filter((note)=> note.isPinned == true && note.isArchived == false));   
        toggleTitles(arrayOfNotes);
    }
})


otherNotes.innerHTML = renderNotes(arrayOfNotes.filter((note)=> note.isPinned == false && note.isArchived == false));
pinnedNotes.innerHTML = renderNotes(arrayOfNotes.filter((note)=> note.isPinned == true && note.isArchived == false));
toggleTitles(arrayOfNotes);