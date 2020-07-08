const express = require("express");
const router = express.Router();

const authRoutes = require("./auth");
const testRoutes = require("./tests");

//const fineRoutes = require("./fines");

const locations = require("./locationsRouter")

router.use("/auth", authRoutes);
router.use("/tests", testRoutes);

//router.use("/fines", fineRoutes);

router.use("/locationsRouter", locations);

router.get("/", (req, res) => {
  res.send('homepage');
//   Article.find({},function(err,articlesss){
//     if(err){
//         console.log(err);
//     }
//     else{
//         res.render('index',{
//             title:'Simple se',
//             articles:articlesss
//         });
//     }
    
// });
});

module.exports = router;
