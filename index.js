var db = require('./model/db.js');
var express = require('express');
var bodyParser = require('body-parser');
var session = require('express-session');
var Redis = require('connect-redis')(session);
var mongoose = require('mongoose');
var User = mongoose.model('user');

var app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

app.use(session({
  secret: "Let it be a secret!",
  resave: true,
  saveUninitialized: true
 })
);

app.get('/', function(req, res){

 res.render('index', {});

});

app.post('/authenticate', function(req, res){

 var name = req.body.name;
 var pswd = req.body.pswd;

 User.findOne({name: name}, function(err, user){
  
  console.log(typeof user);
  console.log(err);

  if(user === null || err){res.redirect('/');}
  else{user.cmpPswd(pswd, function(err, bool){
   console.log(err);
   console.log(bool);
   if(bool){
    req.session.username = name;
    req.session.loginStatus = true;
    res.redirect('/home');
   }
   else{
    res.redirect('/');
   }
  }
 );}
 });
});

app.get('/home', function(req, res){
 
 if(req.session.loginStatus === true)
 {
  res.render('home', {session: req.session});
 }
 else{
  res.redirect('/');
 }

});

var port = process.env.PORT || 3000;
var server = app.listen(port, function(req, res){

 console.log('Server Started at port: '+port);

});
