import { useState,useEffect } from 'react'
import axios from 'axios'


const baseUrl = "https://studies.cs.helsinki.fi/restcountries/api/"
//const apiKey = import meta.env.VITE_API_KEY
const Display = ({countries, setFilteredCountries}) => {
  if (countries.length > 10) {
    return <p>Too many matches, specify another filter</p>
  } 
  if (countries.length === 0) {
    return <p>No matches</p>
  }
  else if (countries.length === 1) {
    const country = countries[0]
    // const [weather, setWeather] = useState("")
    // let [lat, lon] = country.capitalInfo.latlng
    // useEffect(() => {
    //   axios.get("https://api.openweathermap.org/data/4.0/onecall/current?lat=${lat}&lon=${lon}&appid={apiKey}").then(response => {
    //     setWeather(response.data)
    //   })
    // }, [country.capital])
    return (
      <div>
        <h1>{country.name.common}</h1>
        <p>capital {country.capital}</p>
        <p>area {country.area}</p>
        <h2>languages:</h2>
        <ul>
          {Object.values(country.languages).map(language => <li key={language}>{language}</li>)}
        </ul>
        {/* <h2>Weather in {country.capital}</h2>
        {weather ? (
          <div>
            <p>Temperature: {weather.main.temp}°C</p>
            <p>Humidity: {weather.main.humidity}%</p>
          </div>
        ) : (
          <p>Loading weather data...</p>
        )} */}
        <img src={country.flags.png} alt={"Flag of ${country.name.common}"} />
      </div>
    )
  } else {
    return <div>{countries.map(country => <p key={country.name.common}>{country.name.common} <button onClick={() => setFilteredCountries([country])}>show</button></p>)}</div>
  }
}

const App = () => {
  const [countries, setCountries] = useState([])
  const [filterName, setFilterName] = useState('')
  const [filteredCountries, setFilteredCountries] = useState([])


  const handleFilterChange = (event) => {
    setFilterName(event.target.value)
    const newFilteredCountries = countries.filter(country => country.name.common.toLowerCase().includes(event.target.value.toLowerCase()))
    setFilteredCountries(newFilteredCountries)
  }
  
  useEffect(() => {
    axios.get(baseUrl + 'all').then(response => {
      setCountries(response.data)
    })
  }, [])

  return (
    <div>
      Find countries: <input value={filterName} onChange={handleFilterChange} />
      <Display countries={filteredCountries} setFilteredCountries={setFilteredCountries} />
    </div>
  )
}

export default App