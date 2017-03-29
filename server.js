var express = require('express'),
    app = express(),
    mongoose = require('mongoose'),
    mongo = require('mongodb'),
    assert = require('assert'),
    Javascript = require('./models.js');

url  = 'mongodb://localhost:27017/mean-demo';

addJavascript = function(req, res){
  var javascript = new Javascript(req.body);
  javascript.save(function(err, result){
    res.json(result);
  });
}

app.get('/', function(req, res){
  res.sendFile(__dirname + '/index.html');
});

app.get('/api/javascript', function(req, res){
  var resultArray = [];
  mongo.connect(url, function(err, db){
    assert.equal(null, err);
    var meetups = db.collection('meetups').find();
    meetups.forEach(function(doc, err){
      assert.equal(null, err);
      resultArray.push(doc);
    }, function(){
      db.close();
      res.json(resultArray);
    });
  });
});

app.use('/', express.static(__dirname + '/'));

app.listen(3000, function(){
  console.log('I\'m listening at localhost:3000');
});
