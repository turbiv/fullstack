const errorHandler =  (error, request, response, next) =>{
  console.log(error);
  next(error)
};

module.exports = {errorHandler};