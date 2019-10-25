const express = require("express");
const expressRouter = express.Router();
const mongoBlog = require("../models/mongo");


expressRouter.get('/', async (request, response) => {
  const result = await mongoBlog.find({});   //Find all blogs, empty means all

  response.json(result)
});

expressRouter.post('/', async (request, response) => {
  const blog = new mongoBlog(request.body);

  const result = await blog.save();

  response.status(201).json(result)
});

module.exports = expressRouter;