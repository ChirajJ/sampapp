var chalk = require('chalk');
var mongoose = require('mongoose');
var express = require('express');

var dbUrl = 'mongodb://localhost/sampapp';

mongoose.connection.once('open', function(){
        console.log(chalk.green('Connection with MongoDB is open '+dbUrl));
});

mongoose.connection.on('error', function(){
        console.log(chalk.red('Error in connection with MongoDB '+dbUrl));
});

mongoose.connection.on('disconnected', function(){
        console.log(chalk.orange('MongoDB disconnected '+dbUrl));
});

mongoose.connect(dbUrl);

console.log('*********MongoDB********');

var Schema = mongoose.Schema;

var userSchema = new Schema(
 {
  name: {type: String, unique: true}, 
  password: String
 }
);

userSchema.methods.cmpPswd = function(pswd, cb){
 console.log('db.js '+pswd+'////'+this.password);
 if(pswd === this.password){
  cb(null, true);
 }
 else{
  cb(null, false);
 }
};

mongoose.model('user', userSchema, 'user');

