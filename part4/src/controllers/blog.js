const express = require("express");
const expressRouter = express.Router();
const mongoBlog = "../models/mongo";

expressRouter.get('/', (request, response) => {
  mongoBlog
    .find({}) //Find all blogs, empty means all
    .then(blogs => {
      response.json(blogs)
    })
});

expressRouter.post('/', (request, response) => {
  const blog = new mongoBlog(request.body);

  blog
    .save()
    .then(result => {
      response.status(201).json(result)
    })
});

module.exports = expressRouter;