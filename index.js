var express = require("express");  //
var bodyParser = require("body-parser");  // body parameter parser for POST and PUT request body encoading
var url = require('url');   // url parser for GET and DELETE parameter encoading
var fileUpload = require('express-fileupload');   // For POST and PUT multi-part boyd request encoading

var app = express();

// default options
app.use(fileUpload());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var server = app.listen(3000, function () {
  console.log("Listening on port %s...", server.address().port);
});

var startLine  = endLine = "---------------------------------------------------"

// Handle get request type 
app.get("/user", function (req, res) {
  console.log(startLine);

  console.log("New Request GET received");

  // parse url parameters
  var url_parts = url.parse(req.url, true);
  var query = url_parts.query;

  console.log(query);

  if (!req.headers) {
    console.log('No headers added');
  } else {
    console.log('HEADERS are ');
    console.log(req.headers);
  }
  console.log(endLine);

  // return query data
  res.json(query);
});

// Handle post request type
app.post('/user', function (req, res) {
  console.log(startLine);

  console.log("New Request POST received");

  console.log(req.body);

  if (!req.headers) {
    console.log('No headers added');
  } else {
    console.log('HEADERS are ');
    console.log(req.headers);
  }

  if (!req.files) {
    console.log('No files were uploaded.');
  } else {
    console.log(req.files);
  }

  console.log(endLine)

  // return body data
  res.json(req.body);
});


// Handle put request type
app.put('/user', function (req, res) {
  console.log(startLine);

  console.log("New Request PUT received");

  console.log(req.body);

  if (!req.headers) {
    console.log('No headers added');
  } else {
    console.log('\nHEADERS are ');
    console.log(req.headers);
  }

  if (!req.files) {
    console.log('No files were uploaded.');
  } else {
    console.log(req.files);
  }

  console.log(endLine)

  // return body data
  res.json(req.body);
});

// Handle delete request type.
app.delete("/user", function (req, res) {
  console.log(startLine);

  console.log("New Request DELETE received");

  // parse url parameters
  var url_parts = url.parse(req.url, true);
  var query = url_parts.query;

  console.log(query);

  if (!req.headers) {
    console.log('No headers added');
  } else {
    console.log('HEADERS are ');
    console.log(req.headers);
  }
  console.log(endLine)

  // return query data
  res.json(query);
});

// Anonymous request found.
app.use(function(req, res, next){
  res.status(404);

  // respond with json
  if (req.accepts('json')) {
    res.send({ error: '404 not found' , url : req.url });
    return;
  }

  // default to plain-text. send()
  res.type('txt').send('Not found');
});