import personService from "./services/persons"
import { useEffect, useState } from 'react'
import Filter from './components/Filter'
import PersonListing from './components/PersonListing'
import PersonForm from './components/PersonForm'
import Notification from './components/Notification'



function App() {
  
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState("")
  const [newNumber, setNewNumber] = useState("")
  const [filter, setFilter] = useState("")
  const [notificationMessage, setNotificationMessage] = useState(null)
  const [notificationType, setNotificationType] = useState("error")
 
  function handleFilterChange(event) {
    setFilter(event.target.value.toLowerCase())
  }
  function handleNumberChange(event) {
    setNewNumber(event.target.value)
  }
  function handleNameChange(event) {
    setNewName(event.target.value)
  }
  function addPerson(event) {
    event.preventDefault()
    console.log("submitted");
    const duplicate = persons.find(person => person.name == newName)
    const isNameAvailable = !duplicate
    console.log(isNameAvailable);
    if (isNameAvailable) {
      personService
        .create({ name: newName, number: newNumber })
        .then(person => {
          setNotificationType("success")
          setNotificationMessage(`Added ${newName}`)
          setTimeout(() => {
            setNotificationMessage(null)
          }, 5000);
          setPersons(persons.concat(person))

        })
    } else {
      if (confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)) {
        personService
          .update(duplicate.id, { ...duplicate, number: newNumber })
          .then(updatedPerson => {
            setNotificationType("success")
            setNotificationMessage(`Updated ${duplicate.name}`)
            setTimeout(() => {
              setNotificationMessage(null)
            }, 5000);
            setPersons(persons.map(person => person.id == updatedPerson.id ? updatedPerson : person))
          })
          .catch(error=>{
            setNotificationType("error")
            setNotificationMessage(`Information about ${duplicate.name} has already been removed from the server`)
            setTimeout(() => {
              setNotificationMessage(null)
            }, 5000);
            setPersons(persons.filter(person=>person.id!=duplicate.id))
          })
      }

    }
    setNewName('')
    setNewNumber('')
  }
  function removePerson(id) {
    personService
      .remove(id)
      .then(person => {
        setPersons(persons.filter(person => person.id != id))
      })
  }

  useEffect(() => {
    personService
      .retrieveAll()
      .then(persons => {
        setPersons(persons.concat({name:"Harold Wren", number:"4", id:"40f"})) // REMOVE THIS
      })
  }, [])

  console.log("render", persons.length);
  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={notificationMessage} type={notificationType}/>
      <Filter value={filter} onChange={handleFilterChange} />
      <h2>add a new</h2>
      <PersonForm
        onSubmit={addPerson}
        onNameChange={handleNameChange}
        onNumberChange={handleNumberChange}

        newNameValue={newName}
        newNumberValue={newNumber}
      />

      <h2>Numbers</h2>
      <PersonListing persons={persons} filter={filter} remove={removePerson} />

    </div>
  )
}

export default App
