const mongoose = require('mongoose');

if ( process.argv.length<3 ) {
  console.log('give password as argument');
  process.exit(1)
}

const password = process.argv[2];
const name = process.argv[3];
const number = process.argv[4];

const url =
  `mongodb+srv://fullstack:${password}@cluster0-vgh1b.mongodb.net/fullstack?retryWrites=true&w=majority`;

mongoose.connect(url, { useNewUrlParser: true });

const phoneSchema = new mongoose.Schema({
  name: String,
  number: String,
});

const Person = mongoose.model('Person', phoneSchema);

const person = new Person({
  name: name,
  number: number
});

if(!number) {
  Person.find({}).then(result => {
    console.log("Phonebokk");
    result.forEach(note => {
      console.log(note.name + " " + note.number)
    });
    mongoose.connection.close()
  });
  console.log("List")
}

if(number && name) {
  person.save().then(response => {
    mongoose.connection.close()
  });
  console.log("Save")
}