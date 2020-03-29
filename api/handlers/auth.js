const express = require("express");
const mongoose = require("mongoose");
// const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
//const storage = require("../services/storage");

const data = require("../config/data");

const Logger = require("../utils/logger");
const logger = new Logger();

const response = require("../utils/response");

/* User authentication */

const User = require("../models/user");

/**
 * Return new user token
 * @param {string} email: new user's email
 * @param {string} password: new user's password
 * @return {string} 201: Toke
**/
exports.userReg = async (req, res, next) => {
  User.find({ pass: req.body.password })
    .exec()
    .then(user => {
      if (user.length > 0)
        return response(res, null, 409, "User already registered");

      bcrypt.hash(req.body.password, 10, (err, hash) => {
        if (err) {
          logger.error(err);
          return response(res, null, 500, err);
        } else {
          const user = new User({
            _id: new mongoose.Types.ObjectId(),
            email: req.body.email,
            password: hash,
            first_name: req.body.first_name,
            last_name: req.body.last_name,
            // first_name: "Binara",
            // last_name: "Medawatte",
            role: "user",
            permission_level:1,
            contact_number: req.body.contact_number,
            //contact_number:"0774562389",
            nic:"960204285v",
            avatar_url:"",
            
            // Write image upload
          });

          user
            .save()
            .then(result => {
              logger.info("User created", result);
              const token = jwt.sign(
                {
                  id: result._id,
                  email: result.email,
                  first_name: result.first_name,
                },
                data.JWT_SECRET,
                {
                  //expiresIn: "1h"
                }
              );

              return response(res, token, 201, "User created");
            })
            .catch(error => {
              logger.error(error);
              return response(res, null, 500, error);
            });
        }
      });
    })
    .catch(err => {
      logger.error("kl"+err);
      return response(res, null, 500, err);
    });
};

exports.userLogin = async (req, res, next) => {
  User.find({ email: req.query.email })
    .exec()
    .then(user => {
      if (user.length < 1) return response(res, null, 401, "Auth Failed");
      bcrypt.compare(req.query.password, user[0].password, (err, result) => {
        if (err) {
          logger.error(err);
          return response(res, null, 401, "Auth Failed");
        }

        if (!result) return response(res, null, 401, "Auth Failed");

        logger.info(
          "User",
          user[0].first_name,
          "(permission level",
          user[0].last_name,
          ") authorized"
        );
        const token = jwt.sign(
          {
            id: user[0]._id,
            email: user[0].email,
            first_name: user[0].first_name,
          },
          data.JWT_SECRET,
          {
            //expiresIn: "1h"
          }
        );

        return response(res, {
          token: token
        });
      });
    })
    .catch(err => {
      logger.error(err);
      return response(res, null, 500, err);
    });
};
