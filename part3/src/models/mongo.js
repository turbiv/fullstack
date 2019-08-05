const mongoose = require('mongoose');

const url = "mongodb+srv://fullstack:df478444@cluster0-vgh1b.mongodb.net/fullstack?retryWrites=true&w=majority";
console.log(url);

mongoose.connect(url, { useNewUrlParser: true })
  .then(result => console.log("Sucesfilly connected to the database"))
  .catch(error => console.log("Could not connect to the database", error.message));

mongoose.set('useFindAndModify', false);

const phoneSchema = new mongoose.Schema({
  name: String,
  number: String,
});

phoneSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v
  }
});

module.exports = mongoose.model('Person', phoneSchema);