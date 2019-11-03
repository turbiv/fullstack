const mongo = require('mongoose');
var uniqueValidator = require('mongoose-unique-validator');

const userSchema = mongo.Schema({
  username: {type:String, unique: true,},
  name: String,
  passwordHash: String,
  blogs: [{type: mongo.Schema.Types.ObjectId, ref: 'Blog'}],
});

userSchema.plugin(uniqueValidator);

userSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
    // the passwordHash should not be revealed
    delete returnedObject.passwordHash
  }
});

const User = mongo.model('User', userSchema);

module.exports = User;