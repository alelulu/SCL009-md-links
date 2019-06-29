const marked = require('marked');
const fs = require('fs');
const fetch = require('node-fetch');
const fetchUrl = fetch.fetchUrl;

const readFile = (path) => {
  return new Promise((resolve, reject) => {
    let links = [];
    fs.readFile(path, 'utf-8', function(err, data) {
      if(err) {
        reject(err);
      }
      else {
        const renderer = new marked.Renderer();
        renderer.link = function(href, title, text) {
          links.push({
            href: href,
            text: text,
            file: path
          });
        };
        marked(data, {renderer: renderer})
        resolve(links);
      };

    })
  })
}

const readDir = (path) => {
  return new Promise((resolve, reject) => {
    let count = 0;
    let arrayOfLinks = [];
    fs.readdir(path, 'utf-8', function(err, data) {
      if(err) {
        reject(err);
      }
      //data es un array de strings (nombres de los archivos), 
      //le hago forEach para recorrerlos y les agrego readfile
      data.forEach(ele => {
        if(ele.slice(-3) == ".md" || ele.slice(-3) == ".MD") {
          readFile(path + "\\" + ele)
            .then(res => {
              if(res) {
                arrayOfLinks.push(res);
              }
            });
          count++;
        }
        resolve(arrayOfLinks);
      });
      if(count == 0) {
        console.log("No se encontraron archivos con extensión .md");
      }
    });
  })
};

const validate = (links) => {
  return Promise.all(links.map(link => {
    return new Promise((resolve, reject) => {
      fetch(link.href)
        .then(res => {
          if(res) {
            link.status = res.status
            link.ok = 'ok';
            resolve(link);
          }
        })
        .catch(err => {
          link.status = null;
          link.ok = 'fail';
          resolve(link);
        })
    })
  }));
};

const stats = (links) => {
  console.log('Total:', links.length)
  let hrefFromLink = links.map(link => {
    return link.href
  })
  let uniqueLinks = new Set(hrefFromLink)
  console.log('Únicos:', uniqueLinks.size)
}

module.exports = { 
  readFile, 
  readDir,
  validate,
  stats
}