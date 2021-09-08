import React, { useState, useEffect } from 'react'
import axios from 'axios';
import PersonForm from './components/PersonForm';
import Persons from './components/Persons';
import Filter from './components/Filter';
import personsService from './services/personsService';

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState("")
  const [filter, setFilter] = useState("");
  const [filteredPersons, setFilteredPersons] = useState(persons);

  useEffect(() => {
    personsService
      .getAll()
      .then(initialPersons => {
        console.log("promise fulfilled");
        console.log(initialPersons)
        setPersons(initialPersons)
        setFilteredPersons(initialPersons)
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
      personsService
        .create(personObject)
        .then(returnedNote => {
          setPersons(persons.concat(returnedNote));
          setFilteredPersons(persons.concat(returnedNote));
          setNewName("");
          setNewNumber("");
          setFilter("");
        })
    }
  }

  const deletePerson = (id, name) => {
    if (window.confirm(`Delete ${name}?`)) {
      personsService.deletePerson(id);
      const newArr = persons.filter(p => p.id !== id);
      setPersons(newArr);
      setFilteredPersons(newArr);
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
      <Persons filteredPersons={filteredPersons} deletePerson={deletePerson} />
    </div>
  )

}

export default App