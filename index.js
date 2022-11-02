const { response } = require("express");
const express = require("express");
const app = express();

app.use(express.json());

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
    res.status(204).end();
  }
});

app.delete("/api/persons/:id", (req, res) => {
  const id = Number(req.params.id);
  persons = persons.filter((person) => person.id !== id);

  res.status(404).end();
});

app.post("/api/persons", (req, res) => {
  let id = Math.floor(Math.random() * 99999);
  console.log(req.headers);
  const person = req.body;
  if (
    !persons
      .map((person) => {
        console.log(person.name);
        person.name;
      })
      .includes(person.content.name)
  ) {
    person.content.id = id;
    console.log(person.content.name);
    console.log(person.content);
    persons = [...persons, person.content];
  } else {
    console.log("asd");
  }
});

const PORT = 3001;
app.listen(PORT);
console.log(`Server running on port ${PORT}`);
