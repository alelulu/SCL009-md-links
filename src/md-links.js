const marked = require('marked');
const fs = require('fs');
const fetch = require('node-fetch');
const filehound = require('filehound')

//mdLinks is a promise that controls which promise is executed depeding of 
//the parameters that recives.
//It gets a path and an object with key validate
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

//If it finds a file, readFile reads the file. With marked we get the links from it.
//an object is created and it gets pushed to an array with href, text and file as keys.
//It resolves that array of objects.
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

//Filehound returns a promise that resolves an array with all the 
//files with ext .md found in the directory
const readDir = (path) => {
    return filehound.create()
      .paths(path)
      .ext('md')
      .find();
};

//validateLinks returns a promise that resolves an array of objects (links) modified by
//adding the keys status and statusTxt
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

//Stats allows you to know the amount of links' total, unique(, and broken if you add --validate)
//It gets an array of links as objects and object with key: validate
//Returns a new object with 2 or 3 keys (total, unique and/or broken)
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