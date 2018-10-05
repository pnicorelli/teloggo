const assert = require('assert');
const formatMsg = require('../src/formatMsg');

console.log(`Message formatting`);

let result = formatMsg({
    domain: 'test'
  },
  'This is a test message'
);

console.log(`- It should create a single message with 'test' domain`);
assert.equal(result.length, 1);
assert.equal(result[0].substr(1,4), 'test');

// generate a fake long message
let m = '', _m = ' - fake data really long. ';
for(let i=0;i<=500; i++){
  m = m + i + _m;
}

result = formatMsg({domain: 'stet'}, m);

console.log(`- It should create a single message with 'test' domain`);
assert.equal(result.length, Math.round(m.length / 4000));
assert.equal(result[0].substr(1,4), 'stet');

console.log(`- It should generate string from objects`);
m = new Error('puppatore')
let _message = formatMsg({domain: 'test'}, m);
_message.forEach( (m)=>{
  assert.equal(typeof m, 'string')
});
m = { a: 11, b: 'example'}
_message = formatMsg({domain: 'test'}, m);
_message.forEach( (m)=>{
  assert.equal(typeof m, 'string')
});

console.log(`- It should chunck correctly`);
m = {a: 'xxx', b: 1111};
_message = formatMsg({domain: 'test'}, m);
assert.equal(_message.length, 1);
assert.equal( _message[0].indexOf('*'), 0); //title should start with *
assert.equal( _message[0].indexOf('*', 2), 27); //title should end with *
assert.equal( _message[0].indexOf('```'), 30); //message should start with ```
assert.equal(_message[0].substr(-3), '```');  //message should end with ```
