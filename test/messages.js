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
for(let i=0; i<500; i++){
  m = m + i + _m;
}

result = formatMsg({
    domain: 'stet'
  },
  m
);

console.log(`- It should create a single message with 'test' domain`);
assert.equal(result.length, Math.round(m.length / 4000));
assert.equal(result[0].substr(1,4), 'stet');
