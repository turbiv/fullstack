const express = require("express");
const expressRouter = express.Router();
const bcrypt = require('bcrypt');
const mongoUsers = require("../models/mongousers");
const jwt = require("jsonwebtoken");

expressRouter.post('/', async (request, response) =>{
  const body = request.body;

  const user = await mongoUsers.findOne({username: body.username});

  const passwordCorrect = user === null ? false : await bcrypt.compare(body.password, user.passwordHash);

  if(!(passwordCorrect || user)){
    return response.status(400).send({error: "invalid username or password"})
  }

  const userForToken = {
    username: user.username,
    id: user._id
  };

  const token = jwt.sign(userForToken, "test");

  response.status(200).send({token, username: user.username, name: user.name})

});


module.exports = expressRouter;