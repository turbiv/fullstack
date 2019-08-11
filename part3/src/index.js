import React, { useState, useEffect } from 'react'
import ReactDOM from "react-dom";
import Persons from './services/Persons'


const RenderPersons = ({persons, filter, handleDelete}) =>{

  return(persons.map(person => {
    if(person.name.includes(filter)){

      return(<p key={person.id}>{person.name + " " + person.number} <button id={person.id} value={person.name} onClick={handleDelete}>Delete</button></p>)
    }
  }));
};

const SearchFilter = ({handle, value}) =>{
  return(
    <form>
      <div>
        filter shown with<input onChange={handle} value={value}/>
      </div>
    </form>);
};

const AddPeople = ({onsubmit, onNameChange, onNumberChange, namevalue, numbervalue}) =>{
  return(
    <form onSubmit={onsubmit}>
      <div>
        name: <input onChange={onNameChange} value={namevalue}/>
      </div>
      <div>number: <input onChange={onNumberChange} value={numbervalue}/></div>
      <div>
        <button type="submit">add</button>
      </div>
    </form>);
};

const Notification = ({name, error}) =>{
  if(name === null){
    return null
  }

  const color = error ? "red" : "green";

  const notificationStyle = {
    color: color,
    background: "lightgrey",
    fontSize: 20,
    borderStyle: "solid",
    borderRadius: 5,
    padding: 10,
    marginBottom: 10
  };

  return(
    <div style={notificationStyle}>
      <p>{name}</p>
    </div>
  );
};

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName ] = useState('');
  const [newNumber,setNewNumber] = useState('');
  const [filter,setFilter] = useState('');
  const [notificationName, setNotificationName] = useState(null);
  const [errorState, setErrorState] = useState(false);

  useEffect(() =>{
    console.log("effect is in use");
    Persons
      .getAllPersons()
      .then(response => setPersons(response))
  },[]);

  const addPerson = (event) =>{
    event.preventDefault();
    console.log(newNumber);
    if(newNumber.length === 0 || newName.length === 0){
      alert("Both inputs have to be filled in");
      setNewNumber('');
      setNewName('');
      return
    }

    if(persons.some(e => e.name === newName)) {
      if (window.confirm(newName + "is already added to phonebook, replace the old number with a new one?")) {
        const getperson = persons.find(person => {
          if (person.name === newName) return person
        });

        const newnumber = {...getperson, number: newNumber};

        Persons
          .updatePersonNumber(newNumber, getperson.id, newnumber)
          .then(response => setPersons(persons.map(person => person.id !== getperson.id ? person : response)))
          .catch(error => {
            setNotificationName(error.response.data.error);
            setErrorState(true);
            setTimeout(() =>{
              setNotificationName(null);
              setErrorState(false);
            }, 5000)});
        setNewName('');
        setNewNumber('');
        return
      }else{
        setNewNumber('');
        return
      }
    }

    const personobj = {name: newName, number: newNumber};
    Persons
      .addPerson(personobj)
      .then(response =>{
        setPersons(persons.concat(response));
        setNotificationName(`${newName} was added to the phonebook`);
        setTimeout(() =>{
          setNotificationName(null);
        }, 5000);
        setNewName('');
        setNewNumber('');
      })
  };

  const handlePersonChange = (event) =>{
    setNewName(event.target.value)
  };

  const handleNumberChange = (event) =>{
    setNewNumber(event.target.value)
  };

  const handleFilterChange = (event) =>{
    setFilter(event.target.value)
  };

  const handleDelete = (event) =>{
    const personid = event.target.id;
    const personname = event.target.value;

    if(window.confirm("are you sure you want to delete " + event.target.value )) {
      Persons
        .removePerson(personid)
        .then(response => {
          setPersons(persons.filter(person => personid !== person.id))
        }).catch(error =>{
        setNotificationName(`${personname} was added to the phonebook`);
        setErrorState(true);
        setTimeout(() =>{
          setNotificationName(null);
          setErrorState(false)
        }, 5000);
        setPersons(persons.filter(person => personid !== person.id))})
    }
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <SearchFilter handle={handleFilterChange} value={filter}/>
      <h2>Add a new</h2>
      <Notification name={notificationName} error={errorState}/>
      <AddPeople onsubmit={addPerson} onNameChange={handlePersonChange} onNumberChange={handleNumberChange} namevalue={newName} numbervalue={newNumber}/>
      <h2>Numbers</h2>
      <RenderPersons persons={persons} filter={filter} handleDelete={handleDelete}/>
    </div>
  )
};

ReactDOM.render(<App />, document.getElementById('root'));