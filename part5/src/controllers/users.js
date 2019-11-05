const express = require("express");
const expressRouter = express.Router();
const mongoUsers = require("../models/mongousers");
const bcrypt = require('bcrypt');

expressRouter.post('/', async (request, response) =>{
  const body = request.body;

  if(!(body.password || body.username)){
    return response.status(400).send({error: "username or password is missing"})
  }

  if(body.password.length < 3 || body.username < 3){
    return response.status(400).send({error: "username or password must be at least 3 characters long"})
  }

  const saltrounds = 10;
  const passwordHash = await bcrypt.hash(body.password, saltrounds);

  const user = new mongoUsers({
    username: body.username,
    name: body.name,
    passwordHash
  });

  const savedUser = await user.save();
  response.json(savedUser)
});

expressRouter.get('/', async (request, response) =>{
  const users = await mongoUsers.find({}).populate("blogs");

  response.json(users.map(user => user))
});

module.exports = expressRouter;