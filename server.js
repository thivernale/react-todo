// create a variable
// require - node keyword to load the module
// 'express' - module name
var express = require('express');
// now we have access to the entire Express API

// create a new app:
// call express library as a function with no args
var app = express();
// get port from environment variable (on Heroku) or specify default one (for local use)
// In ES6 and Node we can use "const" keyword to define constants
const PORT = process.env.PORT || 3000;

// we are redirecting https requests to weather API over http
// a common pattern for express middleware (lets us do something with every request)
app.use(function(req, res, next) {
    // we are going to redirect traffic if it is over HTTPS
    if (req.headers['x-forwarded-proto'] === 'https') {
        // redirect to same URL over HTTP
        res.redirect('http://' + req.hostname + req.url);
    } else {
        // call next function, do nothing
        next();
    }
});

// tell the server which folder to serve
// 'use' adds functionality to an Express app
// specify a folder name that we want to expose to the web server
app.use(express.static('public'));

// start the server:
// specify port and a function that gets called when the server is up
app.listen(PORT, function() {
    console.log('Express server is up on port ' + PORT);
});
