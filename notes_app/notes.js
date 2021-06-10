const fs = require("fs");
const chalk = require("chalk");

//Helpers
const getNotes = () => "Your notes...";

const saveNotes = (notes) => {
  const dataJSON = JSON.stringify(notes);
  fs.writeFileSync("notes.json", dataJSON);
};

const loadNotes = () => {
  try {
    const dataBuffer = fs.readFileSync("notes.json");
    const dataJSON = dataBuffer.toString();
    return JSON.parse(dataJSON);
  } catch (err) {
    return [];
  }
};

//Commands functions
const addNote = (title, content) => {
  const notes = loadNotes();

  const duplicateNotes = notes.filter((note) => note.title === title);
  if (duplicateNotes.length === 0) {
    notes.push({
      title: title,
      content: content,
    });
    console.log(chalk.green.inverse("New note added"));
  } else {
    console.log(chalk.red.inverse("note title taken"));
  }

  saveNotes(notes);
};

const removeNote = (title) => {
  const notes = loadNotes();
  const notesToKeep = notes.filter((note) => note.title !== title);
  saveNotes(notesToKeep);

  if (notesToKeep.length < notes.length)
    console.log(chalk.red.inverse("Note with this title wasn't found"));
  else console.log(chalk.green.inverse("Note was removed"));
};

const listNotes = () => {
  const notes = loadNotes();
  console.log(chalk.white.inverse(getNotes()));
  notes.forEach((note) => {
    console.log(`${chalk.magenta(note.title)}`);
  });
};

module.exports = {
  getNotes: getNotes,
  addNote: addNote,
  removeNote: removeNote,
  listNotes: listNotes,
};
