class NoteItem extends HTMLElement {
    set noteData(note) {
        this.innerHTML = `
        <div class="note-item">
        <h3>${note.title}</h3>
        <p>${note.body}</p>
        <span>${note.createdAt}</span>
        </div>
        `;
    }
}
customElements.define('note-item', NoteItem);
