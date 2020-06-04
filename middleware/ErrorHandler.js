module.exports = (err, req, res, next) => {
    //return standard error
    const statusCode = err.status_code || 500;
    res.status(statusCode).json({
       error: {
           status_code : statusCode,
           message : err.message,
           validation: err.validation
       }
      });
}