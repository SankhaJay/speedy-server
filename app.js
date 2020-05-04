const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const connectDB = require('./db/connection');
const response = require("./api/utils/response");
const { MongoClient } = require('mongodb');

const app = express();
const bodyParser = require('body-parser');

const URI = "mongodb+srv://sankhaJ:sankha@appledore-nbptw.mongodb.net/test?retryWrites=true&w=majority";    
const Article = require('./api/models/article');
const PORT = process.env.PORT || 8080;
connectDB();

const routes = require("./api/routes");
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


//mongoose.connect("")

// mongoose
//   .connect(
//     "mongodb+srv://sankhaJ:sankh@appledore-nbptw.mongodb.net/test?retryWrites=true&w=majority",
//     { useNewUrlParser: true, useUnifiedTopology: true }
    
//   )
//   .catch(err => response(res, null, 500, err));

// async function connectDB() {
//     // await mongoose.connect(URI,{ useNewUrlParser: true, useUnifiedTopology: true });
//     // console.log("connected to the cluster");

//     const client = new MongoClient(URI, { useNewUrlParser: true, useUnifiedTopology: true });


//     try {
//         await client.connect();
        
//         await listDatabases(client);

//     } catch (e) {
//         console.error(e);
//     }
// };

// connectDB().catch(console.error);
// var test;
// async function listDatabases(client) {
//     databasesList = await client.db().admin().listDatabases();

//     console.log("Databases:");
//     databasesList.databases.forEach(db => console.log(` - ${db.name}`));
    
// };


app.use("/", routes);
app.set('views',path.join(__dirname,'views'));
app.set('view engine','pug');

// app.get('/',async function(req,res){
//     //res.send('Hello World');
    
//     // var articles = [
//     //     {
//     //         id:1,
//     //         title:'Article One',
//     //         author:'Sankha Jayalath',
//     //         body:'This is article one'

//     //     },
//     //     {
//     //         id:2,
//     //         title:'Article Two',
//     //         author:'Shanika Waidyarathne',
//     //         body:'This is article two'

//     //     },
//     //     {
//     //         id:3,
//     //         title:'Article Three',
//     //         author:'Sameera Perera',
//     //         body:'This is article three'

//     //     }
//     // ]
//     Article.find({},function(err,articlesss){
//         if(err){
//             console.log(err);
//         }
//         else{
//             res.render('index',{
//                 title:'Simple se',
//                 articles:articlesss
//             });
//         }
        
//     });
    
// });

app.get('/articles/add',function(req,res){
    res.render('add_article',{
        title: 'Add Articles'
    });
});

app.listen(PORT,function(){
    console.log('Server started on port 8080')
    console.log("heroku")
});

