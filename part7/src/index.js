import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import {combineReducers, createStore, applyMiddleware} from "redux";
import anecdoteReducer from "./reducers/anecdoteReducer"
import notificationReducer  from "./reducers/notificationReducer"

const reducers = combineReducers({
  anecdote: anecdoteReducer,
  notification: notificationReducer
});

const store = createStore(reducers);

const render  = () => ReactDOM.render(<App store={store}/>, document.getElementById('root'));

render();
store.subscribe(render);