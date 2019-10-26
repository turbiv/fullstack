const mongoose = require('mongoose');
const supertest = require('supertest');
const backend = require('../backend');
const mongoBlog = require("../models/mongo");
const blogs = require('./exampleBlogs');
const listHelper = require('../utils/list_helper');

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
  await api.post('/api/blogs').send(newblog).expect(200);
  const newBlogs = await api.get('/api/blogs');

  expect(newBlogs.body.length).toBe(initialBlogs.body.length + 1)
});

test('is likes property missing', async () =>{
  const newblog = {
    title: 'Testing for react',
    author: 'Test test',
    url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
  };

  await api.post('/api/blogs').send(newblog).expect(200);

  const blogs = await api.get('/api/blogs');
  expect(blogs.body[6].likes).toBeDefined()
});

test('must have url and title', async () =>{
  const newblog = {
    author: 'Test test'
  };

  await api.post('/api/blogs').send(newblog).expect(400);
});

test("delete blog", async () =>{
  const getBlog = await listHelper.getBlogs();
  await api.delete('/api/blogs/' + getBlog[0]._id).expect(204)
});

test('update likes for blog', async () =>{
  const newLikes =   {
    likes: 10
  };
  const getBlog = await listHelper.getBlogs();
  await api.put('/api/blogs/'  + getBlog[0]._id).send(newLikes).expect(200);
});

afterAll(() => {
  mongoose.connection.close()
});