const express = require("express");
const router = express.Router();

const authRoutes = require("./auth");

const fineRoutes = require("./fines");


router.use("/auth", authRoutes);

router.use("/fines", fineRoutes);

router.get("/", (req, res) => {
  res.sendFile(`__dirname/../views/index.html`);
});

module.exports = router;
