class NoteItem extends HTMLElement {
  set noteData(note) {
    this.innerHTML = `
            <div class="note-item">
                <h3>${note.title}</h3>
                <p>${note.body}</p>
                <small>${new Date(note.createdAt).toLocaleString()}</small>
                <button class="archive-btn">${note.archived ? 'Unarchive' : 'Archive'}</button>
                <button class="delete-btn">Delete</button>
            </div>
        `;

    // Style tombol archive/unarchive
    const style = document.createElement('style');
    style.textContent = `
      .archive-btn {
        background-color: #145A32;
        color: #fff;
        border: none;
        padding: 8px 12px;
        border-radius: 8px;
        cursor: pointer;
        font-weight: bold;
        transition: background-color 0.3s ease, transform 0.2s ease;
        margin-right: 0.5rem;
      }

      .archive-btn:hover {
        background-color: #27ae60;
        transform: scale(1.05);
      }

      .archive-btn:active {
        transform: scale(0.95);
      }

      .delete-btn {
        background-color: #e74c3c;
        color: #fff;
        border: none;
        padding: 8px 12px;
        border-radius: 8px;
        cursor: pointer;
        font-weight: bold;
        transition: background-color 0.3s ease, transform 0.2s ease;
      }

      .delete-btn:hover {
        background-color: #c0392b;
        transform: scale(1.05);
      }

      .delete-btn:active {
        transform: scale(0.95);
      }
    `;
    this.appendChild(style);

    // Fungsi tombol archive/unarchive
    this.querySelector('.archive-btn').addEventListener('click', () => {
      this.dispatchEvent(
        new CustomEvent(note.archived ? 'unarchive-note' : 'archive-note', {
          detail: { id: note.id },
          bubbles: true,
        }),
      );
    });

    // Fungsi tombol delete
    this.querySelector('.delete-btn').addEventListener('click', () => {
      this.dispatchEvent(
        new CustomEvent('delete-note', {
          detail: { id: note.id },
          bubbles: true,
        }),
      );
    });
  }
}

customElements.define('note-item', NoteItem);
