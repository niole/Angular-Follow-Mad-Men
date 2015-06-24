'use strict';
var dotenv = require('dotenv');
dotenv.load();

var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

// Database
/*var mongo = require('mongoskin');
var db = mongo.db("mongodb://localhost:27017", {native_parser:true});*/

var streams = require('./app/routes/streams');

var app = express();
var http = require('http').Server(app);

// uncomment after placing your favicon in /public
//app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(logger('dev'));

/* bodyParser */
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'app')));

app.set('views', path.join(__dirname, 'app'));
app.set('view engine', 'ejs');

/* need to tell express how to access bower modules */
app.use('/bower_components', express.static(__dirname + '/bower_components'));

// Make our db accessible to our router
/*app.use(function(req,res,next){
    req.db = db;
    next();
});*/

app.use('/streams', streams);


/// catch 404 and forwarding to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

/// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});

app.get('*', function(req, res) {
      res.sendFile(__dirname + '/app/index.ejs');
});

http.listen(3000, function(){
  console.log('listening on *:3000');
});

module.exports = app;
