const express = require("express");
const app = express();

let persons = [
  {
    name: "bcvjdgfgdfdgdg",
    number: "353533335",
    id: 1,
  },
  {
    name: "jioooooooojjjjj",
    number: "5435334",
    id: 2,
  },
  {
    name: "g",
    number: "5435334",
    id: 3,
  },
];

app.get("/info", (req, res) => {
  res.send(`<p>Phonebook has info for ${persons.length}</p> <p>${Date()}</p>`);
});

app.get("/api/persons", (req, res) => {
  res.json(persons);
});

app.get("/api/persons/:id", (req, res) => {
  const id = Number(req.params.id);
  const person = persons.find((person) => person.id === id);
  if (person) {
    res.json(person);
  } else {
    res.status(404).end();
  }
});

const PORT = 3001;
app.listen(PORT);
console.log(`Server running on port ${PORT}`);
