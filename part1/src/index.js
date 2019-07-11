import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Button = (props) =>{
  return(
    <button onClick={props.handleClick}>
      {props.rating}
    </button>
  );
};

const App = () => {
  // save clicks of each button to own state
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);
  const allfeedback = good + bad + neutral;

  const calc_percent = () => {
    if(allfeedback !== 0) {
      return (good / allfeedback) * 100
    }else{
      return 0
    }
  };

  const avarage_score = () => {
    if(allfeedback !== 0) {
      const score = good + -Math.abs(bad);
      return score/allfeedback
    }else{
      return 0
    }
  };

  return (
    <div>
      <h1>Give feedback</h1>
      <Button handleClick={() => setGood(good + 1)} rating={"Good"} />
      <Button handleClick={() => setNeutral(neutral + 1)} rating={"Neutral"} />
      <Button handleClick={() => setBad(bad + 1)} rating={"Bad"} />
      <h1>Statistics</h1>
      <p>Good: {good}</p>
      <p>Neutral: {neutral}</p>
      <p>Bad: {bad}</p>
      <p>All: {allfeedback}</p>
      <p>Avarage: {avarage_score()}</p>
      <p>Positive: {calc_percent()}%</p>
    </div>
  )
};

ReactDOM.render(<App />,
  document.getElementById('root')
);