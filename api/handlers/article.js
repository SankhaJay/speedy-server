const mongoose = require("mongoose");

const Article = require("../models/article");

const response = require("../utils/response");
const Logger = require("../utils/logger");
const logger = new Logger();

exports.getAll = async (req, res) => {
    Fine.find()
      .exec()
      .then(articles => {
        response(res, articles);
      })
      .catch(err => response(res, null, 500, err));
  };