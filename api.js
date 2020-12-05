const saveNote = require("./db/db.json")
const fs = require("fs");

module.exports = app => {
  app.get("/api/notes", function (req, res) {
    return res.json(saveNote)
  })

  app.post("/api/notes", function (req, res) {

    const newNote = req.body;
    (saveNote.length === 0) ? newNote.id = 0 : newNote.id = saveNote.length;
    saveNote.push(newNote);
    const noteString = JSON.stringify(saveNote);

    fs.writeFile("./db/db.json", noteString, function (err) {
      if (err) throw err;
      console.log("Note captured!");
      res.send();
    });
  })

  app.delete("/api/notes/:id", function (req, res) {
    saveNote.splice(req.params.id, 1);
    if (saveNote) {
      for (let i = 0; i < saveNote.length; i++) {
        saveNote[i].id = i;
      };
    };

    fs.writeFile("./db/db.json", JSON.stringify(saveNote), (err) => {
      if (err) throw err;
      res.send();
    });
  });
}
