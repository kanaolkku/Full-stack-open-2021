import React, { useState } from 'react'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456' },
    { name: 'Ada Lovelace', number: '39-44-5323523' },
    { name: 'Dan Abramov', number: '12-43-234345' },
    { name: 'Mary Poppendieck', number: '39-23-6423122' }
  ])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState("")
  const [filter, setFilter] = useState("");
  const [filteredPersons, setFilteredPersons] = useState(persons);

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

const Persons = ({ filteredPersons }) => {

  return (
    <div>
      <ul>
        {filteredPersons.map(person => <li key={person.name}>{person.name} {person.number}</li>)}
      </ul>
    </div>
  );
}

const PersonForm = ({ addPerson, handleNameChange, handleNumberChange, newNumber, newName }) => {

  return (
    <div>
      <form onSubmit={addPerson}>
        <div>
          name: <input
            onChange={handleNameChange}
            value={newName} />

        </div>
        <div>
          number: <input
            onChange={handleNumberChange}
            value={newNumber} />

        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
    </div>
  );
}

const Filter = ({ handleFilterChange, filter }) => {

  return (
    <div>
      Filtered with:
      <input onChange={handleFilterChange} value={filter} />
    </div>
  );
}

export default App