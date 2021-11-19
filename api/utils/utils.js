/* eslint-disable no-restricted-globals */
const { ERROR_CODE } = require('./constants');

const getDefaultValidationError = ({ details = [] }) => details[0].message;

function errorHandler(err, req, res, next) {
  if (res.headersSent) {
    return next(err);
  }
  res.status(500);
  if (err.type === 'entity.parse.failed') {
    res.json({ code: ERROR_CODE.JSON_PARSE_ERROR, msg: 'JSON parse error' });
  }
  res.json({ error: err });
}


function isArrayNumber(array = []) {
  if (array.length < 1) {
    return false;
  }
  return !array.some(isNaN);
}

module.exports = {
  getDefaultValidationError,
  errorHandler,
  isArrayNumber,
};
