const http = require('http');
const express = require('express');
const app = express();
const blogController = require("./controllers/blog");
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require("mongoose");
const middleware = require("./utils/middleware");

const mongoUrl = "mongodb+srv://fullstack:df478444@cluster0-vgh1b.mongodb.net/test?retryWrites=true&w=majority";
mongoose.connect(mongoUrl, { useNewUrlParser: true});

app.use(cors());
app.use(bodyParser.json());

app.use("/api/blogs", blogController);

app.use(middleware.errorHandler);

const PORT = 3003;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
});

module.exports = app;