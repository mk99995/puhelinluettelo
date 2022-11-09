const { response } = require("express");
const express = require("express");
const app = express();
const morgan = require("morgan");
const cors = require("cors");
const Person = require("./models/person");

app.use(express.static("build"));

app.use(express.json());
app.use(cors());

morgan.token("body", (req) => {
  return JSON.stringify(req.body);
});

app.use(morgan(":method :url :status :response-time ms :body"));

app.get("/info", (req, res) => {
  res.send(`<p>Phonebook has info for ${persons.length}</p> <p>${Date()}</p>`);
});

app.get("/api/persons", (req, res) => {
  Person.find({}).then((person) => {
    response.json(person);
  });
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

  5;
});

app.post("/api/persons", (req, res) => {
  const person = req.body;
  let bookDoesNotContainName =
    persons.filter((item) => {
      return item.name === person.name;
    }).length === 0;

  let reqHasData =
    person.hasOwnProperty("name") && person.hasOwnProperty("number");

  if (bookDoesNotContainName && reqHasData) {
    person.id = Math.floor(Math.random() * 99999);
    persons = [...persons, person];
    res.json(person);
  } else {
    if (!bookDoesNotContainName && !reqHasData) {
      return res.status(400).json({
        error: "name must be unique and request must to have requisite data",
      });
    } else if (!reqHasData) {
      return res.status(400).json({
        error: "request must to have requisite data",
      });
    } else {
      return res.status(400).json({
        error: "name must be unique",
      });
    }
  }
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
