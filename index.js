#!/usr/bin/env node
const MDLinks = require('./src/mdlinks.js');
const path = require('path');
let userPath = process.argv[2];

if(!path.isAbsolute(userPath)){
  userPath = path.resolve(userPath)
}

if(userPath.includes('.')) {
  if(process.argv[3] == '--validate') {
    MDLinks.readFile(userPath)
      .then(res => {
        MDLinks.validate(res)
          .then(res2 => {
            if(res2) {
              console.log(res2);
            }
            else {
              console.log('No se encontraron links en tu archivo.')
            }
          })
      });
  }
  else if(process.argv[3] == '--stats') {
    MDLinks.readFile(userPath)
      .then(res => {
        MDLinks.stats(res)
      })
  }
  else {
    MDLinks.readFile(userPath)
      .then(res => {
        console.log(res);
      });
  }
}
else {
  MDLinks.readDir(userPath);
};