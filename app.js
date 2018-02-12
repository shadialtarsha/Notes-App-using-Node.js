//yargs library
const yargs = require('yargs');

const notes = require('./notes.js');

//Title options for yargs module
const titleOptions = {
    //description for the --title option
    describe: 'Title of note',
    //Telling yargs that this option is required
    demand: true,
    //alias for this option (--t can be used now instead of --title)
    alias: 't'
}

//Body options for yargs module
const bodyOptions = {
    //description for the --body option
    describe: 'Body of note',
    //Telling yargs that this option is required
    demand: true,
    //alias for this option (--b can be used now instead of --body)
    alias: 'b'
}

//Configure yargs
const args = yargs
    /*
        Command(command name, command description, options object)
    */
    .command('add', 'Add a new note', {
        title: titleOptions,
        body: bodyOptions
    })
    .command('list', 'List all notes')
    .command('read', 'Read a note', {
        title: titleOptions
    })
    .command('remove', 'Remove a note', {
        title: titleOptions
    })
    //--help is available now
    .help()
    .argv;

//Get the command user has passed
const command = args._[0];

switch (command) {
    case 'add':
        {
            const note = notes.addNote(args.title, args.body);
            if (note) {
                console.log('Note created')
                notes.toString(note);
            } else {
                console.log('Sorry, This title is exists');
            }
        };
        break;
    case 'list':
        {
            const notesList = notes.getAll();
            if (notesList) {
                notesList.forEach(note => notes.toString(note));
            } else {
                console.log('No notes');
            }
        };
        break;
    case 'read':
        {
            const note = notes.getNote(args.title);
            if (note) {
                notes.toString(note);
            } else {
                console.log('Sorry, Note is not exists');
            }
        };
        break;
    case 'remove':
        {
            notes.removeNote(args.title) ? console.log('Note removed!') : console.log('Note is not exists');
        };
        break;
    default:
        console.log('Command is not recognized');
}