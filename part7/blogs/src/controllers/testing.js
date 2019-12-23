const router = require("express").Router();
const Blogs = require("../models/mongo");
const Users = require("../models/mongousers");

router.post("/reset", async (request, response) =>{

  await Blogs.deleteMany({});
  await Users.deleteMany({});

  response.status(204).end()
});

module.exports = router;