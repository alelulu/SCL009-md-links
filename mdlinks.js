/* module.exports = () => {
    // ...
  }; */
// Módulo FileSystem
const fs = require('fs');

fs.readFile('./prueba.txt', function(err, data) {
    if(err){
        console.log(err);
    }
    console.log(data);
})
//fs.readdir()