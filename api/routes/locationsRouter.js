const express = require("express");
const router = express.Router();

const handler = require("../handlers/locationsHandler");

console.log("router");


router.get("/locations", handler.getAll);

module.exports = router;