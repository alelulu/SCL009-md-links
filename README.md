# mdLinks

![mdimg](https://upload.wikimedia.org/wikipedia/commons/thumb/4/48/Markdown-mark.svg/250px-Markdown-mark.svg.png)

Markdown is a lightweight markup language that you can use to add formatting elements to plaintext text documents. Created by John Gruber in 2004, Markdown is now one of the world’s most popular markup languages.


These `Markdown` files usually contain _links_ that sometimes are broken or they are no longer valid. 

## How to know if your links are working?

Don't worry! mdLinks is an `easy-to-use` solution. Don't lose your time testing link by link. Just run the package and you will know if they are all working or not.

## How to install

    npm i alelulu-md-links

You can visit the NPM package page [here](https://www.npmjs.com/package/alelulu-md-links)

## How to use it - CLI (Command Line Interface)

The app can be executed in the following way through the terminal:

    md-links path-to-file.md || md-links path-to-directory

You will get this response as an __object__ from the terminal from every link:
- href
- text
- file

Reading file example:

![readingfile](https://github.com/alelulu/SCL009-md-links/blob/master/src/img/path.PNG?raw=true)

Reading directory example:

![readingdir](https://github.com/alelulu/SCL009-md-links/blob/master/src/img/dir.PNG?raw=true)

### You can also add __options__ when reading files or directories to get more information about your links

These options are: 

### __--validate__

  If you add --validate, the terminal will show you more information as an __object__ about the stats of your links by saying ok or fail and showing the status code.

  To read files with .md extension with --validate option:

      md-links yourfile.md --validate

  Example: 
  
  ![validate](https://github.com/alelulu/SCL009-md-links/blob/master/src/img/validate.PNG?raw=true)


### __--stats__

  If you add --stats, the terminal will show you more information as __text__ about the total of links that the file contains and how many of them are unique.

  To read files with .md extension with --stats option:

      md-links yourfile.md --stats

  Example: 
  
  ![stats](https://github.com/alelulu/SCL009-md-links/blob/master/src/img/stats.PNG?raw=true)

### __--validate --stats__

  If you add both, --validate and --stats, the terminal will show you more information as __text__ about the total of links that the file contains, how many of them are unique and it will show the total of broken links.

  To read files with .md extension with --validate and --stats option:

      md-links yourfile.md --validate --stats

  Example: 
  
  ![both](https://github.com/alelulu/SCL009-md-links/blob/master/src/img/validate%20stats.PNG?raw=true)

## Dependencies

- FileHound
- Marked
- Node-Fetch
- Chalk
- Jest

## Development process

### How does it work?

To solve the problem, the logic that is used is shown in this diagram:

![diagram](https://github.com/alelulu/SCL009-md-links/blob/master/src/img/Diagram1.png?raw=true)


To know how the application was made step by step you can visit the Projects in this repository.

[Visit the project planification](https://github.com/alelulu/SCL009-md-links/projects/1)

### Author

Alejandra Silva

![thanks](https://github.com/alelulu/SCL009-md-links/blob/master/src/img/thanks.PNG?raw=true)