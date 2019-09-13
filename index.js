const express = require('express');
const logger = require('morgan');
const auth = require('./app/routes/auth') ;
const users = require('./app/routes/users');
const bodyParser = require('body-parser');
const mongoose = require('./config/database');
var jwt = require('jsonwebtoken');
const app = express();

app.set('secretKey', 'nodeRestApi');

// connection to mongodb
mongoose.connection.on('error', console.error.bind(console, 'MongoDB connection error:'));

app.use(logger('dev'));
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json())

app.use('/users', auth);
app.use('/auth/users', validateUser, users);

function validateUser(req, res, next) {
  jwt.verify(req.headers['token'], req.app.get('secretKey'), function(err, decoded) {
    if (err) {
      res.status(403).json({status:"error", message: err.message, data:null});
    }else{
      // add user id to request
      req.body.userId = decoded.id;
      next();
    }
  });
  
}

// handle 404 error
app.use(function(req, res, next) {
	let err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// handle errors
app.use(function(err, req, res, next) {
	console.log(err);
	
  if(err.status === 404)
  	res.status(404).json({message: "Not found"});
  else	
    res.status(500).json({message: "Something looks wrong :( !!!"});

});

app.listen(3000, function(){
	console.log('Node server listening on port 3000');
});
