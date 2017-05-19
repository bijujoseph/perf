var microtime = require('microtime');
var _ = require('lodash');
var pipe = require('lodash/fp/flow');

var submission = {};
var provider = {};
var benchmarks = {};
var deforster1 = (s, p, b) => { [s,p,b].forEach((x) => x == 1); return [s,p,b]};
var validator1 = (s, p, b) => {return [s,p,b]};

var list1 = [[submission, provider, benchmarks]];
var list2 = [submission, provider, benchmarks];

let l1 = microtime.now();

pipe(
    input => deforster1(...input),
    input => validator1(...input)
)(list2);
let l2 = microtime.now();

list1
    .map(input => deforster1(...input))
    .map(input => validator1(...input));


let l3 = microtime.now();

console.log("Time for pipe: ", (l2 - l1));
console.log("Time map: ", (l3 - l2));
