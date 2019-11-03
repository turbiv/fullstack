const errorHandler =  (error, request, response, next) =>{
  console.log(error);
  next(error)
};

const getToken = (request, response, next) =>{
  const authorization = request.get('authorization');
  if (authorization) {
    request.token = authorization.substring(7)
  }
  next()
};


module.exports = {errorHandler, getToken};