import React, { useState, useEffect } from 'react'
import PersonForm from './components/PersonForm';
import Persons from './components/Persons';
import Filter from './components/Filter';
import personsService from './services/personsService';
import Notification from './components/Notification';

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState("")
  const [filter, setFilter] = useState("");
  const [filteredPersons, setFilteredPersons] = useState(persons);
  const [message, setMessage] = useState({ message: "", type: null })

  useEffect(() => {
    personsService
      .getAll()
      .then(initialPersons => {
        setPersons(initialPersons)
        setFilteredPersons(initialPersons)
      })
  }, [])

  const resetFields = () => {
    setNewName("");
    setNewNumber("");
  }

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

  const resetMessage = () => {
    setTimeout(() => {
      setMessage({ message: "", type: null })
    }, 2000)
  }

  const addPerson = (event) => {
    event.preventDefault();

    if (newNumber === "") {
      setMessage({ message: "Please add a number", type: "error" })
    } else {
      const personObject = {
        name: newName,
        number: newNumber
      }
      if (persons.some(person => person.name === personObject.name)) {
        if (window.confirm(`${personObject.name} is already added to phonebook, replace the old number with a new one?`)) {
          let newArr = persons;
          console.log(newName)
          const objectIndex = newArr.findIndex(object => object.name === newName);
          let newObject = newArr[objectIndex];
          newObject = { ...newObject, number: newNumber };
          newArr[objectIndex] = newObject;

          personsService
            .update(newObject.id, newObject)
            .then(() => {
              setPersons(newArr);
              setFilteredPersons(newArr);
              setMessage({ message: `Number for ${newObject.name} was changed successfully`, type: "success" });
            }
            )
            .catch(err => {
              setMessage({ message: `${newObject.name} does not exist, refresh your page and try again`, type: "error" });
            })
          resetFields();
        } else {
          resetFields();
        }
      } else {
        personsService
          .create(personObject)
          .then(returnedNote => {
            setPersons(persons.concat(returnedNote));
            setFilteredPersons(persons.concat(returnedNote));
            resetFields();
            setFilter("");

            setMessage({ message: `${personObject.name} was added successfully`, type: "success" });
          })
          .catch(err => {
            setMessage({ message: err.response.data.error, type: "error" })
          })
      }
    }
    resetMessage();
  }

  const deletePerson = (id, name) => {
    if (window.confirm(`Delete ${name}?`)) {
      personsService.deletePerson(id);
      const newArr = persons.filter(p => p.id !== id);
      setPersons(newArr);
      setFilteredPersons(newArr);

      setMessage({ message: `${name} was removed successfully`, type: "success" })
      resetMessage();
    }
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification
        message={message.message}
        type={message.type}
      />
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