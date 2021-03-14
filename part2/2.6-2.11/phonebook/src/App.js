import React, { useState, useEffect } from "react";
import axios from "axios";
import personService from "./services/persons";

const Notification = ({ message }) => {
  if (message === null) {
    return null;
  }

  return <div className="error">{message}</div>;
};

const Contact = ({ personName, personNumber }) => {
  return (
    <div className="contact-info">
      {personName} {personNumber}
    </div>
  );
};

const PersonForm = ({
  newContact,
  newName,
  handleNewName,
  number,
  handleNewNumber,
}) => (
  <>
    <form onSubmit={newContact}>
      <div>
        name: <input value={newName} onChange={handleNewName} />
      </div>
      <div>
        number: <input value={number} onChange={handleNewNumber} />
      </div>
      <div>
        <button type="submit">add</button>
      </div>
    </form>
  </>
);

const Button = ({ id }) => {
  return (
    <button
      onClick={() =>
        window.confirm("Are you sure you want to delete this contact")
          ? personService.deletePerson(id)
          : null
      }
    >
      Delete
    </button>
  );
};

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [number, setNumber] = useState("");
  const [search, setSearch] = useState("");
  const [_person, set_Person] = useState({});

  useEffect(() => {
    personService.getAll().then((response) => {
      setPersons(response.data);
    });
  }, [persons]);

  const newContact = (event) => {
    event.preventDefault();
    const duplicate = persons.filter((person) => person.name === newName);
    const newPerson = {
      name: newName,
      number: number,
    };
    if (duplicate.length === 0) {
      setPersons(persons.concat(newPerson));
      personService.create(newPerson);
      set_Person(newPerson);
      setNewName("");
      setNumber("");
    } else {
      const _temp = window.confirm(
        `${newName} is already added , Would you like to update it?`
      );
      if (_temp) personService.updatePerson(duplicate[0].id, newPerson);
    }
  };

  const handleNewName = (event) => {
    event.preventDefault();
    setNewName(event.target.value);
  };

  const handleNewNumber = (event) => {
    event.preventDefault();
    setNumber(event.target.value);
  };

  const handleSearch = (event) => {
    event.preventDefault();
    setSearch(event.target.value);
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={`${}`} />
      Filter Shown With <input value={search} onChange={handleSearch} />
      <h2>Add a New Contact</h2>
      <PersonForm
        newContact={newContact}
        newName={newName}
        handleNewName={handleNewName}
        number={number}
        handleNewNumber={handleNewNumber}
      />
      <h2>Numbers</h2>
      <div>
        {persons.map((person) => {
          if (person.name.toLowerCase().includes(search.toLowerCase()))
            return (
              <>
                <Contact
                  personName={person.name}
                  personNumber={person.number}
                />
                <Button id={person.id} />
              </>
            );
        })}
      </div>
    </div>
  );
};

export default App;
