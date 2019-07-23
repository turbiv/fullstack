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
          {filteredcountires.languages.map((lang, i) => <li key={i}>{lang.name}</li>)}
        </ul>
    </div>)
};

const Rendercountries = ({countries, filter}) =>{
  const [countryMoreInfo, setCountryMoreInfo] = useState(undefined);

  const filteredcountires = countries.filter(country => country.name.includes(filter) );

  const showcountries = () => {
    if (filteredcountires.length <= 10) {
      return filteredcountires.map((country, i) =>{
        return <p key={i}>{country.name}
          <button onClick={() => setCountryMoreInfo(country)} >Show</button></p>
        }
      );
    }else{
      return(<p>Try being more specific with the search</p>);
    }
  };

  if(filteredcountires.length === 1){
    return(<Countryinfo filteredcountires={filteredcountires[0]}/>) // TODO plural
  }

  if(countryMoreInfo){
    return(<div>
      {showcountries()}
      <Countryinfo filteredcountires={countryMoreInfo}/>
      <Currentweather city={countryMoreInfo.capital}/>
    </div>)
  }else{
    return(<div>{showcountries()}</div>)
  }
};

const Searchfilter = ({handle, value}) =>{
  const preventdefault = (e) =>{
    e.preventDefault()
  };

  return(
      <form onSubmit={preventdefault}>
          <div>
              filter shown with<input onChange={handle} value={value}/>
          </div>
      </form>);
};

const Currentweather = ({city}) =>{
  const [weather, setWeather] = useState({});
  useEffect(() =>{
    axios
      .get('https://api.apixu.com/v1/current.json?key=750b41845a5141c8912133526192307',{
        params:{
          q: 'Helsinki'
        }
      })
      .then(response => {
        console.log(response.data)
        return setWeather(response.data)});
    console.log(weather)
  },[]);
  return(<p>Test</p>)
/*  return(<div>
    <p>Temperature: {weather.current.temp_c}</p>
    <p>Wind: {weather.current.wind_kph} kph direction {weather.current.wind_dir}</p>
  </div>)*/
};

const App = () => {
    const [country, setCountry] = useState([]); // TODO plural!
    const [filter,setFilter] = useState('');

    useEffect(() =>{
        axios
            .get('https://restcountries.eu/rest/v2/all')
            .then(response => setCountry(response.data));
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