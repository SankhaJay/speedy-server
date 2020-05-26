const mongoose = require("mongoose");

const tests = require("../models/test");

const response = require("../utils/response");
const Logger = require("../utils/logger");
const logger = new Logger();

console.log("Handler");

exports.getAll = async (req, res) => {            
    tests.aggregate( [
      { 
        $project: {
          "speed": 1, 
          "name": "$location.name",
          "lat": "$location.latitude",
          "lng": "$location.longitude",
          "isp": 1
        } 
      }
    ])
      .then(locations => {
        console.log(locations);        
        response(res, locations);
      })
      .catch(err => response(res, null, 500, err));
  };