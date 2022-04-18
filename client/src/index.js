import React, {createContext} from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import UserStore from "./store/UserStore";
import {REACT_APP_API_URL} from "./utils/consts";
import GameStore from "./store/GameStore";

export const Context = createContext(null);
console.log(REACT_APP_API_URL);

ReactDOM.render(
    <Context.Provider value={{
        user: new UserStore(),
    }}>
        <App/>
    </Context.Provider>,
  document.getElementById('root')
);

