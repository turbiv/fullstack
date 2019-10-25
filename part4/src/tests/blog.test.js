const listHelper = require('../utils/list_helper');
const blogs = require('./exampleBlogs');

const premadeListOfBlogs = blogs.premadeListOfBlogs;


test('dummy returns one', () => {
  const blogs = [];

  const result = listHelper.dummy(blogs);
  expect(result).toBe(1)
});

describe('total likes', () => {
  const listWithOneBlog = [
    {
      _id: '5a422aa71b54a676234d17f8',
      title: 'Go To Statement Considered Harmful',
      author: 'Edsger W. Dijkstra',
      url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
      likes: 5,
      __v: 0
    }
  ];

  test('when list has only one blog equals the likes of that', () => {
  const result = listHelper.totalLikes(listWithOneBlog);
  expect(result).toBe(5)
})
});

describe('favorite blog', () => {

  test('highest amounts of likes', () => {
  const result = listHelper.favoriteBlog(premadeListOfBlogs);
  expect(result).toEqual(premadeListOfBlogs[2])
})
});

describe('Author that has the most blogs', () => {
  test('what author has the most blogs', () => {
  const result = listHelper.mostBlogs(premadeListOfBlogs);
  expect(result).toEqual({author: 'Robert C. Martin', blogs: 3})
})
});


describe('Author that has the most likes', () => {
  test('what author has the most likes', () => {
  const result = listHelper.mostLikes(premadeListOfBlogs);
  expect(result).toEqual({author: 'Edsger W. Dijkstra', likes: 12})
})
});



