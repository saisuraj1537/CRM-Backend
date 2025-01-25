const errorMiddleware = (err, req, res, next) => {
    const status = err.status || 500;
    res.status(status).json({ message: err.message });
  };
  
  module.exports = errorMiddleware;
  