// Logic to generate token using bcrypt library.
const crypto = require('crypto');

let randomBytes1 = crypto.randomBytes(64).toString('hex');
let randomBytes2 = crypto.randomBytes(64).toString('hex');
console.log('Random byte 1');
console.log(randomBytes1);
console.log('Random byte 2');
console.log(randomBytes2);
