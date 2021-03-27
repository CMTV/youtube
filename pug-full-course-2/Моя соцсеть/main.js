const fs = require('fs');
const pug = require('pug');

const age = require('./age');

let users = [];

fs.readdirSync('users').forEach((filename) =>
{
    let id = filename.replace('.json', '');
    let userData = JSON.parse(fs.readFileSync('users/' + filename, 'utf-8'));

    users.push({...{ id: id}, ...userData});
});

function buildUserList()
{
    let data = {
        base: {
            title: 'Моя Соцсеть',
            pageClass: 'list'
        },
        users: users
    }

    let html = pug.renderFile('layout/index.pug', data);
    fs.writeFileSync('out/index.html', html);
}

function buildUsers()
{
    let compileFunc = pug.compileFile('layout/user.pug');

    users.forEach((userData) =>
    {
        let data = {
            base: {
                title: userData.name,
                pageClass: 'user'
            },
            calcAge: age,
            user: userData
        }

        let html = compileFunc(data);
        fs.writeFileSync('out/' + userData.id + '.html', html);
    });
}

buildUserList();
buildUsers();