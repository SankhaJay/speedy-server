const express = require("express");
const router = express.Router();

const authRoutes = require("./auth");

//const fineRoutes = require("./fines");


router.use("/auth", authRoutes);

//router.use("/fines", fineRoutes);

router.get("/", (req, res) => {
  // res.sendFile(`__dirname/../views/index.html`);
  Article.find({},function(err,articlesss){
    if(err){
        console.log(err);
    }
    else{
        res.render('index',{
            title:'Simple se',
            articles:articlesss
        });
    }
    
});
});

module.exports = router;
