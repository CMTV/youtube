const fs = require('fs');
const pug = require('pug');

let html = pug.renderFile('layout.pug');
fs.writeFileSync('index.html', html);