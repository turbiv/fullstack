import React, { useState, useEffect } from 'react'
import ReactDOM from "react-dom";
import axios from 'axios'


const Rendercountries = ({countries, filter}) =>{

    const filteredcountires = countries.map(country =>{
       if(country.name.includes(filter)){
           return {name: country.name, population: country.population, languages: country.languages.map(lang => lang.name)}
       }
    }).filter(n => n);
    console.log(filteredcountires);

    if(filteredcountires.length <= 10){
        const listcountries = filteredcountires.map(country => <p>{country.name}</p>);
        console.log(listcountries);
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
        console.log("effect is in use");
        axios
            .get('https://restcountries.eu/rest/v2/all')
            .then(response =>{
                console.log(response.data);
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