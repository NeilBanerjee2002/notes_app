import { renderNotes } from "./app.js";

let title = document.querySelector(".title");
let note = document.querySelector(".note");
let addBtn = document.querySelector(".add-btn");
let otherNotes = document.querySelector(".notes-container");
let arrayOfNotes = localStorage.getItem("notes") ? JSON.parse(localStorage.getItem("notes")) : [];
let displayNotes = document.querySelector(".notes-display");


displayNotes.addEventListener("click", (event)=>{
    let type = event.target.dataset.type;
    let id = event.target.dataset.id;

    console.log(type, id);

    switch(type){
        case "delete":
            arrayOfNotes = arrayOfNotes.filter((note)=> note.id != id);
            localStorage.setItem("notes", JSON.stringify(arrayOfNotes));
            otherNotes.innerHTML = renderNotes(arrayOfNotes);
            break;
    }
})

addBtn.addEventListener("click", (event)=>{
    if(title.value.trim().length > 0  || note.value.trim().length > 0){
        arrayOfNotes = [...arrayOfNotes, {title: title.value, note: note.value, id: Date.now(), isPinned: false, isArchived: false}];
        localStorage.setItem("notes", JSON.stringify(arrayOfNotes));
        title.value = note.value = "";
        otherNotes.innerHTML = renderNotes(arrayOfNotes);
    }
})


otherNotes.innerHTML = renderNotes(arrayOfNotes);