import React from "react";

const Persons = ({ filteredPersons, deletePerson }) => {

  return (
    <div>
      <ul>
        {filteredPersons.map(person => <li key={person.name}>{person.name} {person.number}
          <button onClick={() => deletePerson(person.id, person.name)}>delete</button>
        </li>)}
      </ul>
    </div>
  );
}

export default Persons