import React, { useState, useEffect } from 'react'
import ReactDOM from "react-dom";
import Persons from './services/Persons'


const Renderpersons = ({persons, filter, handleDelete}) =>{

  return(persons.map(person => {
    if(person.name.includes(filter)){

      return(<p>{person.name + " " + person.number} <button id={person.id} value={person.name} onClick={handleDelete}>Delete</button></p>)
    }
  }));
};

const Searchfilter = ({handle, value}) =>{
  return(
  <form>
    <div>
      filter shown with<input onChange={handle} value={value}/>
    </div>
  </form>);
};

const Addpeople = ({onsubmit, onNameChange, onNumberChange, namevalue, numbervalue}) =>{
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

const App = () => {
  const [persons, setPersons] = useState([]);
    const [newName, setNewName ] = useState('');
    const [newNumber,setNewNumber] = useState('');
    const [filter,setFilter] = useState('');

    useEffect(() =>{
      console.log("effect is in use");
      Persons
        .getAllPersons()
        .then(response => setPersons(response))
    },[]);

    const addPerson = (event) =>{
      event.preventDefault();
      if(newNumber.length === 0 || newName.length === 0){
        alert("Both inputs have to be filled in");
        setNewNumber('');
        setNewName('');
        return
      }

      if(persons.some(e => e.number === newNumber)){


        setNewNumber('');
        return
      }

      if(persons.some(e => e.name === newName)){
        alert(newName + " is in the phonebook");
        if(window.confirm(newName + "is already added to phonebook, replace the old number with a new one?")){

          const updateperson = () =>{ persons.find((person) =>{
            if(person.name === newName) {
              const personel = persons[persons.indexOf(person.name)];
              return {id: personel.id , number: personel.number, name: personel.name}
            }})
          };

          const newnumber = {updateperson};

          Persons
            .updatePersonNumber(newNumber, updateperson().id, newnumber)
            .then(response => console.log(response))
        }

        setNewName('');
        return
      }

      const personobj = {name: newName, number: newNumber};
      Persons
        .addPerson(personobj)
        .then(response =>{
          setPersons(persons.concat(response));
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

      if(window.confirm("are you sure you want to delete " + event.target.value )) {
        Persons
          .removePerson(personid)
          .then(response => {
            setPersons(persons.filter(person => Number(personid) !== person.id))
          })
      }
    };

    return (
        <div>
            <h2>Phonebook</h2>
            <Searchfilter handle={handleFilterChange} value={filter}/>
            <h2>Add a new</h2>
            <Addpeople onsubmit={addPerson} onNameChange={handlePersonChange} onNumberChange={handleNumberChange} namevalue={newName} numbervalue={newNumber}/>
            <h2>Numbers</h2>
            <Renderpersons persons={persons} filter={filter} handleDelete={handleDelete}/>
        </div>
    )
};

ReactDOM.render(<App />, document.getElementById('root'));