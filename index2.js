var microtime = require('microtime');
var _ = require('lodash');

var list = [];
for (var i = 0; i<200; i++) {
    list.push(i);
}

var add = function(element){return element + 1;};
var even = function(element) {return element % 2 == 0;};
var evenAdd = function(element){ element %2 == 0 ? element + 1: element; };

let l1 = microtime.now();
_.map(list, add);
let l2 = microtime.now();
list.map(add);
let l3 = microtime.now();
list.filter(even).map(add);
let l4 = microtime.now();
list.map(evenAdd);
let l5 = microtime.now();
list.filter(even).filter(even).filter(even).map(add);
let l6 = microtime.now();

console.log("Time for lodash map: ", (l2 - l1));
console.log("Time for navive map: ", (l3 - l2));
console.log("Time for filer and map: ", (l4 - l3));
console.log("Time for togehter filter 3 and map ", (l6 - l5));
console.log("Time for togehter filterMap ", (l5 - l4));
