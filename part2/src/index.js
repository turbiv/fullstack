import React, { useState, useEffect } from 'react'
import ReactDOM from "react-dom";
import axios from 'axios'


const Rendercountries = ({countires, filter}) =>{
    return(countires.map(country => {
        if(country.name.includes(filter)){
            return(<p>{country.name}</p>)
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

const App = () => {
    const [country, setCountry] = useState([]);
    const [filter,setFilter] = useState('');

    useEffect(() =>{
        console.log("effect is in use");
        axios
            .get('https://restcountries.eu/rest/v2/all')
            .then(response =>{
                console.log(response.data)
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
            <Rendercountries countires={country} filter={filter}/>
        </div>
    )
};

ReactDOM.render(<App />, document.getElementById('root'));