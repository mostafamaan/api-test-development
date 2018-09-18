//first we import express
var express = require('express');
//2- making an object of express
var app = express();
//3-we import body parser
var bodyParser = require('body-parser');
//4-we import mangoose
var mangoose = require('mongoose');
//5- importing the model
var Vehicale = require('./app/models/vehicle');

//configure app for bodyParser,
//lets grab data from a body of a post,
//a post request should include the headers,
//first the key should be content type and the content type,
//is application/x-www-form-urlencoded.
//// for parsing application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({exteded: true}));
//the value of the key above is application/json
//so we use the down code to parse it.
//// for parsing application/json
app.use(bodyParser.json());
//for more information about the code above refer to,
//the link https://medium.com/@adamzerner/how-bodyparser-works-247897a93b90
////////////////////////////////////////////////////////////////////////////

//define port for server
//whatever is in the environment variable PORT,or 3000 if there's nothing there.
var port = process.env.PORT || 3000;


// connect to database,
//mongodb uses the port 27017
mangoose.connect('mongodb://localhost:27017/helloapi');

//setup api routes
//Router-level middleware works in the same way as application-level middleware,
//except it is bound to an instance of express.Router().
//link for docs https://expressjs.com/en/guide/using-middleware.html so we use,
//router insted of app.use()
var router = express.Router();
//all our routes should start with an /api
app.use('/api', router);
//middleware
//middleware expliend https://www.youtube.com/watch?v=9HOem0amlyg
//its very useful for validation.can stop the request or log things
//before giving the responce
router.use(function(req,res,next){
console.log('prosses going down');

  //the last thing we do here is call next() to move on to the rest
  next();
});


//test route
router.get('/', function(req, res) {
  res.json({message: 'Welcome to our API!'});
});

//making vehicale route
router.route('/vehicales')

 .post(function(req,res){
   var vehicale = new Vehicale();
  vehicale.make = req.body.make;
  vehicale.model = req.body.model;
  vehicale.color = req.body.color;

  //saving data to mangodb
  vehicale.save(function(err){
    if (err) {
      res.send(err);
    }
    res.json({messege:'vehicale was saved!!'})
  });
})

 .get(function(req,res) {
Vehicale.find(function(err,vehicales){
  if (err) {
    res = send(err);
  }
  res.json(vehicales);
});
});

//fireup server
//print a messege to the consloe
app.listen(port,() => console.log('server is up on port' + port));
