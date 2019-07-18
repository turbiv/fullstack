import React, { useState } from 'react'
import ReactDOM from "react-dom";

const App = () => {
    const [ persons, setPersons] = useState([
        { name: 'Arto Hellas' }
    ]);
    const [ newName, setNewName ] = useState('');

    const addPerson = (event) =>{
        event.preventDefault();
        console.log("Button clikced", event.target);
        console.log(persons.includes({name: newName}));
        console.log(persons);
        if(persons.includes({name: newName})){
            alert(event.target.value + " is in the phonebook");
            return
        };

        setPersons(persons.concat({name: newName}));
        setNewName('');
    };

    const handlePersonChange = (event) =>{
        console.log(event.target.value);
        setNewName(event.target.value)
    };

    return (
        <div>
            <h2>Phonebook</h2>
            <form onSubmit={addPerson}>
                <div>
                    name: <input onChange={handlePersonChange} value={newName}/>
                </div>
                <div>
                    <button type="submit">add</button>
                </div>
            </form>
            <h2>Numbers</h2>
            ...
        </div>
    )
};

ReactDOM.render(<App />, document.getElementById('root'));