
const { INTERNAL_ERROR_500 } = require('../config/constants');

const middlewares = {
  handleErrors(err, req, res, next) {
    // sendEmail
    console.error(err.stack);
    res.status(error.statusCode || INTERNAL_ERROR_500 ).json({
      success: false, error: error.message, statusCode: error.statusCode || 500
    });
    res.end();
  },
};

module.exports = middlewares;