import React from "react"
import { connect } from 'react-redux'
import {vote} from "../reducers/anecdoteReducer";
import {createNotification} from "../reducers/notificationReducer";
import AnecdoteFilter from "./AnecdoteFilter"

const AnecdoteList = (props) =>{

  const handleVote = (anecdote) =>{
    props.vote(anecdote);
    props.createNotification("You voted for anecdote named: " + anecdote.content, 5)
  };

  return(
    <div>
      <AnecdoteFilter/>
      <h2>Anecdotes</h2>
      {props.filteredAnecdotes.map(anecdote => {
        if(anecdote.content.toLowerCase().includes(props.filter)){
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

const anecdotesToShow = ({anecdotes}) =>{
    return anecdotes.sort((itema, itemb) => (itema.votes <= itemb.votes) ? 1 : -1)
};

const mapStateToProps = state =>{
  return{
    anecdotes: state.anecdotes,
    filter: state.filter,
    filteredAnecdotes:  anecdotesToShow(state)
  }
};

const mapDispatchToState = {
  vote,
  createNotification
};

const ConnectedAnecdotes = connect(mapStateToProps, mapDispatchToState)(AnecdoteList);
export default ConnectedAnecdotes