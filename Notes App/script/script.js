import anime from 'animejs/lib/anime.es.js';
import './loading-indicator.js';
import './note-item.js';
import './app-bar.js';
import './note-form.js';
import '../style/style.css';

let notesData = [];

// Fungsi Animasi
function animateNoteItem(element) {
  anime({
    targets: element,
    opacity: [0, 1],
    translateY: [50, 0],
    duration: 800,
    easing: 'easeOutExpo',
  });
}

const notesGridActive = document.getElementById('notesGridActive');
const notesGridArchived = document.getElementById('notesGridArchived');
const addNoteForm = document.getElementById('addNoteForm');

// Fungsi fetch data aktif & arsip
async function fetchActiveNotesFromAPI() {
  try {
    await new Promise((resolve) => setTimeout(resolve, 2000));
    const response = await fetch('https://notes-api.dicoding.dev/v2/notes');
    const { data } = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching active notes:', error);
    return [];
  }
}

async function fetchArchivedNotesFromAPI() {
  try {
    const response = await fetch(
      'https://notes-api.dicoding.dev/v2/notes/archived',
    );
    const { data } = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching archived notes:', error);
    return [];
  }
}

// Menampilkan catatan aktif & arsip
async function displayActiveAndArchivedNotes() {
  notesGridActive.innerHTML = '';
  notesGridArchived.innerHTML = '';

  // Menampilkan indikator loading di keduanya
  const loadingActive = document.createElement('loading-indicator');
  const loadingArchived = document.createElement('loading-indicator');
  notesGridActive.appendChild(loadingActive);
  notesGridArchived.appendChild(loadingArchived);

  try {
    const [activeNotes, archivedNotes] = await Promise.all([
      fetchActiveNotesFromAPI(),
      fetchArchivedNotesFromAPI(),
    ]);

    notesGridActive.innerHTML = '';
    notesGridArchived.innerHTML = '';

    notesData = activeNotes;

    // Render catatan aktif
    activeNotes.forEach((note) => {
      const noteItem = document.createElement('note-item');
      noteItem.noteData = note;
      notesGridActive.appendChild(noteItem);
      // Animasi
      animateNoteItem(noteItem);
    });

    // Render catatan arsip
    archivedNotes.forEach((note) => {
      const noteItem = document.createElement('note-item');
      noteItem.noteData = note;
      notesGridArchived.appendChild(noteItem);
      // Animasi
      animateNoteItem(noteItem);
    });
  } catch (error) {
    console.error('Error fetching notes:', error);
    alert('Gagal memuat catatan. Silahkan cek koneksi atau coba lagi.');
    notesGridActive.innerHTML = '<p>Gagal memuat catatan aktif.</p>';
    notesGridArchived.innerHTML = '<p>Gagal memuat catatan arsip.</p>';
  }
}

// Event Listener: Archive/Unarchive
notesGridActive.addEventListener('archive-note', async (event) => {
  const noteId = event.detail.id;
  try {
    const response = await fetch(
      `https://notes-api.dicoding.dev/v2/notes/${noteId}/archive`,
      {
        method: 'POST',
      },
    );
    if (response.ok) {
      displayActiveAndArchivedNotes();
    } else {
      console.error('Gagal mengarsipkan catatan.');
    }
  } catch (error) {
    console.error('Error saat mengarsipkan catatan:', error);
    alert('Terjadi kesalahan saat mengarsipkan catatan: ' + error.message);
  }
});

notesGridArchived.addEventListener('unarchive-note', async (event) => {
  const noteId = event.detail.id;
  try {
    const response = await fetch(
      `https://notes-api.dicoding.dev/v2/notes/${noteId}/unarchive`,
      {
        method: 'POST',
      },
    );
    if (response.ok) {
      displayActiveAndArchivedNotes();
    } else {
      console.error('Gagal membatalkan arsip catatan.');
      alert('Gagal membatalkan arsip catatan. Server mengembalikan error.');
    }
  } catch (error) {
    console.error('Error saat membatalkan arsip catatan:', error);
    alert('Terjadi kesalahan saat membatalkan arsip: ' + error.message);
  }
});

// Event Listener Delete Note
notesGridActive.addEventListener('delete-note', async (event) => {
  const noteId = event.detail.id;
  try {
    const response = await fetch(
      `https://notes-api.dicoding.dev/v2/notes/${noteId}`,
      {
        method: 'DELETE',
      },
    );
    if (response.ok) {
      displayActiveAndArchivedNotes();
    } else {
      console.error('Gagal menghapus catatan.');
      alert('Gagal menghapus catatan. Server mengembalikan error.');
    }
  } catch (error) {
    console.error('Error saat menghapus catatan:', error);
    alert('Terjadi kesalahan saat menghapus catatan: ' + error.message);
  }
});

// Fungsi catatan di arsip juga bisa dihapus
notesGridArchived.addEventListener('delete-note', async (event) => {
  const noteId = event.detail.id;
  try {
    const response = await fetch(
      `https://notes-api.dicoding.dev/v2/notes/${noteId}`,
      {
        method: 'DELETE',
      },
    );
    if (response.ok) {
      displayActiveAndArchivedNotes();
    } else {
      console.error('Gagal menghapus catatan.');
      alert('Gagal menghapus catatan. Server mengembalikan error.');
    }
  } catch (error) {
    console.error('Error saat menghapus catatan:', error);
    alert('Terjadi kesalahan saat menghapus catatan: ' + error.message);
  }
});

// Event Listener Form Submit
if (addNoteForm) {
addNoteForm.addEventListener('submit', async function (event) {
  event.preventDefault();
  const title = document.getElementById('noteTitle').value;
  const body = document.getElementById('noteBody').value;

  const newNote = { title, body };

  try {
    const response = await fetch('https://notes-api.dicoding.dev/v2/notes', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newNote),
    });

    if (response.ok) {
      displayActiveAndArchivedNotes();
    } else {
      console.error('Gagal menambahkan catatan ke API.');
      alert('Gagal menambahkan catatan ke API.');
    }
  } catch (error) {
    console.error('Error saat menambahkan catatan:', error);
    alert('Terjadi kesalahan saat menambahkan catatan: ' + error.message);
  }

  this.reset();
  });
}

document.addEventListener('DOMContentLoaded', displayActiveAndArchivedNotes);
