import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import {combineReducers, createStore} from "redux";
import anecdoteReducer from "./reducers/anecdoteReducer"

const reducers = combineReducers({
  anecdote: anecdoteReducer
});

const store = createStore(reducers);

const render  = () => ReactDOM.render(<App store={store}/>, document.getElementById('root'));

render();
store.subscribe(render);