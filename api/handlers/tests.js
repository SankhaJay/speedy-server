const mongoose = require("mongoose");
//const storage = require("../services/storage");
const publicIp = require('public-ip');
const iplocate = require('node-iplocate');

const Test = require("../models/test");
const User = require("../models/user");

const response = require("../utils/response");

const Logger = require("../utils/logger");
const logger = new Logger();


exports.getByUser = async (req, res) => {
    console.log(req.query.email);
    if (req) {
      console.log("here");
      User.findOne({ email: req.query.email })
        .exec()
        .then(user => {
          if (!!user) {
            logger.info(user);
            Test.find({ user_id: user._id })
              .sort({ issued_at: -1 })
              .exec()
              .then(docs => {
                response(res, docs);
              })
              .catch(err => response(res, null, 500, err));
          } else {
            response(res, null, 404, "Invalid user id");
          }
        })
        .catch(err => response(res, null, 500, err));
    } else {
      response(res, null, 404, "No user id found");
    }
  };
 
  exports.checkSpeed = async (req, res) => {
    var isp;
    ip = await publicIp.v4();
    console.log("here"+ ip);
    await iplocate(ip).then((results) => {
      isp = results['org'];
      
      });
      console.log(isp);
    console.log(req.body.speed);
    const user = await User.findOne({email: req.body.email })
      .exec()
      .then(user => user._id)
      .catch(err => {
        return response(res, null, 500, err);
      });

  
    const test = new Test({
      _id: new mongoose.Types.ObjectId(),
      user_id:user,
      speed: req.body.speed,
      location: req.body.location,
      isp:isp
    });
  
    test
      .save()
      .then(fine => {
        logger.info("Test recorded", test);
  
        // sms.sendSMS(
        //   `94719765040`,
        //   "A fine has been issued for this mobile number. Please use the FPAY driver application to pay the fine"
        // );
  
        return response(res, null, 201);
      })
      .catch(err => {
        return response(res, null, 500, err);
      });
  };  