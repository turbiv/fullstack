import React from "react"
import {vote} from "../reducers/anecdoteReducer";

const AnecdoteList = (props) =>{
  const anecdotes = props.store.getState();

  return(
    <div>
      <h2>Anecdotes</h2>
      {anecdotes.sort((itema, itemb) => (itema.votes <= itemb.votes) ? 1 : -1).map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => props.store.dispatch(vote(anecdote.id))}>vote</button>
          </div>
        </div>
      )}
    </div>
  )
};

export default AnecdoteList