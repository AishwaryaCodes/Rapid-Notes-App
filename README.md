# Rapid Notes App

Rapid-Notes is a simple note-taking web application built using JavaScript, HTML,Node.js, gRPC and SQLite. It allows users to quickly add, edit, and delete notes.

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

- Add / edit / delete individual notes  
- "Delete All" notes functionality  
- Clean & responsive UI  
- Notes persist using SQLite  
- gRPC used between server and data layer  
- CORS-enabled REST API gateway  

---

## Tech Stack

| Layer       | Tech                          |
|-------------|-------------------------------|
| Frontend    | HTML, CSS, JavaScript         |
| Backend     | Node.js (Express + gRPC)      |
| Database    | SQLite (Lightweight & fast)   |
| Protocol    | Protocol Buffers (protobuf)   |

---

## Installation

Clone this repository to your local machine using the following command:

    ```
    
     git clone https://github.com/YOUR-USERNAME/Rapid_Notes_gRPC_SQLite.git
     
     cd Rapid_Notes_gRPC_SQLite

    Install dependencies: npm i

    Start the gRPC Note Service: node server.js

    Start the REST API Gateway: node gateway.js

    npx http-server ./client

    open in Browser:  http://127.0.0.1:8080

    ```



