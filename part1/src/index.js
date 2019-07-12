import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Button = (props) =>{
  return(
    <button onClick={props.handleClick}>
      {props.rating}
    </button>
  );
};

const Statistic = ({text, value}) => {
  return(
    <tr>
      <td>
        <p>{text} {value}</p>
      </td>
    </tr>
  );
};

const Statistics = ({good, neutral, bad}) => {

  const allfeedback = good + bad + neutral;

  const calc_percent = () => {
    if(allfeedback !== 0) {
      return (good / allfeedback) * 100
    }
    return 0
  };

  const avarage_score = () => {
    if(allfeedback !== 0) {
      const score =good + -Math.abs(bad);
      return score / allfeedback
    }
    return 0
  };

  if(allfeedback === 0){
    return(
      <div>
        <h1>Statistics</h1>
        <p>No feedback given</p>
      </div>
    );
  }

  return(
    <div>
      <h1>Statistics</h1>
      <table>
        <Statistic text={"Good:"} value={good} />
        <Statistic text={"Neutreal:"} value={neutral} />
        <Statistic text={"Bad:"} value={bad} />
        <Statistic text={"All:"} value={allfeedback} />
        <Statistic text={"Avarage:"} value={avarage_score()} />
        <Statistic text={"Positive:"} value={calc_percent() + "%"} />
      </table>
    </div>
  )
};

const App = () => {
  // save clicks of each button to own state
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  return (
    <div>
      <h1>Give feedback</h1>
      <Button handleClick={() => setGood(good + 1)} rating={"Good"} />
      <Button handleClick={() => setNeutral(neutral + 1)} rating={"Neutral"} />
      <Button handleClick={() => setBad(bad + 1)} rating={"Bad"} />
      <Statistics good={good} neutral={neutral} bad={bad}/>
    </div>
  )
};

ReactDOM.render(<App />,
  document.getElementById('root')
);
