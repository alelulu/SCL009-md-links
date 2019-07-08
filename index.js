#!/usr/bin/env node
const MDLinks = require('./src/md-links.js');
const path = require('path');
const chalk = require('chalk');

let userPath = process.argv[2];

if(!path.isAbsolute(userPath)) {
  userPath = path.resolve(userPath);
}

if(userPath.includes('.')) {
  if((process.argv[3] == '--validate' && process.argv[4] == '--stats') 
  || (process.argv[3] == '--stats' && process.argv[4] == '--validate') )  {
    MDLinks.mdLinks(userPath, {validate: true})
      .then(links => {
        let stats = MDLinks.stats(links, {validate: true});
        console.log(chalk.bold.green('Total links:'), stats.total);
        console.log(chalk.bold.blue('Unique links:'), stats.unique);
        console.log(chalk.bold.red('Broken links:'), stats.broken);
      })
  }
  else if(process.argv[3] == '--validate') {
    MDLinks.mdLinks(userPath, {validate: true})
      .then(links => {
        if(links.length > 0) {
          console.log(links);
        }
        else {
          console.log(chalk.bold.red('No links were found in your file.'));
        }
      })
  }
  else if(process.argv[3] == '--stats') {
    MDLinks.mdLinks(userPath, {validate: false})
      .then(links => {
        let stats = MDLinks.stats(links, {validate: false});
        console.log(chalk.bold.green('Total links:'), stats.total);
        console.log(chalk.bold.blue('Unique links:'), stats.unique);
      })
  }
  else {
    MDLinks.mdLinks(userPath, {validate: false})
      .then(links => {
        if(links.length > 0){
          console.log(links);
        }
        else {
          console.log(chalk.bold.red('No links were found in your file.'));
        }
      });
  }
}
else {
  MDLinks.readDir(userPath)
    .then(files => {
      if(files.length > 0) {
        if((process.argv[3] == '--validate' && process.argv[4] == '--stats') 
        || (process.argv[3] == '--stats' && process.argv[4] == '--validate')) {
          files.forEach(file => {
            MDLinks.mdLinks(file, {validate: true})
              .then(links => {
                let stats = MDLinks.stats(links, {validate: true});
                console.log(chalk.bold.green('Total links:'), stats.total);
                console.log(chalk.bold.blue('Unique links:'), stats.unique);
                console.log(chalk.bold.red('Broken links:'), stats.broken);
              })
          });
        }
        else if(process.argv[3] == '--validate') {
          files.forEach(file => {
            MDLinks.mdLinks(file, {validate: true})
              .then(links => {
                if(links) {
                  console.log(links);
                }
                else {
                  console.log(chalk.bold.red('No links were found in your file.'));
                }
              })
          });
        }
        else if (process.argv[3] == '--stats') {
          files.forEach(file => {
            MDLinks.mdLinks(file, {validate: false})
            .then(links => {
              let stats = MDLinks.stats(links, {validate: false});
              console.log(chalk.bold.green('Total links:'), stats.total);
              console.log(chalk.bold.blue('Unique links:'), stats.unique);
            });
          });

        }
        else {
          files.forEach(file => {
            MDLinks.mdLinks(file, {validate: false})
              .then(links => {
                console.log(links);
              });
          });
        }
      }
      else {
        console.log(chalk.bold.red('No files with extension .md were found in the directory'));
      };
    });
};