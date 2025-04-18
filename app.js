export const renderNotes = (notes) => {
    let newNote = notes.map(({id, title, note, isPinned, isArchived}) => {
        return (
                `<div class="single-note">
                <div class="d-flex align-center title-container">
                    <span>${title}</span>
                <button class="button del-btn v-hidden" data-id="${id}" data-type="delete">
                    <span class="material-icons-outlined"  data-id="${id}" data-type="delete">delete</span>
                </button>
                </div>
                <p>${note}</p>
                <div class="options d-flex gap-md">
                <button class="button btn pinned-btn v-hidden" data-id="${id}" data-type="pinned">
                    <span class="material-icons-outlined" data-id="${id}" data-type="pinned">
                        push_pin
                    </span>
                </button>
                <button class="button pinned-btn btn v-hidden" data-id="${id}" data-type="archive">
                    <span class="material-icons-outlined" data-id="${id}" data-type="archive">
                        archive
                    </span>
                </button>
                </div>
                </div>`
            )
    })
    return newNote.join("");
}