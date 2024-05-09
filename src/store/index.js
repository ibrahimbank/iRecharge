import {combineReducers, configureStore} from '@reduxjs/toolkit';
import storage from 'redux-persist/lib/storage';
import { persistReducer, persistStore } from 'redux-persist';
import noteReducer from "../feature/note/slice"
import cityReducer from "../feature/cities/slice"


const persistConfig = {
    key: 'root',
    storage,
}

const rootReducer = combineReducers({
    note: noteReducer,
    city: cityReducer
})

const persistedReducer = persistReducer(persistConfig, rootReducer)


export const store =  configureStore({
    reducer: persistedReducer,
});


export const persistor = persistStore(store)