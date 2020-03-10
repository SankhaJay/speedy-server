const express = require("express");
const router = express.Router();

const handler = require("../handlers/article");

router.get("/art", handler.getAll);

module.exports = router;