#!/usr/bin/env node
/* 
module.exports = () => {
  // ...
};
 */

//const mdlinks = require ('./mdlinks.js');

const fs = require('fs');
const processArgv = process.argv[2]

// Leyendo archivo de forma asíncrona
fs.readFile(processArgv, function(err, data) {
    if(err){
        console.log(err);
    }
    console.log(data);
})
//Leyendo archivo desde directorio
/* fs.readdir(processArgv, 'utf-8', function(err, data) {
  if(err){
      console.log(err);
  }
  console.log(data);
}) */
