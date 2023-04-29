const statusCodes = require("http-status-codes");

exports.respondSourceNotFound = (req, res) => {
  let errorCode = statusCodes.NOT_FOUND;
  res.status(errorCode);
  res.sendFile(`/public/errors/${errorCode}.html`, { root: "." });
};

exports.respondInternalError = (error, req, res, next) => {
  let errorCode = statusCodes.INTERNAL_SERVER_ERROR;
  console.log(error);
  res.status(errorCode);
  res.sendFile(`/public/errors/${errorCode}.html`, { root: "." });
  //next(error);
};
