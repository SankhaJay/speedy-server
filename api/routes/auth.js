const express = require("express");
const router = express.Router();
//const multer = require("multer");

// const upload = multer({
//   storage: multer.memoryStorage(),
//   limits: {
//     fileSize: 5 * 1024 * 1024
//   }
// });

const handler = require("../handlers/auth");

router.get("/login", handler.userLogin);
router.post("/register", handler.userReg);

// router.get("/driver/forgetPassword/:nid", handler.forgetPassword);

module.exports = router;
