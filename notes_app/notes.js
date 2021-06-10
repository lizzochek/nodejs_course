const fs = require("fs");
const chalk = require("chalk");

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

  const duplicateNote = notes.find((note) => note.title === title);

  if (!duplicateNote) {
    notes.push({
      title: title,
      content: content,
    });
    console.log(chalk.green.inverse("New note added"));
  } else {
    console.log(chalk.red.inverse("Note title taken"));
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

  console.log(chalk.white.inverse("Your notes..."));

  notes.forEach((note) => {
    console.log(`${chalk.magenta(note.title)}`);
  });
};

const readNote = (title) => {
  const notes = loadNotes();
  const neededNote = notes.find((note) => note.title === title);

  if (!neededNote)
    return console.log(chalk.red.inverse("Note with this title wasn't found"));

  console.log(`${chalk.magenta(neededNote.title)}\n${neededNote.content}`);
};

module.exports = {
  addNote: addNote,
  removeNote: removeNote,
  listNotes: listNotes,
  readNote: readNote,
};
