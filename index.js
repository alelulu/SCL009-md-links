#!/usr/bin/env node
const MDLinks = require('./src/mdlinks.js');
const path = require('path');

let userPath = process.argv[2];

if(!path.isAbsolute(userPath)) {
  userPath = path.resolve(userPath);
}

if(userPath.includes('.')) {
  if((process.argv[3] == '--validate' && process.argv[4] == '--stats') 
  || (process.argv[3] == '--stats' && process.argv[4] == '--validate') )  {
    MDLinks.mdLinks(userPath, true)
      .then(links => {
        MDLinks.stats(links, true);
      })
  }
  else if(process.argv[3] == '--validate') {
    MDLinks.mdLinks(userPath, true)
      .then(links => {
        if(links) {
          console.log(links);
        }
        else {
          console.log('No links were found in your file.')
        }
      })
  }
  else if(process.argv[3] == '--stats') {
    MDLinks.mdLinks(userPath, false)
      .then(links => {
        MDLinks.stats(links, false)
      })
  }
  else {
    MDLinks.mdLinks(userPath, false)
      .then(links => {
        console.log(links);
      });
  }
}
else {
  MDLinks.readDir(userPath)
    .then(files => {
      if(files) {
        if((process.argv[3] == '--validate' && process.argv[4] == '--stats') 
        || (process.argv[3] == '--stats' && process.argv[4] == '--validate')) {
          files.forEach(file => {
            MDLinks.mdLinks(file, true)
              .then(links => {
                MDLinks.stats(links, true);
              })
          });
        }
        else if(process.argv[3] == '--validate') {
          files.forEach(file => {
            MDLinks.mdLinks(file, true)
              .then(links => {
                if(links) {
                  console.log(links);
                }
                else {
                  console.log('No links were found in your file.')
                }
              })
          });
        }
        else if (process.argv[3] == '--stats') {
          files.forEach(file => {
            MDLinks.mdLinks(file, false)
            .then(links => {
              MDLinks.stats(links, false);
            });
          });

        }
        else {
          files.forEach(file => {
            MDLinks.mdLinks(file, false)
              .then(links => {
                console.log(links);
              });
          });
        }
      }
      else {
        console.log('No files with extension .md were found in the directory');
      }
    });
};