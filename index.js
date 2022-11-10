require("dotenv").config();
const { response } = require("express");
const express = require("express");
const app = express();
const morgan = require("morgan");
const cors = require("cors");
const Person = require("./models/person");

app.use(express.static("build"));

app.use(express.json());
app.use(cors());

const requestLogger = (request, response, next) => {
  console.log("Method:", request.method);
  console.log("Path:  ", request.path);
  console.log("Body:  ", request.body);
  console.log("---");
  next();
};

app.use(requestLogger);

morgan.token("body", (req) => {
  return JSON.stringify(req.body);
});

app.use(morgan(":method :url :status :response-time ms :body"));

app.get("/info", (req, res) => {
  res.send(`<p>Phonebook has info for ${persons.length}</p> <p>${Date()}</p>`);
});

app.get("/api/persons", (req, res) => {
  Person.find({}).then((person) => {
    console.log(person);
    //console.log(res.json(person));
    res.json(person);
  });
});

app.get("/api/persons/:id", (req, res) => {
  Person.findById(req.params.id)
    .then((person) => {
      if (person) {
        res.json(person);
      } else {
        response.status(404).end();
      }
    })
    .catch((error) => {
      next(error);
    });
});

app.delete("/api/persons/:id", (req, res) => {
  Person.findByIdAndRemove(req.params.id)
    .then((result) => {
      res.status(204).end();
    })
    .catch((error) => next(error));
});

app.post("/api/persons", (req, res) => {
  const body = req.body;
  console.log(body.name);
  Person.find({ name: body.name }).then((result) => console.log(result));
  if (body.name === undefined) {
    return res.status(400).json({ error: "content missing" });
  }
  console.log("asd");
  const person = new Person({
    name: body.name,
    number: body.number,
  });

  const unknownEndpoint = (request, response) => {
    response.status(404).send({ error: "unknown endpoint" });
  };
  app.use(unknownEndpoint);

  const errorHandler = (error, request, response, next) => {
    console.error(error.message);

    if (error.name === "CastError") {
      return response.status(400).send({ error: "malformatted id" });
    }

    next(error);
  };

  app.use(errorHandler);

  console.log(person);

  person.save().then((savedPerson) => {
    res.json(savedPerson);
  });
});

// app.post("/api/persons", (req, res) => {
//   const person = req.body;
//   let bookDoesNotContainName =
//     persons.filter((item) => {
//       return item.name === person.name;
//     }).length === 0;

//   let reqHasData =
//     person.hasOwnProperty("name") && person.hasOwnProperty("number");

//   if (bookDoesNotContainName && reqHasData) {
//     person.id = Math.floor(Math.random() * 99999);
//     persons = [...persons, person];
//     res.json(person);
//   } else {
//     if (!bookDoesNotContainName && !reqHasData) {
//       return res.status(400).json({
//         error: "name must be unique and request must to have requisite data",
//       });
//     } else if (!reqHasData) {
//       return res.status(400).json({
//         error: "request must to have requisite data",
//       });
//     } else {
//       return res.status(400).json({
//         error: "name must be unique",
//       });
//     }
//   }
// });

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
