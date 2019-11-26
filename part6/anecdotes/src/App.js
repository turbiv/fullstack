import React from 'react';
import {vote, create} from "./reducers/anecdoteReducer";

const App = (props) => {
  const anecdotes = props.store.getState();

  const handleCreateAnecdote = (event) =>{
    event.preventDefault();
    props.store.dispatch(create(event.target.anecdote.value))
  };

  return (
    <div>
      <h2>Anecdotes</h2>
      {anecdotes.map(anecdote =>
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
      <h2>create new</h2>
      <form onSubmit={handleCreateAnecdote}>
        <div><input name="anecdote"/></div>
        <button type={"submit"}>create</button>
      </form>
    </div>
  )
};

export default App