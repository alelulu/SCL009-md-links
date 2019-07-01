const mdLinks = require('../src/mdlinks.js');


describe('mdLinks', () => {

  it('debería retornar 3 links del archivo links.md', async() => {
    await expect(mdLinks.mdLinks('../links.md', false)).resolves.toEqual(
      [ { href: 'https://www.google.com',
    text: 'Google',
    file:
     'C:\\Users\\Ale\\Desktop\\md-links\\SCL009-md-links\\links.md' },
  { href: 'https://www.facebook.com',
    text: 'Facebook',
    file:
     'C:\\Users\\Ale\\Desktop\\md-links\\SCL009-md-links\\links.md' },
  { href: 'https://www.nodejs.org',
    text: 'Node',
    file:
     'C:\\Users\\Ale\\Desktop\\md-links\\SCL009-md-links\\links.md' } ]
    )
  });
});