var Benchmark = require('benchmark');
var suite = new Benchmark.Suite;
var _ = require('lodash');
var pipe = require('lodash/fp/flow');

var list = [];
for (var i = 0; i<200; i++) {
    list.push(i);
}

var add = function(element){return element + 1;};
var even = function(element) {return element % 2 == 0;};
var evenAdd = function(element){ return element %2 == 0 ? element + 1: element; };


// add tests
suite.add('lodashMap', function() {
    _.map(list, add);
})
.add('native map', function() {
    list.map(add);
}).add('filterInMap', function() {
    list.map(evenAdd);
}).add('filter and map', function() {
    list.filter(even).map(add);
}).add('filter 3 times and map', function() {
    list.filter(even).filter(even).filter(even).map(add);
}).add('lodash pipe', function() {
    pipe(
        input => evenAdd(input)
    )(list);
})
// add listeners
.on('cycle', function(event) {
    console.log("cycle details", String(event.target));
})
.on('complete', function() {
    console.log('Fastest is ' + this.filter('fastest').map('name'));
})
// run async
.run({ 'async': true });