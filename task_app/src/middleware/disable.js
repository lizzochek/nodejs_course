"use strict";

//Disabling GET requests
const disableGET = async (req, res, next) => {
  console.log(req.method);
  if (req.method === "GET") {
    res.send("GET requests are disabled");
  } else {
    next();
  }
};

//Service temporary unavailable middleware
const serviceUnavailable = async (req, res, next) => {
  res.status(503).send("Service s temporary unavailable");
};

module.exports = {
  disableGET,
  serviceUnavailable,
};
