var request = require('request')
var express = require("express")
var async = require("async")
var http = require('http')
var endpoints = require('../services')

var app = express()

app.get("/products", function(req, res, next) {

    console.log('requesting products')
    console.log('COOKIE: '+req.get('cookie'))

    var options = {
        uri: endpoints.catalogUrl + '/products',
        method: 'GET',
        json: true,
        headers: {
            'cookie': req.get('cookie')
        }
      };

      request(options, function(error, response, body) {
        if (error) {
          return next(error);
        }

        if (response.statusCode == 200) {
            console.log('getting catalog info')
            console.log(JSON.stringify(body))
            res.writeHead(200)
            res.write(JSON.stringify(body))
            res.end();
        }
        else {
            //console.log("Error with log in: " + req.body.username);
            res.status(response.statusCode);
            res.write(JSON.stringify(response.statusMessage))
            res.end();
        }

    }); // end of request
});

app.get("/catalogliveness", function(req, res, next) {

    console.log('requesting catalog status')

    var options = {
        uri: endpoints.catalogUrl + '/liveness',
        method: 'GET',
        json: true,
        headers: {
            'cookie': req.get('cookie')
        }
    };

      request(options, function(error, response, body) {
        if (error) {
          return next(error);
        }

        if (response.statusCode == 200) {
            console.log('getting catalog status')
            res.writeHead(200)
            res.write(JSON.stringify(body))
            res.end();
        }
        else {
            //console.log("Error with log in: " + req.body.username);
            res.status(response.statusCode);
            res.write(JSON.stringify(response.statusMessage))
            res.end();
        }

    }); // end of request
});


app.get("/products/:id", function(req, res, next) {

    console.log('requesting product details')

    var options = {
        uri:  endpoints.catalogUrl + "/products/" + req.params.id,
        method: 'GET',
        json: true,
        headers: {
            'cookie': req.get('cookie')
        }
    };

      request(options, function(error, response, body) {
        if (error) {
          return next(error);
        }

        if (response.statusCode == 200) {
            console.log('getting product info')
            res.writeHead(200)
            res.write(JSON.stringify(body))
            res.end();
        }

        else {
            //console.log("Error with log in: " + req.body.username);
            res.status(response.statusCode);
            res.write(JSON.stringify(response.statusCode))
            res.end();
        }

    }); // end of request
});

app.get("/static/images/:id", function(req, res, next){


    console.log("retrieving images")

    var url = endpoints.catalogUrl + "/static/images/" + req.params.id
    
    request.get(url)
    .on('error', function(e) { next(e); })
    .pipe(res); // end of request


});

module.exports = app;
