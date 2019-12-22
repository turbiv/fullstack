import React from 'react'
import ReactDOM from 'react-dom'
import App from "./App"
import thunk from 'redux-thunk';
import {combineReducers, createStore, applyMiddleware} from "redux";
import { Provider } from 'react-redux'
import blogReducer from "./reducers/blogReducer"
import notificationReducer from "./reducers/notificationReducer"
import loginReducer from "./reducers/loginReducer"
import usersReducer from "./reducers/usersReducer"

const reducers = combineReducers({
  blogs: blogReducer,
  notification: notificationReducer,
  login: loginReducer,
  users: usersReducer
});

const store = createStore(reducers, applyMiddleware(thunk));

const renderPage = () => ReactDOM.render(<Provider store={store}><App /></Provider>, document.getElementById('root'));

renderPage();
store.subscribe(renderPage);