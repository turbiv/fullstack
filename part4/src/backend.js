const http = require('http');
const express = require('express');
const app = express();
const blogController = "./controllers/blog";
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require("mongoose");


const mongoUrl = "mongodb+srv://fullstack:df478444@cluster0-vgh1b.mongodb.net/test?retryWrites=true&w=majority";
mongoose.connect(mongoUrl, { useNewUrlParser: true});


app.use(cors());
app.use(bodyParser.json());

app.use("/api/blogs", blogController);

const PORT = 3003;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
});