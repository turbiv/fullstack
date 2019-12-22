const mongoose = require('mongoose');

mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);
mongoose.set('useUnifiedTopology', true);

const blogSchema = mongoose.Schema({
  title: String,
  author: String,
  url: String,
  user: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
  likes: Number,
  comments: []
});

module.exports = mongoose.model('Blog', blogSchema);
