import { useState } from 'react'
import Filter from './components/Filter'
import PersonListing from './components/PersonListing'
import PersonForm from './components/PersonForm'


function App() {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456', id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
  ])
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
