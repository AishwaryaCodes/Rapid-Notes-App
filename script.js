// Get references to HTML elements
const userText = document.getElementById('text'); //TextArea
const userNotes = document.getElementById('notes'); // Display area for notes
const addBtn = document.getElementById('add'); //Add Button 
const delBtn = document.getElementById('del'); //Delete Button

// Initially hide Delete All button
delBtn.style.display = 'none';

// Add button - Append the user text from text area into the notes
addBtn.addEventListener('click', () => {
    const noteText = userText.value.trim(); //Get trimmed text input
    if (noteText) {

        //Create List Element and add classname.
        const listItem = document.createElement('li');  
        listItem.classList.add('note-item'); 

        const noteContent = document.createElement('span');
        noteContent.classList.add('note-text');
        noteContent.textContent = noteText;

        // Buttons Container
        const buttonContainer = document.createElement('div');
        buttonContainer.classList.add('buttons');

        // Edit Button
        const editBtn = document.createElement('button');
        editBtn.innerHTML = '✏️';
        editBtn.classList.add('edit-btn');
        editBtn.addEventListener('click', () => {
            const newText = prompt("Edit your note:", noteContent.textContent);
            if (newText !== null && newText.trim() !== '') {
                noteContent.textContent = newText.trim();
            }
        });

        // Remove Button
        const removeBtn = document.createElement('button');
        removeBtn.innerHTML = '❌';
        removeBtn.classList.add('remove-btn');
        removeBtn.addEventListener('click', () => {
            listItem.remove();

            // Hide Delete All button if there are fewer than 2 notes
            if (userNotes.children.length < 2) {
                delBtn.style.display = 'none';
            }
        });

        // Append buttons to the button container
        buttonContainer.appendChild(editBtn);
        buttonContainer.appendChild(removeBtn);

        // Append elements to the list item
        listItem.appendChild(noteContent);
        listItem.appendChild(buttonContainer);

        // Append the new list item to the notes list
        userNotes.appendChild(listItem);

        // Show Delete All button if there are more than 2 notes
        if (userNotes.children.length >= 2) {
            delBtn.style.display = 'inline-block';
        }

        // Clear the textarea after adding the note
        userText.value = '';
    }
});

// Delete All Button - Deletes all notes
delBtn.addEventListener('click', () => {
    if (confirm("Are you sure you want to delete all notes?")) {
        userNotes.innerHTML = ''; // Clear all notes
        delBtn.style.display = 'none'; // Hide Delete All button
    }
});
