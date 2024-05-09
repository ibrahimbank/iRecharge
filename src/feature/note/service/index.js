import { v4 as uuidv4 } from 'uuid';

// Get notes
const getNotes = async () => {
    return;
};


//create note
const createNote = async (noteText) => {
    const note = {
        id: uuidv4(),
        text: noteText,
    };


    return note;
};
//delete note
const deleteNote = async (id) => {
    return id;
};

//delete note
const updateNote = async (text, id) => {
    console.log(text)
    console.log(id)
    const res = {text,id}

    console.log(res?.id)
    return res ;
};

const noteService = {
   getNotes,
    createNote,
    deleteNote,
    updateNote
};

export default noteService;