import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import noteService from "../service";

const initialState = {
    notes: [],
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: "",
};


export const getNotes = createAsyncThunk(
    "notes/getAll",
    async (_, thunkAPI) => {
        try {
            return await noteService.getNotes();
        } catch (error) {
            const message =
                (error.response &&
                    error.response.data &&
                    error.response.data.message) ||
                error.message ||
                error.toString();

            return thunkAPI.rejectWithValue(message);
        }
    }
);

//create note
export const createNote = createAsyncThunk(
    "notes/create",
    async (noteText, thunkAPI) => {
        try {

            return await noteService.createNote(noteText);
        } catch (error) {
            const message =
                (error.response &&
                    error.response.data &&
                    error.response.data.message) ||
                error.message ||
                error.toString();

            return thunkAPI.rejectWithValue(message);
        }
    }
);

export const deleteNote = createAsyncThunk(
    "notes/delete",
    async (id, thunkAPI) => {
        try {

            return await noteService.deleteNote(id);
        } catch (error) {
            const message =
                (error.response &&
                    error.response.data &&
                    error.response.data.message) ||
                error.message ||
                error.toString();

            return thunkAPI.rejectWithValue(message);
        }
    }
);


export const updateNote = createAsyncThunk(
    "notes/update",
    async ({query, noteId}, thunkAPI) => {
        try {

            return await noteService.updateNote(query, noteId);
        } catch (error) {
            const message =
                (error.response &&
                    error.response.data &&
                    error.response.data.message) ||
                error.message ||
                error.toString();

            return thunkAPI.rejectWithValue(message);
        }
    }
);

export const noteSlice = createSlice({
    name: 'note',
    initialState: initialState,
    reducers: {
        reset: (state) => initialState,
    },
    extraReducers: (builder) => {
        builder.addCase(getNotes.pending, (state) => {
            state.isLoading = true;
        })
            .addCase(getNotes.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.notes = state.notes;
            })
            .addCase(getNotes.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
            }).addCase(createNote.pending, (state) => {
            state.isLoading = true;
        })
            .addCase(createNote.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.notes.push(action.payload);
            })
            .addCase(createNote.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
            }).addCase(deleteNote.fulfilled, (state, action) => {
            state.isLoading = false;
            state.notes = state.notes.filter((note) => note.id !== action.payload
            );
        }).addCase(updateNote.fulfilled, (state, action) => {
            state.isLoading = false;
            state.notes = state.notes.map((note) => {
                    if (note.id === action.payload.id) {
                        return {
                            ...note,
                            text: action.payload.text,
                        };
                    }
                    return note;
                }
            );
        });
    }
});

export const {reset} = noteSlice.actions;


export default noteSlice.reducer;