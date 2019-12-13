import React from 'react';
import {useEffect} from 'react'
import { connect } from 'react-redux'
import CreateAnecdote from "./components/CreateAnecdote"
import AnecdoteList from "./components/AnecdoteList"
import Notification from "./components/Notification"
import anecdotesService from "./services/anecdotes";
import {initialize} from "./reducers/anecdoteReducer";

const App = (props) => {
  useEffect(() =>{
    anecdotesService.getAll().then(anecdotes =>{
      props.initialize(anecdotes);
      console.log("asd")
    });
  },[props]);

  return (
    <div>
      <Notification />
      <AnecdoteList />
      <CreateAnecdote />
    </div>
  )
};



const connectedApp = connect(null, {initialize})(App);
export default connectedApp