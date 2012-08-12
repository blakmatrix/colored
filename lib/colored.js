#!/usr/bin/env node

var     path = require('path'),
    colorize = require(path.resolve(__dirname,'colorize.js')),
     inspect = require('util').inspect;


function Colored(input, output, options) {
  var es          = require('event-stream'),
      colored     = this;
  colored.input   = input;
  colored.output  = output;
  colored.options = options;
  colored.es      = es;

  es.pipeline(
    input,
    es.split(),
    es.map(function (data, callback) {
      var j;
      try {
        j = Colored.prototype.color.apply(colored, [ data]);
      } catch (err) {
        return callback(null, data+'\n');
      }
      callback(null, j);
    }),
    output
    );
  return colored;
}

Colored.prototype.color = function ( data) {
  return colorize(data, this.options);
};

Colored.prototype.on = function ( event, cb) {
  if (event === 'end'){
    this.input.on(event, function(err, res){
      cb(err, res);
    });
  } else {
    this.output.on(event, function(err, res){
      cb(err,res);
    });
  }
  return this;
};


module.exports = function (input, output, options) {
  return new Colored(input, output, options);
};