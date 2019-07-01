const marked = require('marked');
const fs = require('fs');
const fetch = require('node-fetch');
const filehound = require('filehound')

const mdLinks = (path, validate) => {
  return new Promise((resolve, reject) => {
    if(validate){
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
          links.push({
            href: href,
            text: text,
            file: path
          });
        };
        marked(data, {renderer: renderer});
        resolve(links);
      };
    });
  });
};

const readDir = (path) => {
    return filehound.create()
      .paths(path)
      .ext('md')
      .find();
};

const validateLinks = (links) => {
  return Promise.all(links.map(link => {
    return new Promise((resolve, reject) => {
      fetch(link.href)
        .then(res => {
          if(res) {
            link.status = res.status;
            link.ok = 'ok';
            resolve(link);
          }
        })
        .catch(err => {
          link.status = null;
          link.ok = 'fail';
          resolve(link);
        });
    });
  }));
};

const stats = (links, validate) => {
  console.log('Total links:', links.length);
  let hrefFromLink = links.map(link => {
    return link.href;
  })
  let uniqueLinks = new Set(hrefFromLink);
  console.log('Uniques links:', uniqueLinks.size);
  if(validate) {
    let count = 0;
    links.forEach(link => {
      if(link.ok !== 'ok') {
        count++;
      }
    })
    console.log('Broken links:', count);
  }
};


module.exports = {
  readDir,
  stats,
  mdLinks
};