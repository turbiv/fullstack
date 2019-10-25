const mongoose = require('mongoose');
const supertest = require('supertest');
const backend = require('../backend');
const mongoBlog = require("../models/mongo");
const blogs = require('./exampleBlogs');

const premadeListOfBlogs = blogs.premadeListOfBlogs;

const api = supertest(backend);

beforeEach(async () =>{
  await mongoBlog.deleteMany({});

  const blogObj = premadeListOfBlogs.map( item => new mongoBlog(item));
  const promises = blogObj.map(item => item.save());
  await Promise.all(promises)

});

test('blogs are returned as json', async () => {
  const blogs = await api.get('/api/blogs');
  expect(blogs.body.length).toBe(6)
});

test('id property in blogs', async () =>{
  const blogs = await api.get('/api/blogs');

  expect(blogs.body[0]._id).toBeDefined()
});

test('add blog', async () =>{
  const newblog = {
    title: 'Testing for react',
    author: 'Test test',
    url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
    likes: 1
  };
  const initialBlogs = await api.get('/api/blogs');
  await api.post('/api/blogs').send(newblog).expect(201);
  const newBlogs = await api.get('/api/blogs');

  expect(newBlogs.body.length).toBe(initialBlogs.body.length + 1)
});

afterAll(() => {
  mongoose.connection.close()
});