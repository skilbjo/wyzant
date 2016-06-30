//Your Mission

//Follow the instructions in the file and make the tests/assertions pass by filling in all sections that say FILL_ME_IN.

// utility for logging
if(!log)
var log = function(){ 
	console.log([].slice.call(arguments)) 
};

var FILL_ME_IN;

// predefined variables
var whatIsThis = function(a, b) {
	return [this, a, b].join(',')
}

var inAnObject = {
	name: 'inAnObject',
	test1: whatIsThis,
	anotherObject: {
		name: 'anotherObject',
		test2: whatIsThis
	}
};

var inAFunction = function(a, b) {
	this.name = 'Sally'
	whatIsThis(a, b)
}

inAFunction.prototype.test3 = whatIsThis

var trickyTricky = {
	name: 'trickyTricky',
	why: 'does this work?',
	what: 'is going on here?'
}

var confusing = {
	name: 'confusing',
	state: 'Alaska',
	city: 'Anchorage'
}

/**
* THE PROBLEMS
*/

console.assert(whatIsThis('hello', 'world') === FILL_ME_IN)
// Once you've figured out what the output is, answer here in a comment: Why is this so?

console.assert(window.whatIsThis('hello', 'world') === FILL_ME_IN)
// Once you've figured out what the output is, answer here in a comment: Why is this so?

console.assert(inAnObject.test1('face', 'book') === FILL_ME_IN)
// Once you've figured out what the output is, answer here in a comment: Why is this so?

console.assert(inAnObject.anotherObject.test1('twitter', 'book') === FILL_ME_IN)
// Once you've figured out what the output is, answer here in a comment: Why is this so?

console.assert(inAnObject.anotherObject.test2('twitter', 'book') === FILL_ME_IN)
// Once you've figured out what the output is, answer here in a comment: Why is this so?

console.assert(whatIsThis.call() === FILL_ME_IN)
// Once you've figured out what the output is, answer here in a comment: Why is this so?

console.assert(whatIsThis.call(trickyTricky) === FILL_ME_IN)
// Once you've figured out what the output is, answer here in a comment: Why is this so?

console.assert(whatIsThis.call(trickyTricky, 'nice', 'job') === FILL_ME_IN)
// Once you've figured out what the output is, answer here in a comment: Why is this so?

console.assert(whatIsThis.call(confusing) === FILL_ME_IN)
// Once you've figured out what the output is, answer here in a comment: Why is this so?

console.assert(whatIsThis.call(confusing, 'hello') === FILL_ME_IN)
// Once you've figured out what the output is, answer here in a comment: Why is this so?

console.assert(whatIsThis.apply(trickyTricky) === FILL_ME_IN)
// Once you've figured out what the output is, answer here in a comment: Why is this so?

console.assert(whatIsThis.apply(confusing, ['nice', 'job']) === FILL_ME_IN)
// Once you've figured out what the output is, answer here in a comment: Why is this so?

console.assert(whatIsThis.apply(confusing, 'nice', 'job') === FILL_ME_IN)
// Once you've figured out what the output is, answer here in a comment: Why is this so?

console.assert(inAFunction('what will', 'happen?') === FILL_ME_IN)
// Once you've figured out what the output is, answer here in a comment: Why is this so?

try{
	 console.assert(inAFunction.test3('A', 'B') === FILL_ME_IN)
} catch(e){
	log(e)
}
// Once you've figured out what the output/result is, answer here in a comment: Why is this so?

var newObject = new inAFunction('what will', 'happen?')
console.assert(newObject.name === FILL_ME_IN)
// Once you've figured out what the output is, answer here in a comment: Why is this so?

var newObject2 = new inAFunction('what will', 'happen?')
console.assert(newObject2.test3('C', 'D') === FILL_ME_IN)
// Once you've figured out what the output is, answer here in a comment: Why is this so?

console.assert(inAnObject.test1.call(trickyTricky, 'face', 'book') === FILL_ME_IN)
// Once you've figured out what the output is, answer here in a comment: Why is this so?

console.assert(inAnObject.anotherObject.test2.apply(confusing, ['foo', 'bar']) === FILL_ME_IN)
// Once you've figured out what the output is, answer here in a comment: Why is this so?


