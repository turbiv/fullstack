
require("dotenv").config();
const express = require('express');
const app = express();
const morgan = require('morgan');
const bodyParser = require('body-parser');
const cors = require('cors');
const Person = require('./models/mongo');

app.use(cors());
app.use(morgan('tiny'));
app.use(bodyParser.json());

morgan.token('type', (req, res) =>{
  console.log(req.headers);
  console.log(res);
  return req.headers['content-type']});

app.get('/api/persons/:id', (request, response) => {
  Person.findById(request.params.id)
    .then(person => {
      if (person) {
        response.json(person.toJSON())
      }else{
        response.status(404).end()
      }
    })
    .catch(error => {
      console.log(error);
      response.status(400).send({error: "malformatted id"})})

});

app.get('/api/persons', (request, response) => {
  Person.find({}).then(people => response.json(people.map(person => person.toJSON())))
});

app.get('/info', (request, response) => {
  Person.find({}).then(people => {
    response.send(`<p>Phonebook has info for ${people.length} people</p>`);
    response.end()
  })
});

app.delete('/api/persons/:id', (req, response , next) =>{
  Person.findByIdAndRemove(req.params.id)
    .then(result => response.status(204).end())
    .catch(error => next(error));
});

app.post('/api/persons', (req, response) =>{
  const bodycontent = req.body;

  if(!bodycontent.name || !bodycontent.number){
    return response.status(400).json({error: "Name or number is missing"})
  }

  const newPerson = new Person({
    "name": bodycontent.name,
    "number": bodycontent.number
  });

  newPerson.save().then(saved => response.json(saved.toJSON()));

});

app.put('/api/persons/:id', (req, response, next) =>{
  const content = req.body;
  console.log(content.number);

  const newperson = {
    number: content.number
  };

  Person.findByIdAndUpdate(req.params.id, newperson, {new: true})
    .then(updated =>{
      response.json(updated.toJSON())
    })
    .catch(error => next(error));
});

const errorHandler = (error, request, response, next) =>{
  console.log(error.message);

  if(error.name === "CastError" && error.kind === 'ObjectId'){
    return response.status(400).send({error: "malformatted id"})
  }

  next(error)
};

app.use(errorHandler);

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
});