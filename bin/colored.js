#!/usr/bin/env node

var    path = require('path'),
    colored = require(path.resolve(__dirname, path.join('..',path.join('lib', 'colored.js')))),
    XRegExp = require('xregexp').XRegExp,
      nconf = require('nconf'),
      token;

 nconf.argv()
      .env()
      .file('words',path.resolve(__dirname, path.join('..',path.join('config', 'words.json'))));

token = (nconf.get('t') && (nconf.get('t') !== true)) ? new RegExp(XRegExp.escape(nconf.get('t')), "g") : false;
process.stdin.resume();
var blah = colored(process.stdin, process.stdout, {token: token,
                                                   words: nconf.stores.words.store});
           //.on('error', function (err) {console.error(err);})
           //.on('end', function () {console.log("DONE");});

