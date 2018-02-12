//File system module - It is a core module
const fs = require('fs');

//notes-data.json I/O operations
const fetchNotes = () => fs.existsSync('notes-data.json') ? JSON.parse(fs.readFileSync('notes-data.json')) : [];
const saveNotes = (notes) => fs.writeFileSync('notes-data.json', JSON.stringify(notes));

//Check if note is exists
const isNoteExists = (title) => {
    const notes = fetchNotes();
    const matchedNotes = notes.filter(note => note.title === title);
    return matchedNotes[0];
}

//Add a new note
const addNote = (title, body) => {
    const notes = fetchNotes();
    const note = {
        title,
        body
    }
    if (!isNoteExists(title)) {
        notes.push(note);
        saveNotes(notes);
        return note;
    }
}

//List all the notes
const getAll = () => {
    const notes = fetchNotes();
    if (notes.length !== 0) {
        return notes;
    }
}

//Read a specific note
const getNote = (title) => {
    return isNoteExists(title);
}

//Remove a note
const removeNote = (title) => {
    if (isNoteExists(title)) {
        let notes = fetchNotes();
        FilteredNotes = notes.filter(note => note.title !== title);
        saveNotes(FilteredNotes);
        return FilteredNotes.length < notes.length;
    }
}

//Log a note
const toString = (note) => {
    console.log(`Title: ${note.title}\nBody: ${note.body}`);
    console.log("************************")
}

module.exports = {
    addNote,
    getAll,
    getNote,
    removeNote,
    toString
}