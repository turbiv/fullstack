import React from 'react'

const Header = ({parts, course}) =>{
    return <h2>{parts[course].name}</h2>
};


const Total = ({parts, course}) =>{
    const sum = parts[course].parts.reduce((accumulator, currentValue) => currentValue.exercises + accumulator, 0);
    return <b>Total of {sum} exercises</b>
};


const CourseBody = ({parts, course}) => {
    return <div>{parts[course].parts.map(part => <p key={part.id}>{part.name} {part.exercises}</p>)}</div>
};

const Course = ({parts}) => {
    return (<div>
        <h1>Web development curriculum</h1>
        <Header parts={parts} course={0}/>
        <CourseBody parts={parts} course={0}/>
        <Total parts={parts} course={0}/>
        <Header parts={parts} course={1}/>
        <CourseBody parts={parts} course={1}/>
        <Total parts={parts} course={1}/>
    </div>);
};


export default Course