import React from "react"
import { connect } from 'react-redux'
import {create} from "../reducers/anecdoteReducer";
import {createNotification} from "../reducers/notificationReducer";

const CreateAnecdote = (props) =>{
  const handleCreateAnecdote = (event) =>{
    event.preventDefault();
    props.create(event.target.anecdote.value);
    props.createNotification(event.target.anecdote.value)
  };

  return(
    <div>
      <h2>create new</h2>
      <form onSubmit={handleCreateAnecdote}>
        <div><input name="anecdote"/></div>
        <button type={"submit"}>create</button>
      </form>
    </div>
  )
};

const mapDispatchToProps = {
  create,
  createNotification
};

const connectedCreateAnecdote = connect(null, mapDispatchToProps)(CreateAnecdote);
export default connectedCreateAnecdote