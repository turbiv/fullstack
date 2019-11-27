import React from 'react'
import ReactDOM from 'react-dom'
import { combineReducers, createStore } from 'redux'
import App from './App'
import anecdoteReducer from './reducers/anecdoteReducer'
import notificationReducer from './reducers/notificationReducer'
import filterReducer from "./reducers/filterReducer"

const reducers = combineReducers({
  anecdotes: anecdoteReducer,
  notification: notificationReducer,
  filter: filterReducer
});

const store = createStore(reducers);

const render = () => {
  ReactDOM.render(
    <App store={store} />,
    document.getElementById('root')
  )
};

render();
store.subscribe(render);