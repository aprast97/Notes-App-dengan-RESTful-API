class NoteForm extends HTMLElement {
    connectedCallback() {
      this.innerHTML = `
        <form id="addNoteForm">
          <input type="text" id="noteTitle" placeholder="Title" required>
          <textarea id="noteBody" rows="4" placeholder="Write your note here..." required></textarea>
          <button type="submit">Add Note</button>
        </form>
      `;
      const style = document.createElement('style');
      style.textContent = `
        form {
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
          padding: 1rem;
          background-color: var(--color-primary-medium);
          color: var(--color-accent);
          border-radius: 8px;
        }
  
        form input, form textarea {
          font-family: var(--font-family);
          padding: 0.5rem;
          border: 1px solid var(--color-primary-light);
          border-radius: 4px;
        }
  
        form button {
          background-color: var(--color-primary-dark);
          color: var(--color-accent);
          border: none;
          padding: 0.5rem 1rem;
          cursor: pointer;
          border-radius: 4px;
        }
  
        form button:hover {
          background-color: var(--color-primary-light);
        }
      `;
      this.appendChild(style);
    }
  }
  
  customElements.define('note-form', NoteForm);
  