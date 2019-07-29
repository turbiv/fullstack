const express = require('express');
const app = express();
const morgan = require('morgan');
const bodyParser = require('body-parser');
const cors = require('cors');

app.use(cors());
app.use(morgan('tiny'));
app.use(bodyParser.json());

morgan.token('type', (req, res) =>{
  console.log(req.headers);
  console.log(res);
  return req.headers['content-type']});

let persons = [
  {
    "name": "Arto Hellas",
    "number": "040-5801516",
    "id": 1
  },
  {
    "name": "Ada Lovelace",
    "number": "39-44-5323523",
    "id": 2
  },
  {
    "name": "Dan Abramov",
    "number": "12-43-234345",
    "id": 3
  },
  {
    "name": "Mary Poppendieck",
    "number": "39-23-6423122",
    "id": 4
  }
];

app.get('/api/persons/:id', (request, response) => {
  const id = Number(request.params.id);
  const person = persons.find(note => note.id === id);
  if(person){
    response.json(person)
  }else{
    response.status(404).end()
  }

});

app.get('/api/persons', (request, response) => {
  response.json(persons)
});

app.get('/info', (request, response) => {
  response.send(`<p>Phonebook has info for ${persons.length} people</p>`);
  response.end()
});

app.delete('/api/persons/:id', (req, response) =>{
  const id = Number(req.params.id);
  persons = persons.filter(person => person.id !== id);

  response.status(204).end()
});

app.post('/api/persons', (req, response) =>{
  const bodycontent = req.body;

  if(!bodycontent.name || !bodycontent.number){
    return response.status(400).json({error: "Name or number is missing"})
  }

  const findSameName = persons.find(person => person.name === bodycontent.name);
  if(findSameName){
    return response.status(400).json({error: "Name must be unique"})
  }

  const newPerson = {
    "name": bodycontent.name,
    "number": bodycontent.number,
    "id": Math.floor((Math.random() * 500) + 1)
  };

  persons = persons.concat(newPerson);

  response.json(newPerson)

});


const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
});