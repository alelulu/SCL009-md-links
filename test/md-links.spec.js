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

  it('deberia retornar un objeto con keys total y unique',() => {
    expect(mdLinks.stats(linksToTest, {validate: false})).toStrictEqual({total: 3, unique:3});        
  });

  it('deberia retornar un objeto con keys total, unique y broken',() => {
    expect(mdLinks.stats(linksToTest, {validate: true})).toStrictEqual({total: 3, unique: 3, broken: 0});        
  });

  it('debería retornar un array con tres archivos como strings', async() => {
    await expect(mdLinks.readDir('test')).resolves.toEqual(['test\\brokenlink.md', 'test\\empty.md', 'test\\notunique.md']);
  });
});