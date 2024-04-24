import { useState } from 'react'
import axios from 'axios'
import { useEffect } from 'react'

function retrieveCountryByName(name) {
  const url = `https://studies.cs.helsinki.fi/restcountries/api/name/${name}`
  return axios
    .get(url)
    .then(response => response.data)
}
function retrieveCountriesNames() {
  const url = `https://studies.cs.helsinki.fi/restcountries/api/all`
  return axios
    .get(url)
    .then(response => response.data.map(country => country.name.common))
}
function retrieveCountries() {
  const url = `https://studies.cs.helsinki.fi/restcountries/api/all`
  return axios
    .get(url)
    .then(response => response.data)
}

function CountryListing({ countries, input, setInput }) {

  const matching = countries.filter(country => country.name.common.toLowerCase().includes(input.toLowerCase()))
  if (matching.length > 10) {
    return <>Too many matches, specify another filter</>
  } else if (matching.length > 1) {
    return (
      <>
        {
          matching.map(country => {
            const name = country.name.common
            return <li key={name}>{name} <button onClick={()=>setInput(name)}>show</button></li>
          })
        }
      </>
    )
  } else if (matching.length > 0) {
    const country = matching[0]
    return (
      <>
        <h1>{country.name.common}</h1>
        <p>
          capital {country.capital[0]}
          <br />
          area {country.area}
        </p>
        <h3>languages:</h3>
        <ul>
          {
            Object.values(country.languages).map(lang=>{
              return <li key={lang}>{lang}</li>
            })
          }
        </ul>
        <img src={country.flags.png} alt="" />
      </>
    )
  } else {
    return null
  }
}
function App() {

  const [countries, setCountries] = useState([])
  const [name, setName] = useState("")

  function handleNameChange(event) {setName(event.target.value)}

  useEffect(() => {
    retrieveCountries()
      .then(data => {
        setCountries(data)
      })
  }, [])

  return (
    <>
      <div>find countries <input value={name} onChange={handleNameChange} /></div>

      <CountryListing countries={countries} input={name} setInput={setName}/>

    </>
  )
}

export default App
