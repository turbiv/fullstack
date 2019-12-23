const http = require('http');
const express = require('express');
const app = express();
const blogController = require("./controllers/blog");
const userController = require("./controllers/users");
const loginController = require("./controllers/login");
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require("mongoose");
const middleware = require("./utils/middleware");

const mongoUrl = "mongodb+srv://fullstack:df478444@cluster0-vgh1b.mongodb.net/test?retryWrites=true&w=majority";
mongoose.connect(mongoUrl, { useNewUrlParser: true});

app.use(cors());
app.use(bodyParser.json());

app.use(middleware.getToken);

app.use("/api/blogs", blogController);
app.use("/api/users", userController);
app.use("/api/login", loginController);

if(process.env.NODE_ENV === "test"){
  const testingRouter = require("./controllers/testing");
  app.use("/api/testing", testingRouter)
}

app.use(middleware.errorHandler);

const PORT = 3003;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
});

module.exports = app;