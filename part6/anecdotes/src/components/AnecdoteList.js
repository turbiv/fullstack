import React from "react"
import {vote} from "../reducers/anecdoteReducer";
import {createNotification} from "../reducers/notificationReducer";
import AnecdoteFilter from "./AnecdoteFilter"

const AnecdoteList = (props) =>{
  const anecdotes = props.store.getState().anecdotes;


  const handleVote = (anecdote) =>{
    props.store.dispatch(vote(anecdote.id));
    props.store.dispatch(createNotification("You voted for anecdote named: " + anecdote.content))
  };

  return(
    <div>
      <AnecdoteFilter store={props.store}/>
      <h2>Anecdotes</h2>
      {anecdotes.sort((itema, itemb) => (itema.votes <= itemb.votes) ? 1 : -1).map(anecdote => {
        if(anecdote.content.toLowerCase().includes(props.store.getState().filter)){
          return(
          <div key={anecdote.id}>
            <div>
              {anecdote.content}
            </div>
            <div>
              has {anecdote.votes}
              <button onClick={() => handleVote(anecdote)}>vote</button>
            </div>
          </div>
          )
        }
        return(null)
      })}
    </div>
  )
};

export default AnecdoteList