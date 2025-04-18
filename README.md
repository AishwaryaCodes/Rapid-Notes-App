# Rapid Notes App

Rapid Notes App is a simple note-taking web application built using JavaScript and HTML. It allows users to quickly add, edit, and delete notes. The app also includes a feature to delete all notes at once with a confirmation prompt.

---

## Architecture Overview
```
Frontend (HTML + JS)
     |
     | (REST or WebSocket)
     v
Node.js Gateway Server (Express + gRPC client)
     |
     | (gRPC)
     v
Node.js gRPC Server (note.proto based)
```

## File Structure 
```
📂 rapid-notes-app/
├── client/
│   ├── index.html        Frontend UI
│   ├── script.js         Logic for interacting with REST API
│   └── style.css         Styling for notes app
│
├── node_modules/         Installed dependencies
│
├── .gitignore            Ignoring node_modules, logs, etc.
├── gateway.js            REST API (calls gRPC server)
├── note.proto            gRPC service and message definitions
├── server.js             gRPC server logic (in-memory storage)
├── package.json          Project metadata and dependencies
└── package-lock.json     Exact dependency versions

```

---

## Features

- **Add Notes**: Add new notes by typing into a text area and clicking the "Add" button.
- **Edit Notes**: Edit the content of an existing note by clicking the pencil icon.
- **Remove Note**: Remove individual notes by clicking the "❌" icon next to the note.
- **Delete All Notes**: Clear all notes with a single button, with a confirmation prompt to prevent accidental deletion.

---

## Technologies Used

- **HTML**: Structure of the app.
- **CSS**: Styling of the app (optional, not included in the provided code).
- **JavaScript**: Functionality for adding, editing, and deleting notes.

---

## Installation

1. Clone this repository to your local machine using the following command:
    ```bash
    git clone https://github.com/your-username/rapid-notes-app.git
    ```

2. Open `index.html` in a web browser to use the app.

## Usage

1. Type your note in the textarea.
2. Click the "Add" button to add the note.
3. Click the pencil icon to edit an existing note.
4. Click the "❌" icon to remove a note.
5. Click the "Delete All" button to remove all notes (after confirming).


