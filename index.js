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
    MDLinks.readFile(userPath)
      .then(links => {
        MDLinks.validate(links)
          .then(validatedLinks => {
            MDLinks.stats(validatedLinks, true)
          })
      })
  }
  else if(process.argv[3] == '--validate') {
    MDLinks.readFile(userPath)
      .then(links => {
        MDLinks.validate(links)
          .then(validatedLinks => {
            if(validatedLinks) {
              console.log(validatedLinks);
            }
            else {
              console.log('No links were found in your file.');
            }
          });
      });
  }
  else if(process.argv[3] == '--stats') {
    MDLinks.readFile(userPath)
      .then(links => {
        MDLinks.stats(links, false);
      });
  }
  else {
    MDLinks.readFile(userPath)
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
            MDLinks.readFile(file)
              .then(links => {
                MDLinks.validate(links)
                  .then(validatedLinks => {
                    MDLinks.stats(validatedLinks, true);
                  });
              });
          });
        }
        else if(process.argv[3] == '--validate') {
          files.forEach(file => {
            MDLinks.readFile(file)
            .then(links => {
              MDLinks.validate(links)
                .then(validatedLinks => {
                  if(validatedLinks) {
                    console.log(validatedLinks);
                  }
                  else {
                    console.log('No links were found in your file.');
                  }
                });
            });
          });
        }
        else if (process.argv[3] == '--stats') {
          files.forEach(file => {
            MDLinks.readFile(file)
            .then(links => {
              MDLinks.stats(links, false);
            });
          });

        }
        else {
          files.forEach(file => {
            MDLinks.readFile(file)
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