require("babel-register")({
    "presets": [ "env" ]
  });
  
  // server.js can be coded in ES6 -> easier than standard JS
  module.exports = require("./server.js");
  