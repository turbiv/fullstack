import React from 'react'

const Anecdote = (props) =>{
  console.log(props.anecdote);
  const anecdote = props.anecdote;
  return(
    <div>
      <p>Author: {anecdote.author}</p>
      <p>{anecdote.content}</p>
      <p>Info: {anecdote.info}</p>
      <p>Votes: {anecdote.votes}</p>
    </div>
  )
};

export default Anecdote