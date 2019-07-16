import React from 'react'
import ReactDOM from 'react-dom'
import Courseslist from './components/Courses'

const Header = ({parts, course}) =>{
  return <h2>{parts[course].name}</h2>
};

const Course = ({parts, course}) => {
  return <div>{parts[course].parts.map(part => <p key={part.id}>{part.name} {part.exercises}</p>)}</div>
};

const Total = ({course, parts}) =>{
  const sum = parts[course].parts.reduce((accumulator, currentValue) => currentValue.exercises + accumulator, 0);
  return <b>Total of {sum} exercises</b>
};


const App = () => {
  return (
    <div>
      <h1>Web development curriculum</h1>
      <Header parts={Courseslist} course={0}/>
      <Course parts={Courseslist} course={0}/>
      <Total parts={Courseslist} course={0}/>
      <Header parts={Courseslist} course={1}/>
      <Course parts={Courseslist} course={1}/>
      <Total parts={Courseslist} course={1}/>
    </div>
  )
};

ReactDOM.render(<App />, document.getElementById('root'));