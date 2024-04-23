import axios from 'axios'
import { useEffect, useState } from 'react'
import Filter from './components/Filter'
import PersonListing from './components/PersonListing'
import PersonForm from './components/PersonForm'


function App() {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState("")
  const [newNumber, setNewNumber] = useState("")
  const [filter, setFilter] = useState("")
  
  function handleFilterChange(event) {
    setFilter(event.target.value.toLowerCase())
  }
  function handleNumberChange(event) {
    setNewNumber(event.target.value)
  }
  function handleNameChange(event) {
    setNewName(event.target.value)
  }
  function submit(event) {
    event.preventDefault()
    console.log("submitted");
    const isNameAvailable = !persons.find(person => person.name == newName)
    if (isNameAvailable) {
      setPersons(persons.concat({ name: newName, number:newNumber, id:persons.length+1 }))
      setNewName('')
      setNewNumber('')
    } else {
      alert(`${newName} is already added to phonebook`)
    }
  }

  useEffect(()=>{
    axios
    .get("http://localhost:3001/persons")
    .then(response=>{
      setPersons(response.data)
    })
  }, [])


  return (
    <div>
      <h2>Phonebook</h2>
      <Filter value={filter} onChange={handleFilterChange}/>
      <h2>add a new</h2>
      <PersonForm 
        onSubmit={submit} 
        onNameChange={handleNameChange}
        onNumberChange={handleNumberChange}

        newNameValue={newName}
        newNumberValue={newNumber}
      />
      
      <h2>Numbers</h2>
      <PersonListing persons={persons} filter={filter} />

    </div>
  )
}

export default App
