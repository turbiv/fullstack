const errorHandler =  (error, request, response, next) =>{
  console.log(error);
  response.status(400).send({error: "Error has occured, please check server console"});
  next(error)
};

const getToken = (request, response, next) =>{
  const authorization = request.get('Authorization');
  if (authorization) {
    request.token = authorization.substring(7)
  }
  next()
};


module.exports = {errorHandler, getToken};