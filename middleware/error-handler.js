const errorHandlerMiddleware = (err, req, res, next) => {
  let customError = {
    statusCode: err.statusCode || 500,
    msg: err.message || "Something went wrong, try again later"
  };
  if (err.code && err.code === 11000) {
    customError.statusCode = 400;
    customError.msg = `${Object.keys(err.keyValue)} field has to be unique`;
  }
  if (err.name === "ValidationError") {
    customError.statusCode = 400;
    customError.msg = Object.values(err.errors)
      .map(errDetails => errDetails.message)
      .join(", ");
  }
  if (err.name === "CastError") {
    customError.statusCode = 404;
    customError.msg = `No message found with id: ${err.value}`;
    // cant find what you're looking for
  }

  return res.status(customError.statusCode).json({ msg: customError.msg });
};

export default errorHandlerMiddleware;
