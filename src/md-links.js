const marked = require('marked');
const fs = require('fs');
const fetch = require('node-fetch');
const filehound = require('filehound')

const mdLinks = (path, validate) => {
  return new Promise((resolve, reject) => {
    if(validate && validate.validate){
      readFile(path)
        .then(links => {
          validateLinks(links)
            .then(validatedLinks => {
              resolve(validatedLinks)
            })
        }) 
    }
    else {
      readFile(path)
        .then(links => {
          resolve(links);
        })
    }
  })
}

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
          let pathName = path.split('\\')

          links.push({
            href: href,
            text: text,
            file: pathName[pathName.length-1]
          });
        };
        marked(data, {renderer: renderer});
        resolve(links);
      };
    });
  });
};

//retorna promesa que devuelve un array con los archivos con ext .md
const readDir = (path) => {
    return filehound.create()
      .paths(path)
      .ext('md')
      .find();
};

//Every link (links) is passed like a promise.
//we use promise.all to resolve them.
//We get a array from the links
const validateLinks = (links) => {
  return Promise.all(links.map(link => {
    return new Promise((resolve, reject) => {
      fetch(link.href)
        .then(res => {
          if(res) {
            link.status = res.status;
            link.statusTxt = 'ok';
            resolve(link);
          }
        })
        .catch(err => {
          link.status = null;
          link.statusTxt = 'fail';
          resolve(link);
        });
    });
  }));
};

const stats = (links, validate) => {
  let linkStats = {}
  linkStats.total = links.length;
  let hrefFromLink = links.map(link => {
    return link.href;
  })
  let uniqueLinks = new Set(hrefFromLink);
  linkStats.unique = uniqueLinks.size;
  let count = 0;
  if(validate && validate.validate) {
    
    links.forEach(link => {
      if(link.statusTxt !== 'ok') {
        count++;
      }
    })
    linkStats.broken = count;
  }
  return linkStats;
};

module.exports = {
  readFile,
  readDir,
  validateLinks,
  stats,
  mdLinks
};