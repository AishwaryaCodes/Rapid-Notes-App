const grpc = require("@grpc/grpc-js");
const protoLoader = require("@grpc/proto-loader");
const { v4: uuidv4 } = require("uuid");

const notes = [];

const packageDef = protoLoader.loadSync("note.proto", {});
const grpcObject = grpc.loadPackageDefinition(packageDef);
const notePackage = grpcObject.note;

const server = new grpc.Server();

server.addService(notePackage.NoteService.service, {
  CreateNote: (call, callback) => {
    const note = {
      id: uuidv4(),
      title: call.request.title,
      content: call.request.content
    };
    notes.push(note);
    callback(null, note);
  },

  GetNote: (call, callback) => {
    const note = notes.find(n => n.id === call.request.id);
    if (!note) return callback(new Error("Note not found"));
    callback(null, note);
  },

  ListNotes: (_, callback) => {
    callback(null, { notes });
  },

  UpdateNote: (call, callback) => {
    const index = notes.findIndex(n => n.id === call.request.id);
    if (index === -1) return callback(new Error("Note not found"));
    notes[index] = { ...call.request };
    callback(null, { message: "Note updated" });
  },

  DeleteNote: (call, callback) => {
    const index = notes.findIndex(n => n.id === call.request.id);
    if (index === -1) return callback(new Error("Note not found"));
    notes.splice(index, 1);
    callback(null, { message: "Note deleted" });
  }
});

server.bindAsync("localhost:50051", grpc.ServerCredentials.createInsecure(), () => {
  console.log("✅ gRPC server running at http://localhost:50051");
  server.start();
});
