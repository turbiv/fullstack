import React from 'react';
import CreateAnecdote from "./components/CreateAnecdote"
import AnecdoteList from "./components/AnecdoteList"

const App = (props) => {

  return (
    <div>
      <AnecdoteList store={props.store}/>
      <CreateAnecdote store={props.store}/>
    </div>
  )
};

export default App