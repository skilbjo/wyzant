// Your Mission
//Follow the instructions in the file and make the tests/assertions pass by filling in all sections that say FILL_ME_IN.

// utility for logging
if(!log)
	var log = function(){ 
		console.log([].slice.call(arguments));
};

var FILL_ME_IN;

// predefined variables
var whatIsThis = function(a, b) {
	// console.log(this);
	return [this, a, b].join(',');
};

var inAnObject = {
	name: 'inAnObject',
	test1: whatIsThis,
	anotherObject: {
		name: 'anotherObject',
		test2: whatIsThis
	}
};

var inAFunction = function(a,b) {
	this.name = 'Sally';
	whatIsThis(a, b);
};

inAFunction.prototype.test3 = whatIsThis;

var trickyTricky = {
	name: 'trickyTricky',
	why: 'does this work?',
	what: 'is going on here?'
};

var confusing = {
	name: 'confusing',
	state: 'Alaska',
	city: 'Anchorage'
};

/**
* THE PROBLEMS
*/

console.assert(whatIsThis('hello', 'world') === '[object global],hello,world');
// "this": global object in scope, because called at the global level
// arguemnts: fn() takes two arguments, places them in an array along with a type-casted string of the "this" variable, then casts all to string using the .join() array method

// Cannot call in node.js (no browser), but can call in Chrome runtime
// console.asset(window.whatIsThis('hello', 'world') === '[object Window],hello,world');
// "this": window object in scope, because called at the window level
// arguemnts: fn() takes two arguments, places them in an array along with a type-casted string of the "this" variable, then casts all to string using the .join() array method

console.assert(inAnObject.test1('face', 'book') === '[object Object],face,book');
// "this": context switch from global level to object/local level
// arguemnts: fn() takes two arguments, places them in an array along with a type-casted string of the "this" variable, then casts all to string using the .join() array method

// Throws an error, cannot assert
//console.assert(inAnObject.anotherObject.test1('twitter', 'book') === Error);
// test1 is not defined inside inAnObject.anotherObject; thus throwing an error

console.assert(inAnObject.anotherObject.test2('twitter', 'book') === '[object Object],twitter,book');
// "this": context switch from global level to object/local level
// arguemnts: fn() takes two arguments, places them in an array along with a type-casted string of the "this" variable, then casts all to string using the .join() array method

console.assert(whatIsThis.call() === '[object global],,');
// "this": global object in scope, because called at the global level
// arguemnts: no arguments passed, so empty remaining array

console.assert(whatIsThis.call(trickyTricky) === '[object Object],,');
// "this": context to object/local level
// arguements: not passed in, so empty

console.assert(whatIsThis.call(trickyTricky, 'nice', 'job') === '[object Object],nice,job');
// this: local scope, potentially references trickyTricky scope
// arguments get joined as we expect

console.assert(whatIsThis.call(confusing) === '[object Object],,');
// "this": context to object/local level
// arguements: not passed in, so empty

console.assert(whatIsThis.call(confusing, 'hello') === '[object Object],hello,');
// "this": context to object/local level
// arguements: only one arguement passed in, which is returned as expected

console.assert(whatIsThis.apply(trickyTricky) === '[object Object],,');
// "this": context to object/local level
// arguements: not passed in, so empty

console.assert(whatIsThis.apply(confusing, ['nice', 'job']) === '[object Object],nice,job');
// "this": context to object/local level
// arguements: array of arguments passed in, which is returned as expected

// Throws an error, cannot assert
//console.assert(whatIsThis.apply(confusing, 'nice', 'job') === Error);
// arguments: apply takes an array of arguments; if an array of arguments is not passed, error is thrown

console.assert(inAFunction('what will', 'happen?') === undefined);
// Return value of inAFunction not set to whatIsThis.. even though with whatIsThis gets called, need to set it as a return value for the function to return the expected result

// Below will throw an error
/*
	try{
		console.assert(inAFunction.test3('A', 'B') === Error);
	} catch(e){
		log(e);
	}
*/
// Not sure why test3 doesn't get added to the prototype chain

var newObject = new inAFunction('what will', 'happen?');
console.assert(newObject.name === 'Sally');
// Object inherits the "name" reference with the object constructor

var newObject2 = new inAFunction('what will', 'happen?');
console.assert(newObject2.test3('C', 'D') === '[object Object],C,D');
// Object inherits the test3 prototype chain with the object constructor

console.assert(inAnObject.test1.call(trickyTricky, 'face', 'book') === '[object Object],face,book');
// "this": context to object/local level
// arguements: only one arguement passed in, which is returned as expected

console.assert(inAnObject.anotherObject.test2.apply(confusing, ['foo', 'bar']) === '[object Object],foo,bar');
// "this": context to object/local level
// arguements: array of arguments passed in, which is returned as expected


