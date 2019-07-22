import React, { useState, useEffect } from 'react'
import ReactDOM from "react-dom";
import axios from 'axios'

const Countryinfo = ({filteredcountires}) =>{
    return(<div>
        <h1>Country info</h1>
        <p>Name: {filteredcountires.name}</p>
        <p>Population: {filteredcountires.population}</p>
        <h2>Languages</h2>
        <ul>
            {filteredcountires.languages.map((lang, i) => <li key={i}>{lang}</li>)}
        </ul>
    </div>)
};

const Rendercountries = ({countries, filter}) =>{
    const [infostatus, setInfo] = useState(false);
    const [countrybuttonid, setCountryButtonId] = useState(undefined);

    const filteredcountires = countries.map(country =>{
       if(country.name.includes(filter)){
           return {name: country.name, population: country.population, languages: country.languages.map(lang => lang.name)}
       }
    }).filter(n => n);

    const handleClick = (e) =>{
        setInfo(true);
        setCountryButtonId(e.target.id);
    };


    if(filteredcountires.length === 1){
        return(<Countryinfo filteredcountires={filteredcountires[0]}/>)
    }

    if(infostatus){
        return(<Countryinfo filteredcountires={filteredcountires[countrybuttonid]}/>)
    }

    if(filteredcountires.length <= 10){
        const listcountries = filteredcountires.map((country, i) => <p key={i}>{country.name} <button id={i} onClick={handleClick}>Press for more info</button></p>);
        return(listcountries);
    }

    return(<p>Too many countries, try another search keyword</p>);
};

const Searchfilter = ({handle, value}) =>{
    return(
        <form>
            <div>
                filter shown with<input onChange={handle} value={value}/>
            </div>
        </form>);
};

const App = () => {
    const [country, setCountry] = useState([]);
    const [filter,setFilter] = useState('');

    useEffect(() =>{
        axios
            .get('https://restcountries.eu/rest/v2/all')
            .then(response =>{
                setCountry(response.data)
            })
    },[]);


    const handleFilterChange = (event) =>{
        setFilter(event.target.value)
    };

    return (
        <div>
            <h2>Country finder</h2>
            <Searchfilter handle={handleFilterChange} value={filter}/>
            <Rendercountries countries={country} filter={filter}/>
        </div>
    )
};

ReactDOM.render(<App />, document.getElementById('root'));