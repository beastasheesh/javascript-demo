var express = require('express'),
    app = express(),
    mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/javascript-demo');

app.get('/', function(req, res){
  res.sendFile(__dirname + '/index.html');
});

app.use('/', express.static(__dirname + '/'));

app.listen(3000, function(){
  console.log('I\'m listening at localhost:3000');
});
