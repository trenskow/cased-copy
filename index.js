'use strict';

var async = require('async');

var copyObj = function(obj, casing, callback) {

	var copy = {};

	async.eachSeries(Object.keys(obj), function(key, next) {

		var copyKey = key;
		switch (casing) {
			case 'camel':
				copyKey = copyKey.substr(0, 1).toLowerCase() + key.substr(1);
				break;
			case 'pascal':
				copyKey = copyKey.substr(0, 1).toUpperCase() + key.substr(1);
		}

		copyAny(obj[key], casing, function(val) {
			copy[copyKey] = val;
			next();
		});

	}, function() {
		callback(copy);
	});

};

var copyArr = function(arr, casing, callback) {

	var copy = [];

	async.eachSeries(arr, function(val, next) {
		copyAny(val, casing, function(val) {
			copy.push(val);
			next();
		});
	}, function() {
		callback(copy);
	});

};

var copyAny = function(data, casing, callback) {

	if (typeof casing === 'function' && !callback) {
		callback = casing;
		casing = undefined;
	}

	if (data && data.constructor.name === 'Object') return copyObj(data, casing, callback);
	if (data && data.constructor.name === 'Array') return copyArr(data, casing, callback);

	callback(data);

};

exports = module.exports = copyAny;
