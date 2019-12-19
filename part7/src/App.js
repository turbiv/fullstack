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
import {createAnecdote} from "./reducers/anecdoteReducer";

const NewAnecdote = withRouter(CreateNew);

const App = (props) => {

  const [notification, setNotification] = useState('');

  const addNew = (anecdote) => {
    anecdote.id = (Math.random() * 10000).toFixed(0);
    props.store.dispatch(createAnecdote(anecdote));
    setNotification("Created new anecdote: " + anecdote.content);
    setTimeout(() =>{
      setNotification("")
    }, 10000)
  };

  const anecdoteById = (id) =>
    props.store.getState().anecdote.find(a => a.id === id);

  const vote = (id) => {
    const anecdote = anecdoteById(id);

    const voted = {
      ...anecdote,
      votes: anecdote.votes + 1
    };

    //setAnecdotes(anecdotes.map(a => a.id === id ? voted : a))
  };


  return (
    <div>
      <Router>
        <h1>Software anecdotes</h1>
        <Menu />
        <p>{notification}</p>
        <Route exact path="/" render={() => <AnecdoteList anecdotes={props.store.getState().anecdote} />}/>
        <Route exact path={"/anecdotes/:id"} render={({match}) => <Anecdote anecdote={anecdoteById(match.params.id)}/>}/>
        <Route path="/about" render={() => <About />}/>
        <Route path="/newanecdote" render={() => <NewAnecdote store={props.store} addNew={addNew} />}/>
        <Footer />
      </Router>
    </div>
  )
};

export default App;