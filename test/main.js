const assert = require('assert');
const teloggo = require('../index.js');

console.log(`Main`);
var logger = new teloggo();

console.log(`- .log() should throw and error without token`);
var err = new Error('teloggo needs a token!');
assert.throws( ()=>{logger.log('hello')}, err );

logger = new teloggo({token: 'xxxx'});
console.log(`- .log() should throw and error without chatId`);
err = new Error('teloggo needs a chatId!');
assert.throws( ()=>{logger.log('hello')}, err );
