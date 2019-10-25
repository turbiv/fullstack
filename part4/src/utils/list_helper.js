var _ = require('lodash');
var _ = require('lodash/core');
var fp = require('lodash/fp');
var loadsharray = require('lodash/array');
var loadshcollection = require('lodash/collection');
const mongoBlog = require("../models/mongo");

const dummy = (blogs) => {
  return 1
};

const totalLikes = blogs =>{
  return blogs[0].likes
};

const favoriteBlog = blogs => {
  var maxlikes = null;
  var result = null;
  blogs.forEach((item, iter) => {
    if(maxlikes < blogs[iter].likes){
      maxlikes = blogs[iter].likes;
      result = blogs[iter]
  }
  });
  return result
};

const mostBlogs = blogs => {
  var maxblogs = null;
  var result = null;

  const names = blogs.map((item) => item.author);
  const groupedBlogs = loadshcollection.groupBy(blogs, "author");
  names.forEach((name) => {
    if(maxblogs < groupedBlogs[name].length){
      maxblogs = groupedBlogs[name].length;
      result = groupedBlogs[name]
    }
  });

  return {author: result[0].author, blogs: result.length}
};

const mostLikes = blogs =>{
  var maxlikes = null;
  var result = null;
  blogs.forEach((item, iter) => {
    if(maxlikes < blogs[iter].likes){
      maxlikes = blogs[iter].likes;
      result = blogs[iter]
    }
  });

  return {author: result.author, likes: result.likes}
};

const getBlogs = () =>{
  return mongoBlog.find({});
};

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes,
  getBlogs
};