import React, { useState, useEffect } from 'react'
import axios from 'axios';
import PersonForm from './components/PersonForm';
import Persons from './components/Persons';
import Filter from './components/Filter';


const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState("")
  const [filter, setFilter] = useState("");
  const [filteredPersons, setFilteredPersons] = useState(persons);

  useEffect(() => {
    console.log("effect");
    axios
      .get("http://localhost:3001/persons")
      .then(response => {
        console.log("promise fulfilled");
        console.log(response.data)
        setPersons(response.data)
        setFilteredPersons(response.data)
      })
  }, [])

  const handleNameChange = (event) => {
    setNewName(event.target.value);
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const handleFilterChange = (event) => {
    setFilter(event.target.value);
    const findPersons = persons.filter(person => person.name.includes(event.target.value))
    setFilteredPersons(findPersons)
  }

  const addPerson = (event) => {
    event.preventDefault();

    const personObject = {
      name: newName,
      number: newNumber
    }

    if (persons.some(person => person.name === personObject.name)) {
      alert(`${personObject.name} is already added to phonebook`)
      setNewName("");
      setNewNumber("");
    } else {
      setPersons(persons.concat(personObject))
      setNewName("");
      setNewNumber("");
    }
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter
        handleFilterChange={handleFilterChange}
        filter={filter} />
      <h2>add a new</h2>
      <PersonForm
        addPerson={addPerson}
        handleNameChange={handleNameChange}
        newName={newName}
        handleNumberChange={handleNumberChange}
        newNumber={newNumber}
      />
      <h2>Numbers</h2>
      <Persons filteredPersons={filteredPersons} />
    </div>
  )

}

export default App