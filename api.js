const confirmedNotes = require("../db/db.json")
const fs = require("fs");

module.exports = app => {
  app.get("/api/confirmedNotes", function (req, res) {
    return res.json(confirmedNotes)
  })

  app.post("/api/confirmedNotes", function (req, res) {

    const newNote = req.body;
    (confirmedNotes.length === 0) ? newNote.id = 0 : newNote.id = confirmedNotes.length;
    confirmedNotes.push(newNote);
    const noteString = JSON.stringify(confirmedNotes);

    fs.writeFile("./db/db.json", noteString, function (err) {
      if (err) throw err;
      console.log("Note Sent!");
      res.send();
    });
  })

  app.delete("/api/confirmedNotes/:id", function (req, res) {
    confirmedNotes.splice(req.params.id, 1);
    if (confirmedNotes) {
      for (let i = 0; i < confirmedNotes.length; i++) {
        confirmedNotes[i].id = i;
      };
    };

    fs.writeFile("./db/db.json", JSON.stringify(confirmedNotes), (err) => {
      if (err) throw err;
      console.log("note" + req.params.id + " deleted");
      res.send();
    });
  });
}
