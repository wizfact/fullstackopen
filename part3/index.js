require("dotenv").config();
const { response } = require("express");
const express = require("express");
const morgan = require("morgan");

const app = express();
const Person = require("./models/person");
const cors = require("cors");

app.use(express.json());

app.use(morgan("tiny"));
app.use(cors());
app.use(express.static("build"));

// let persons = [
//   {
//     name: "Arto Hellas",
//     number: "2402812-lol",
//     id: 1,
//   },
//   {
//     name: "Ada Lovelace",
//     number: "39-44-5323523",
//     id: 2,
//   },
//   {
//     name: "Dan Abramov",
//     number: "12-43-234345",
//     id: 3,
//   },
//   {
//     name: "Mary Something",
//     number: "1-221312-12123",
//     id: 4,
//   },
//   {
//     name: "kobe",
//     number: "2402812-1314",
//     id: 5,
//   },
// ];

// const generateID = () => {
//   let maxId =
//     persons.length > 0 ? Math.max(...persons.map((person) => person.id)) : 0;
//   return maxId + 1;
// };

const requestLogger = (request, response, next) => {
  console.log("Method:", request.method);
  console.log("Path:  ", request.path);
  console.log("Body:  ", request.body);
  console.log("---");
  next();
};

app.use(requestLogger);

app.get("/api/persons", (request, response) => {
  Person.find({}).then((result) => {
    response.json(result);
  });
});

app.get("/api/persons/:id", (request, response, next) => {
  // const id = Number(request.params.id);
  // const person = persons.find((person) => person.id === id);
  // if (person) response.json(person);
  // else response.status(404).end();

  Person.findById(request.params.id)
    .then((person) => {
      if (person) response.json(person);
      else response.status(404).end();
    })
    .catch((error) => next(error));
});

app.delete("/api/persons/:id", (request, response) => {
  // const id = Number(request.params.id);
  // persons = persons.filter((person) => person.id !== id);
  Person.findByIdAndRemove(request.params.id).then((result) => {
    response.status(204).end();
  });
});

app.get("/info", (request, response) => {
  response.send(
    `Phonebook has info for ${persons.length} people.<br> <br>${Date()}`
  );
});

app.post("/api/persons", (request, response, next) => {
  const body = request.body;

  if (!body.name) {
    return response.status(400).json({ error: "name missing" });
  }

  if (!body.number) {
    return response.status(400).json({ error: "number missing" });
  }

  // if (Person.exists({ name: body.name })) {
  //   Person.findOneAndUpdate(
  //     { name: body.name },
  //     { number: body.number },
  //     { new: true }
  //   )
  //     .then((updatedPerson) => response.json(updatedPerson))
  //     .catch((error) => next(error));
  // } else {
  const person = new Person({
    name: body.name,
    number: body.number,
  });

  person
    .save()

    .then((savedPerson) => {
      response.json(savedPerson);
    })
    .catch((error) => {
      next(error);
    });
});

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: "unknown endpoint" });
};

app.use(unknownEndpoint);

const errorHandler = (error, request, response, next) => {
  console.error(error.message);

  if (error.name === "CastError") {
    return response.status(400).send({ error: "malformatted id" });
  } else if (error.name === "ValidationError") {
    return response.status(400).json({ error: error.message });
  }

  next(error);
};

app.use(errorHandler);

//   if (persons.some((_person) => _person.id === person.id))
//     return response.status(400).json({ error: "Duplicate ID" });
//   else persons = persons.concat(person);

//   response.json(persons);
// });

const PORT = process.env.PORT;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
