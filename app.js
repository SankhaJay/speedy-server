const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const connectDB = require('./db/connection');
const response = require("./api/utils/response");
const { MongoClient } = require('mongodb');
//
const Axios = require('axios');
const download = require('image-downloader')
const request = require('request');
const fs = require('fs')
const bodyParser = require('body-parser')
const Schema = mongoose.Schema;
const multer = require('multer');
const imageSchema = require('./api/models/image');
const files = require('./api/models/files');
const NetworkSpeed = require('network-speed');
const testNetworkSpeed = new NetworkSpeed();
//
const app = express();

const URI = "mongodb+srv://sankhaJ:sankha@appledore-nbptw.mongodb.net/test?retryWrites=true&w=majority";    
const Article = require('./api/models/article');
const PORT = process.env.PORT || 3000;
const db = mongoose.connection
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

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

// app.use(multer({ dest: './uploads/',
//     rename: function(image,imageName){
//         return imageName;
//     },
// }));

// SET STORAGE
var storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'uploads')
    },
    filename: function (req, file, cb) {
      cb(null, file.fieldname + '-' + Date.now())
    }
})
var upload = multer({ storage: storage })

// app.post('/upload/photo', function(req,res){
//     var newImage = new imageSchema();
//     newImage.img.data = fs.readFileSync(req.files.userPhoto.path)
//     newImage.img.contentType = 'image/png';
//     newImage.save();
// })
//


app.use("/", routes);

app.set('views',path.join(__dirname,'views'));
app.set('view engine','pug');

app.get('/',async function(req,res){
    //res.send('Hello World');
    
    // var articles = [
    //     {
    //         id:1,
    //         title:'Article One',
    //         author:'Sankha Jayalath',
    //         body:'This is article one'

    //     },
    //     {
    //         id:2,
    //         title:'Article Two',
    //         author:'Shanika Waidyarathne',
    //         body:'This is article two'

    //     },
    //     {
    //         id:3,
    //         title:'Article Three',
    //         author:'Sameera Perera',
    //         body:'This is article three'

    //     }
    // ]
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

app.get('/articles/add',function(req,res){
    res.render('add_article',{
        title: 'Add Articles'
    });
});

  //image down
  async function download1(){
    const url = 'https://unsplash.com/photos/1HZcJjdtc9g/download?force=true';
    const Path = path.resolve(__dirname,'uploads','image.jpg')
    const writer = fs.createWriteStream(Path)

    const response = Axios({
        method: 'GET',
        url: url,
        responseType: 'stream'
    }).then(function(response){
        response.data.pipe(writer)

    return new Promise((resolve, reject) => {
        response.data.on('end', () => {
            resolve()
        })

        response.data.on('error', () => {
            reject(err)
        })
    })
    })
    
  }

async function getNetworkDownloadSpeed() {
    const baseUrl = 'http://eu.httpbin.org/stream-bytes/50000000';
    const fileSizeInBytes = 50000000;
    const speed = await testNetworkSpeed.checkDownloadSpeed(baseUrl, fileSizeInBytes);
    console.log(speed);
}
  
async function getNetworkUploadSpeed() {
    const options = {
      hostname: 'www.google.com',
      port: 80,
      path: '/catchers/544b09b4599c1d0200000289',
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
    };
    const fileSizeInBytes = 2000000
    const speed = await testNetworkSpeed.checkUploadSpeed(options, fileSizeInBytes);
    console.log(speed);
}
  
app.get('/netSpeed',function(req,res){
    
  getNetworkDownloadSpeed();
   
  getNetworkUploadSpeed();
   
  
})

// async function getLocations(){

// }

// app.get('/getLocations', function(req, res){
//     getLocations();
// })


app.listen(PORT,function(){
    console.log('Server started on port 3000')
});
