const fs = require('fs');
const pug = require('pug');

const age = require('./age');

let compileUserFunc = pug.compileFile('layout.pug');

fs.readdirSync('users').forEach((filename) =>
{
    let userData = JSON.parse(fs.readFileSync('users/' + filename, 'utf-8'));

    let moreData = {
        calcAge: age
    };

    let data = {...userData, ...moreData};
    console.log(data);

    let html = compileUserFunc(data);
    fs.writeFileSync('out/' + filename.replace('.json', '.html'), html);
});