import { useState,useEffect } from 'react'
import axios from 'axios'
import comm from './services/comm'
import Notification from './Notification'


const Display = ({ persons ,filterName ,setPersons, newAlert }) => {
  const filteredPersons=persons.filter(({name}) => name.toLowerCase().includes(filterName.toLowerCase()))
  const handleDelete=(id) => {
    if(confirm('Are you sure you want to delete this person?')) {
     comm.del(id).then(() => setPersons(persons.filter(p => p.id !== id)))
     newAlert('Deleted person', false)
    }
  }
  return (
    <div>
      {filteredPersons.map(person => <p key={person.id}>{person.name} {person.number} <button onClick={() => handleDelete(person.id)}>delete</button></p>)}
    </div>
  )
}


const PersonForm = ({ newName, newNumber, handleNameChange, handleNumberChange, addPerson }) => {
  return (
    <form onSubmit={addPerson}>
      <div>
        name: <input value={newName} onChange={handleNameChange}/> <br />
        number: <input value={newNumber} onChange={handleNumberChange}/>
      </div>
      <div>
        <button type="submit">add</button>
      </div>
    </form>
  )
}

const Filter = ({ filterName, setFilterName }) => {
  return (
    <div>
      filter person with name: <input value={filterName} onChange={(event) => setFilterName(event.target.value)} />
    </div>
  )
}

const App = () => {
  
  
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filterName, setFilterName] = useState('')
  const [error, setError] = useState(false)
  const [message, setMessage] = useState(null)

  useEffect(() => {
    comm.getAll().then(initialPersons => {
      setPersons(initialPersons)
    })
  }, [])

  const newAlert = (message,error) => {
    setMessage(message)
    setError(error)
    setTimeout(() => {
      setMessage(null)
    }, 5000)
  }

  const addPerson = (event) => {
    event.preventDefault()
    const checker=persons.filter(({name}) => name===newName)
    
    if(newName.length===0){
      newAlert('Name cannot be empty', true)
      return
    }

    if(newNumber.length===0){
      newAlert('Number cannot be empty', true)
      return
    }

    if(checker.length>0){
      if (confirm(`${newName} is already added to phonebook, update phonenumber?`)){
        const personObject = {
          name: newName,
          number: newNumber
        }
        comm.update(checker[0].id, personObject).then(response => {
          setPersons(persons.map(p => p.id !== checker[0].id ? p : response))
          newAlert(`Updated ${newName}'s number`, false)
        }).catch(error => {newAlert(`Information of ${newName} not found`, true)})
      }
      return
    }

    const personObject = {
      name: newName,
      number: newNumber
    }

    comm.create(personObject).then(response => {
      setPersons(persons.concat(response))
      newAlert(`Added ${newName}`, false)
    })

    setNewName('')
    setNewNumber('')
  }

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  return (
    <div>
      <Notification message={message} error={error} />
      <h2>Phonebook</h2>
      <Filter filterName={filterName} setFilterName={setFilterName} />
      <h3>add a person</h3>
      <PersonForm newName={newName} newNumber={newNumber} handleNameChange={handleNameChange} handleNumberChange={handleNumberChange} addPerson={addPerson} />
      <h3>Numbers</h3>
      <Display persons={persons} filterName={filterName} setPersons={setPersons} newAlert={newAlert} />
    </div>
  )
}

export default App