import React, { useState } from 'react'
import {
  BrowserRouter as Router,
  Route, withRouter
} from 'react-router-dom'
import {connect} from "react-redux"
import CreateNew from "./components/CreateNew"
import Anecdote from "./components/Anecdote"
import AnecdoteList from "./components/AnecdoteList"
import Menu from "./components/Menu"
import Footer from "./components/Footer"
import About from "./components/About"
const NewAnecdote = withRouter(CreateNew);

const App = (props) => {

  const anecdoteById = (id) =>
    props.anecdote.find(a => a.id === id);

  return (
    <div>
      <Router>
        <h1>Software anecdotes</h1>
        <Menu />
        <p>{props.notification}</p>
        <Route exact path="/" render={() => <AnecdoteList anecdotes={props.anecdote} />}/>
        <Route exact path={"/anecdotes/:id"} render={({match}) => <Anecdote anecdote={anecdoteById(match.params.id)}/>}/>
        <Route path="/about" render={() => <About />}/>
        <Route path="/newanecdote" render={() => <NewAnecdote store={props.store}/>}/>
        <Footer />
      </Router>
    </div>
  )
};

const mapStateToProps = (state) => {
  return {
    anecdote: state.anecdote,
    notification: state.notification
  }
};

const connectedApp = connect(mapStateToProps)(App);
export default connectedApp;