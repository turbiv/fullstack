import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import thunk from 'redux-thunk';
import {combineReducers, createStore, applyMiddleware} from "redux";
import anecdoteReducer from "./reducers/anecdoteReducer"
import notificationReducer  from "./reducers/notificationReducer"
import { Provider } from 'react-redux'

const reducers = combineReducers({
  anecdote: anecdoteReducer,
  notification: notificationReducer
});

const store = createStore(reducers, applyMiddleware(thunk));

const renderPage  = () => ReactDOM.render(<Provider store={store}><App/></Provider>, document.getElementById('root'));

renderPage();
store.subscribe(renderPage);