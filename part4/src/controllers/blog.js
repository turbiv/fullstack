const express = require("express");
const expressRouter = express.Router();
const mongoBlog = require("../models/mongo");


expressRouter.get('/', async (request, response) => {
  const result = await mongoBlog.find({});   //Find all blogs, empty means all

  response.json(result)
});

expressRouter.post('/', async (request, response) => {
  if((request.body.title === undefined) || (request.body.url === undefined)){
    response.status(400).send({error: "Bad Request"})
  }
  if(request.body.likes === undefined){
    request.body.likes = 0
  }

  const blog = new mongoBlog(request.body);

  const result = await blog.save();

  response.status(201).json(result)
});

expressRouter.delete('/:id', async (request, response) => {
  await mongoBlog.findByIdAndDelete(request.params.id)
    .catch(error => response.status(400).send({error: error.message}));

  response.status(204).end()
});

expressRouter.put('/:id', async (request, response) => {
  const likes = {likes: request.body.likes};


  const updated = await mongoBlog.findByIdAndUpdate(request.params.id, likes, {
    new: true,
    runValidators: true,
    context: "query"
  })
    .catch(error => response.status(400).send({error: error.message}))

  response.status(200).json(updated.toJSON())

});

module.exports = expressRouter;