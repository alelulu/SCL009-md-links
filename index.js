#!/usr/bin/env node
/* 
module.exports = () => {
  // ...
};
 */
//"Importando" Filesystem de node
const fs = require('fs');
//Process no necesita require
const processArgv = process.argv[2];

if(processArgv.includes(".")) {
  //Leyendo archivo de forma asíncrona
  fs.readFile(processArgv, function(err, data) {
    if(err) {
        console.log(err);
    }
    console.log(data.toString());
  });
}
else {
  //Leyendo archivo desde directorio de forma asíncrona
  fs.readdir(processArgv, 'utf-8', function(err, data) {
    if(err) {
      console.log(err);
    }
    console.log(data.toString());
    //data es un array de strings (nombres de los archivos), 
    //le hago forEach para recorrerlos y les agrego readfile
    data.forEach(ele => {
      fs.readFile(processArgv + "\\" + ele, function (err1, data1) {
        if(err1) {
          console.log(err1);
        }
        console.log(data1.toString());
      });
    });
  });
};