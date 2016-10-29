let jwt = require('jsonwebtoken');

let token = jwt.sign(
    {taku: 87},
    'e04'
);

console.log(token);

let decoded = jwt.verify(token, 'e04');
console.log(decoded);
