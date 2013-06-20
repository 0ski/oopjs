var ok = require('..\\ok').ok;
require('..\\extend');

var destination, source, cloned, theSameOne, extended;

destination = {
	param1: true,
	param2: false,
	nested: {
		param3: true,
		param4: false
	}
};

source = {
	param2: true, //overriding param
	param5: true, //adding new param
	nested: { //extending nested param
		param4: true,
		param6: true
	}
}

cloned = destination.clone();

ok(cloned !== destination, 'Does clone method create new instance');
ok(Object.keys(cloned).length === Object.keys(destination).length, 'Does cloned instance have the same amount of keys as source object');

theSameOne = destination.merge({});
cloned = destination.extend({});

ok(destination === theSameOne, 'Does merge method returns the same reference when passing an empty object');
ok(destination !== cloned, 'Does extend method returns new, cloned instance, when passing an empty object')

extended = destination.extend(source);

ok(extended.param5 && extended.param2 && extended.nested.param4 && extended.nested.param6, 'Does extend method returns the proper object');
ok(!destination.param2 && !destination.nested.param4 && !destination.param5 && !destination.nested.param6, 'Doesn\'t extend method change anything in destination object');

destination.merge(source);

ok(Object.keys(destination).length === Object.keys(extended).length, 'Does merge function merges source in');
ok(destination.param2 && destination.nested.param4 && destination.param5 && destination.nested.param6, 'Does merge function merges source in');