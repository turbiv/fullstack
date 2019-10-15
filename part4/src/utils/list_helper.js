var _ = require('lodash');
var _ = require('lodash/core');
var fp = require('lodash/fp');
var loadsharray = require('lodash/array');
var loadshcollection = require('lodash/collection');

const dummy = (blogs) => {
  return 1
}

const totalLikes = (blogs) =>{
  return blogs[0].likes
}

const favoriteBlog = (blogs) => {
  var maxlikes = null;
  var result = null;
  blogs.forEach((item, iter) => {
    if(maxlikes < blogs[iter].likes){
      maxlikes = blogs[iter].likes
      result = blogs[iter]
  }
  })
  return result
}

const mostBlogs = (blogs) => {
  const sortedblogs = [];
  var maxblogs = null;
  var result = null;

  const names = blogs.map((item) => item.author)
  const groupedBlogs = loadshcollection.groupBy(blogs, "author")
  names.forEach((item, iter) => {
    if(maxblogs < groupedBlogs[item].length){
      maxblogs = groupedBlogs[item].length
      result = groupedBlogs[item]
    }
  })

  return {author: result[0].author, blogs: result.length}
}

const mostLikes = blogs =>{
  var maxlikes = null;
  var result = null;
  blogs.forEach((item, iter) => {
    if(maxlikes < blogs[iter].likes){
      maxlikes = blogs[iter].likes
      result = blogs[iter]
    }
  })

  return {author: result.author, likes: result.likes}
}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes
}