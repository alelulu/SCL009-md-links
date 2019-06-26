const marked = require('marked');
const fs = require('fs');

const readFile = (path) => {
  if(path.slice(-3) == ".md" || path.slice(-3) == ".MD") {
    fs.readFile(path, 'utf-8', function(err, data) {
      if(err) {
          console.log(err);
      }
      let links = [];
      const renderer = new marked.Renderer();
      renderer.link = function(href, title, text) {
        links.push({
          href: href,
          text: text,
          file: path
        });
      };
      marked(data, {renderer: renderer})
      console.log(links);
    });
  }
  else {
    console.log("Debe tener extensión .md")
  }
};

const readDir = (path) => {
  let count = 0;
  fs.readdir(path, 'utf-8', function(err, data) {
    if(err) {
      console.log(err);
    }
    console.log(data.toString());
    //data es un array de strings (nombres de los archivos), 
    //le hago forEach para recorrerlos y les agrego readfile
    data.forEach(ele => {
      if(ele.slice(-3) == ".md" || ele.slice(-3) == ".MD") {
        readFile(path + "\\" + ele);
        count++;
      }
    });
    if(count == 0) {
      console.log("No se encontraron archivos con extensión .md");
    }
  });
};
module.exports = { readFile, readDir }