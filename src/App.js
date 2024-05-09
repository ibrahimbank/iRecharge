import './App.css';
import {persistor, store} from './store/index';
import {BrowserRouter} from "react-router-dom";
import Index from "./route";
import {Provider} from "react-redux";
import { PersistGate } from 'redux-persist/integration/react';

function App() {
  return (
    <BrowserRouter >
                <Index/>

    </BrowserRouter>
  );
}

export default App;
