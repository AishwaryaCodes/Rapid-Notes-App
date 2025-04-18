const express = require("express");
const bodyParser = require("body-parser");
const grpc = require("@grpc/grpc-js");
const protoLoader = require("@grpc/proto-loader");
const cors = require("cors");

const app = express();

// ✅ Middleware
app.use(cors()); // Must be before routes
app.use(bodyParser.json());

console.log("✅ CORS middleware is active");

// ✅ Load .proto
const packageDef = protoLoader.loadSync("note.proto", {
  keepCase: true,
  longs: String,
  enums: String,
  defaults: true,
  oneofs: true
});

const grpcObject = grpc.loadPackageDefinition(packageDef);
const notePackage = grpcObject.note;

const client = new notePackage.NoteService(
  "localhost:50051",
  grpc.credentials.createInsecure()
);

// ✅ Routes

app.get("/notes", (req, res) => {
  client.ListNotes({}, (err, response) => {
    if (err) {
      console.error("❌ gRPC ListNotes Error:", err);
      return res.status(500).json({ error: err.message });
    }
    res.json(response.notes);
  });
});

app.post("/notes", (req, res) => {
  const { title, content } = req.body;
  client.CreateNote({ title, content }, (err, note) => {
    if (err) {
      console.error("❌ gRPC CreateNote Error:", err);
      return res.status(500).json({ error: err.message });
    }
    res.json(note);
  });
});

app.get("/notes/:id", (req, res) => {
  client.GetNote({ id: req.params.id }, (err, note) => {
    if (err) {
      console.error("❌ gRPC GetNote Error:", err);
      return res.status(404).json({ error: "Note not found" });
    }
    res.json(note);
  });
});

app.put("/notes/:id", (req, res) => {
  const { title, content } = req.body;
  client.UpdateNote({ id: req.params.id, title, content }, (err, response) => {
    if (err) {
      console.error("❌ gRPC UpdateNote Error:", err);
      return res.status(500).json({ error: err.message });
    }
    res.json(response);
  });
});

app.delete("/notes/:id", (req, res) => {
  client.DeleteNote({ id: req.params.id }, (err, response) => {
    if (err) {
      console.error("❌ gRPC DeleteNote Error:", err);
      return res.status(404).json({ error: "Note not found" });
    }
    res.json(response);
  });
});

// ✅ Start the server
app.listen(3000, () => {
  console.log("🚀 REST API Gateway running at http://localhost:3000");
});
