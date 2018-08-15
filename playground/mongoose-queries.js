const {mongoose} = require('./../server/db/mongoose');
const {User} = require('./../server/models/user');

const {ObjectID} = require('mongodb');

let id = '5b73fded85a18191089a89c3';

if (!ObjectID.isValid(id)) {
    return console.log('Invalid Id');
}

User.findById(id).then((user) => {
    if(!user) {
        return console.log('User Not Found');
    }
    console.log(user);
}).catch((e) => console.log(e));