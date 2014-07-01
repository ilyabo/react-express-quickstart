/**
 * @jsx React.DOM
 */
'use strict';


var React       = require('react');
var ReactRouter = require('react-router-component');

var Pages       = ReactRouter.Pages;
var Page        = ReactRouter.Page;
var NotFound    = ReactRouter.NotFound;
var Link        = ReactRouter.Link;

var MainPage = React.createClass({

  render: function() {
    return (
      <div className="MainPage">
        <h1>Hello, world!</h1>
      </div>
    );
  }
});



var NotFoundHandler = React.createClass({
  render: function() {
    return (
      <p>Page not found</p>
    );
  }
});


var App = React.createClass({
  render: function() {
    return (
      <html>
        <head>
          <link rel="stylesheet" href="/assets/style.css" />
          <script src="/assets/bundle.js" />
        </head>
        <Pages className="app" path={this.props.path}>
          <Page path="/" handler={MainPage} />
          <NotFound handler={NotFoundHandler} />
        </Pages>
      </html>
    );
  }
});

module.exports = App;

if (typeof window !== 'undefined') {
  window.onload = function() {
    React.renderComponent(App(), document);
  }
}
