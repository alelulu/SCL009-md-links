#!/usr/bin/env node
const MDLinks = require('./src/mdlinks.js');
const path = require('path');
let userPath = process.argv[2];

if(!path.isAbsolute(userPath)){
  userPath = path.resolve(userPath)
}

if(userPath.includes(".")) {
  MDLinks.readFile(userPath);
}
else {
  MDLinks.readDir(userPath);
};