import React, { useState } from 'react'
import {
  BrowserRouter as Router,
  Route, withRouter
} from 'react-router-dom'
import CreateNew from "./components/CreateNew"
import Anecdote from "./components/Anecdote"
import AnecdoteList from "./components/AnecdoteList"
import Menu from "./components/Menu"
import Footer from "./components/Footer"
import About from "./components/About"
import {voteAnecdote} from "./reducers/anecdoteReducer";

const NewAnecdote = withRouter(CreateNew);

const App = (props) => {

  const anecdoteById = (id) =>
    props.store.getState().anecdote.find(a => a.id === id);

  const vote = (id) => props.store.dispatch(voteAnecdote(id));

  return (
    <div>
      <Router>
        <h1>Software anecdotes</h1>
        <Menu />
        <p>{props.store.getState().notification}</p>
        <Route exact path="/" render={() => <AnecdoteList anecdotes={props.store.getState().anecdote} />}/>
        <Route exact path={"/anecdotes/:id"} render={({match}) => <Anecdote anecdote={anecdoteById(match.params.id)}/>}/>
        <Route path="/about" render={() => <About />}/>
        <Route path="/newanecdote" render={() => <NewAnecdote store={props.store}/>}/>
        <Footer />
      </Router>
    </div>
  )
};

export default App;