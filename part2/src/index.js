import React from 'react'
import ReactDOM from 'react-dom'

const Header = (props) =>{
  return <h1>{props.name}</h1>
};

const Part = (props) =>{
  return(<p>{props.part + " " + props.numb}</p>)
};

const Course = (props) => {
  return(
    <div>
      <Part part={props.parts.parts[0].name} numb={props.parts.parts[0].exercises}/>
      <Part part={props.parts.parts[1].name} numb={props.parts.parts[1].exercises}/>
      <Part part={props.parts.parts[2].name} numb={props.parts.parts[2].exercises}/>
    </div>
  );
};

const Total = (props) =>{
  const reducer = (s,p) => s + p;

  const sum = props.parts.parts.reduce((s,p) => {
    console.log(s.exercises,p.exercises);
    console.log(s);
    return s.exercises + p.exercises
  });
  return <p>{sum}</p>
};


const App = () => {
  const parts = {
    name: 'Half Stack application development',
    parts:[
      {
      name: 'Fundamentals of react',
      exercises: 10
      },
      {
        name: 'Using props to pass data',
        exercises: 7
      },
      {
        name: 'State of a component',
        exercises: 14
      }
      ]};

  return (
    <div>
      <Header name={parts.name}/>
      <Course parts={parts}/>
      <Total parts={parts}/>
    </div>
  )
};

ReactDOM.render(<App />, document.getElementById('root'));