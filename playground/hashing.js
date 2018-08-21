const { SHA256 } = require('crypto-js');
const jwt = require('jsonwebtoken');

let data = {
    id: 10
};

const token = jwt.sign(data, 'dylan');
console.log(token);
const decoded = jwt.verify(token, 'dylan');
console.log(decoded);



//===========================

// let message = 'This is Abhishek Baghel';
// let hash = SHA256(message).toString();
// console.log(`message: ${message}`);
// console.log(`Hash: ${hash}`);

// let data = {
//     id: 3
// };

// let token = {
//     data,
//     hash: SHA256(JSON.stringify(data) + 'dylan').toString()
// }

// token.data.id = 5;
// token.hash = SHA256(JSON.stringify(token.data)).toString();

// let resultHash = SHA256(JSON.stringify(token.data) + 'dylan').toString();
// if (resultHash === token.hash) {
//     console.log('Data was not changed');
// } else {
//     console.log('Data was changed. Do not trust');
// }