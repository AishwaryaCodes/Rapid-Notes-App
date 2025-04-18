const userText = document.getElementById('text');
const userNotes = document.getElementById('notes');
const addBtn = document.getElementById('add');
const delBtn = document.getElementById('del');

console.log("✅ script.js loaded");


// Initially hide Delete All button
delBtn.style.display = 'none';

// Add existing notes on page load
window.onload = async () => {
    try {
        const res = await fetch("http://localhost:3000/notes");
        const notes = await res.json();
        notes.forEach(note => addNoteToUI(note.title, note.content, note.id));
    } catch (err) {
        console.error("Error loading notes:", err);
    }
};

// Add Note button handler
addBtn.addEventListener('click', async () => {
    console.log("✅ script.js loaded");

    const noteText = userText.value.trim();
    if (noteText) {
        try {
            const response = await fetch("http://localhost:3000/notes", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ title: "Untitled", content: noteText })
            });

            const note = await response.json();
            if (note.id) {
                addNoteToUI(note.title, note.content, note.id);
                userText.value = '';
            } else {
                console.error("Backend did not return note ID:", note);
            }
        } catch (err) {
            console.error("Error adding note:", err);
        }
    }
});

// Add a note to the UI
function addNoteToUI(title, content, id = null) {
    console.log("✅ script.js loaded");

    const listItem = document.createElement('li');
    listItem.classList.add('note-item');
    listItem.dataset.id = id;

    const noteContent = document.createElement('span');
    noteContent.classList.add('note-text');
    noteContent.textContent = content;

    const buttonContainer = document.createElement('div');
    buttonContainer.classList.add('buttons');

    // Edit Button
    const editBtn = document.createElement('button');
    editBtn.innerHTML = '✏️';
    editBtn.classList.add('edit-btn');
    editBtn.addEventListener('click', async () => {
        const newText = prompt("Edit your note:", noteContent.textContent);
        if (newText && newText.trim() !== '') {
            noteContent.textContent = newText.trim();

            await fetch(`http://localhost:3000/notes/${id}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ title: "Untitled", content: newText.trim() })
            });
        }
    });

    // Delete Button
    const removeBtn = document.createElement('button');
    removeBtn.innerHTML = '❌';
    removeBtn.classList.add('remove-btn');
    removeBtn.addEventListener('click', async () => {
        listItem.remove();
        if (userNotes.children.length < 2) {
            delBtn.style.display = 'none';
        }

        if (id) {
            await fetch(`http://localhost:3000/notes/${id}`, {
                method: "DELETE"
            });
        }
    });

    buttonContainer.appendChild(editBtn);
    buttonContainer.appendChild(removeBtn);
    listItem.appendChild(noteContent);
    listItem.appendChild(buttonContainer);
    userNotes.appendChild(listItem);

    if (userNotes.children.length >= 2) {
        delBtn.style.display = 'inline-block';
    }
}
console.log("✅ script.js loaded");
