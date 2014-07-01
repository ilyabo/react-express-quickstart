'use strict';

var path        = require('path');
var url         = require('url');
var express     = require('express');
var browserify  = require('connect-browserify');
var React       = require('react');
var nodejsx     = require('node-jsx').install();
var App         = require('./client');

var development = process.env.NODE_ENV !== 'production';

function renderApp(req, res) {
  var path = url.parse(req.url).pathname;
  var app = App({path: path});
  res.send('<!doctype html>\n' + React.renderComponentToString(app));
}

var api = express()
  .get('/users/:username', function(req, res) {
    var username = req.params.username;
    res.send({
      username: username
    });
  });

var app = express();

if (development) {
  app.get('/assets/bundle.js',
    browserify('./client', {
      debug: true,
      watch: true
    }));
}

app
  .use('/assets', express.static(path.join(__dirname, 'assets')))
  .use('/api', api)
  .use('/', renderApp)
  .listen(3000, function() {
    console.log('Point your browser at http://localhost:3000');
  });
