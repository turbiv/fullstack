import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Button = ({handleClick, text}) =>{
  return(
      <button onClick={handleClick}>
        {text}
      </button>
  );
};



const App = (props) => {
  const [selected, setSelected] = useState('If it hurts, do it more often');
  const [votes, setVotes] = useState([0,0,0,0,0,0,0]);
  const randomanecdote = Math.floor(Math.random()*props.anecdotes.length);

  const placevote = () =>{
    const copy = [...votes];
    copy[props.anecdotes.indexOf(selected)] +=1;
    return copy
  };

  const Topanecdote = () =>{
    const copy = [...votes];
    let maxvote = copy.indexOf(Math.max(...copy));
    console.log(maxvote);

    return(
        <div>
          <h1>Anecdote with most votes</h1>
          <p>{anecdotes[maxvote]}</p>
          <p>Votes: {copy[maxvote]}</p>
        </div>
    );
  };

  return (
    <div>
      <h1>Anecdote of the day</h1>
      {selected}
      <p>Current votes on this anecdote: {votes[props.anecdotes.indexOf(selected)]}</p>
      <p>
        <Button handleClick={() => setSelected(props.anecdotes[randomanecdote])} text={"Next anecdote"} />
        <Button handleClick={() => setVotes(placevote())} text={"Vote"} />
      </p>
      <Topanecdote/>
    </div>
  );
};

const anecdotes = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
];

ReactDOM.render(
  <App anecdotes={anecdotes} />,
  document.getElementById('root')
);