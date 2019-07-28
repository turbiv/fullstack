import React, { useState, useEffect } from 'react'
import ReactDOM from "react-dom";
import axios from 'axios'

const CountryInfo = ({filteredcountires}) =>{
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

const RenderCountries = ({countries, filter}) =>{
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
    return(<div>
      <CountryInfo filteredcountires={filteredcountires[0]}/>
      <CurrentWeather city={filteredcountires[0].capital}/>
    </div>) // TODO plural
  }

  if(countryMoreInfo){
    return(<div>
      {showcountries()}
      <CountryInfo filteredcountires={countryMoreInfo}/>
      <CurrentWeather city={countryMoreInfo.capital}/>
    </div>)
  }else{
    return(<div>{showcountries()}</div>)
  }
};

const SearchFilter = ({handle, value}) =>{
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

const CurrentWeather = ({city}) =>{
  const [weather, setWeather] = useState({});
  const [weatherImage, setWeatherImage] = useState({});
  useEffect(() =>{
    axios
      .get('https://api.apixu.com/v1/current.json?key=750b41845a5141c8912133526192307',{
        params:{
          q: city
        }
      })
      .then(response => {
        setWeather(response.data.current);
        setWeatherImage(response.data.current.condition.icon);
      })
  },[]);
  return(<div>
    <p>Temperature: {weather.temp_c}</p>
    <img alt={""} src={weatherImage} />
    <p>Wind: {weather.wind_kph} kph direction {weather.wind_dir}</p>
  </div>)
};

const App = () => {
    const [countries, setCountries] = useState([]);
    const [filter,setFilter] = useState('');

    useEffect(() =>{
        axios
            .get('https://restcountries.eu/rest/v2/all')
            .then(response => setCountries(response.data));
    },[]);


    const handleFilterChange = (event) =>{
        setFilter(event.target.value)
    };

    return (
        <div>
            <h2>Country finder</h2>
            <SearchFilter handle={handleFilterChange} value={filter}/>
            <RenderCountries countries={countries} filter={filter}/>
        </div>
    )
};

ReactDOM.render(<App />, document.getElementById('root'));