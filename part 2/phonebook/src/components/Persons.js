import React from "react";

const Persons = ({ filteredPersons }) => {

  return (
    <div>
      <ul>
        {filteredPersons.map(person => <li key={person.name}>{person.name} {person.number}</li>)}
      </ul>
    </div>
  );
}

export default Persons