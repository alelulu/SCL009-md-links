const mdLinks = require('../src/md-links.js');


let linksToTest = [ { href: 'https://www.google.com',
text: 'Google',
file: 'links.md' },
{ href: 'https://www.facebook.com',
text: 'Facebook',
file: 'links.md' },
{ href: 'https://www.nodejs.org',
text: 'Node',
file: 'links.md' } ];

let validatedLinks = [ { href: 'https://www.google.com',
text: 'Google',
file: 'links.md',
status: 200,
statusTxt: 'ok' },
{ href: 'https://www.facebook.com',
text: 'Facebook',
file: 'links.md',
status: 200,
statusTxt: 'ok' },
{ href: 'https://www.nodejs.org',
text: 'Node',
file: 'links.md',
status: 200,
statusTxt: 'ok' } ];

let brokenLinkToTest = [ { href: 'https://www.google.com',
text: 'Google',
file: 'brokenlink.md' },
{ href: 'https://www.facebook.com',
text: 'Facebook',
file: 'brokenlink.md' },
{ href: 'htatp://www.facebodasasdok.com',
text: 'Facebook',
file: 'brokenlink.md' },
{ href: 'https://www.nodejs.org',
text: 'Node',
file: 'brokenlink.md' } ];

let brokenLinkValidated = [ { href: 'https://www.google.com',
text: 'Google',
file: 'brokenlink.md',
status: 200,
statusTxt: 'ok' },
{ href: 'https://www.facebook.com',
text: 'Facebook',
file: 'brokenlink.md',
status: 200,
statusTxt: 'ok' },
{ href: 'htatp://www.facebodasasdok.com',
text: 'Facebook',
file: 'brokenlink.md',
status: null,
statusTxt: 'fail' },
{ href: 'https://www.nodejs.org',
text: 'Node',
file: 'brokenlink.md',
status: 200,
statusTxt: 'ok' } ];


describe('mdLinks', () => {

  it('debería retornar 3 links del archivo links.md', async() => {
    await expect(mdLinks.readFile('links.md')).resolves.toEqual(linksToTest);
  });

  it('debería retornar 3 links del archivo links.md', async() => {
    await expect(mdLinks.mdLinks('links.md', {validate: false})).resolves.toEqual(linksToTest);
  });

  it('debería retornar 3 links del archivo links.md validados', async() => {
    await expect(mdLinks.validateLinks(linksToTest)).resolves.toEqual(validatedLinks);
  });

  it('debería retornar 4 links del archivo brokenlink.md validados, uno roto', async() => {
    await expect(mdLinks.validateLinks(brokenLinkToTest)).resolves.toEqual(brokenLinkValidated);
  });

  it('deberia retornar un objeto con keys total y unique',() => {
    expect(mdLinks.stats(linksToTest, {validate: false})).toStrictEqual({total: 3, unique:3});        
  });

  it('deberia retornar un objeto con keys total: 3, unique: 3 y broken: 0',() => {
    expect(mdLinks.stats(linksToTest, {validate: true})).toStrictEqual({total: 3, unique: 3, broken: 0});        
  });

  it('deberia retornar un objeto con keys total: 4, unique: 4 y broken: 1',() => {
    expect(mdLinks.stats(brokenLinkToTest, {validate: true})).toStrictEqual({total: 4, unique: 4, broken: 1});        
  });

  it('debería retornar un array con tres archivos como strings', async() => {
    await expect(mdLinks.readDir('test')).resolves.toEqual(['test\\brokenlink.md', 'test\\empty.md', 'test\\notunique.md']);
  });
  it('debería retornar un array vacío si no hay archivos con extensión .md', async() => {
    await expect(mdLinks.readDir('empty')).resolves.toEqual([]);
  });

});