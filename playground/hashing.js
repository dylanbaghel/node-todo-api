// const { SHA256 } = require('crypto-js');
// const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

// let data = {
//     id: 10
// };

// const token = jwt.sign(data, 'dylan');
// console.log(token);
// const decoded = jwt.verify(token, 'dylan');
// console.log(decoded);



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

// ===================================================================

var password = 'dylan';

// bcrypt.genSalt(10, (err, salt) => {
//     bcrypt.hash(password, salt, (err, hash) => {
//         console.log(hash);
//     });
// });

var hashedPassword = '$2a$10$75pM1EmiRQUDL6I5JKBMZuo2FVRxaxRWF2TKDpBxcqdk5R5zpPpci';

bcrypt.compare('dylanb', hashedPassword).then((res) => {
    console.log(res);
});