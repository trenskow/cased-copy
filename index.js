'use strict';

var async = require('async');

var transformKey = function(key, casing) {

	switch (casing) {
		case 'camel':
			return key.substr(0, 1).toLowerCase() + key.substr(1);
		case 'pascal':
			return key.substr(0, 1).toUpperCase() + key.substr(1);
	}

	return key;

};

var asyncCopyObj = function(obj, casing, callback) {

	var copy = {};

	async.eachSeries(Object.keys(obj), function(key, next) {

		var copyKey = transformKey(key, casing);
		asyncCopyAny(obj[key], casing, function(val) {
			copy[copyKey] = val;
			async.setImmediate(next);
		});

	}, function() {
		callback(copy);
	});

};

var asyncCopyArr = function(arr, casing, callback) {

	var copy = [];

	async.eachSeries(arr, function(val, next) {
		asyncCopyAny(val, casing, function(val) {
			copy.push(val);
			async.setImmediate(next);
		});
	}, function() {
		callback(copy);
	});

};

var asyncCopyAny = function(data, casing, callback) {

	if (data && data.constructor.name === 'Object') return asyncCopyObj(data, casing, callback);
	if (data && data.constructor.name === 'Array') return asyncCopyArr(data, casing, callback);

	callback(data);

};

var syncCopyObj = function(obj, casing) {

	var copy = {};
	Object.keys(obj).forEach(function(key) {
		copy[transformKey(key, casing)] = syncCopyAny(obj[key], casing);
	});
	return copy;

};

var syncCopyArr = function(arr, casing) {

	var copy = [];
	for (var idx in arr) {
		var item = arr[idx];
		copy.push(syncCopyAny(item, casing));
	}
	return copy;

};

var syncCopyAny = function(data, casing) {

	if (data && data.constructor.name === 'Object') return syncCopyObj(data, casing);
	if (data && data.constructor.name === 'Array') return syncCopyArr(data, casing);

	return data;

};

exports = module.exports = function(data, casing, callback) {

	if (typeof casing === 'function' && !callback) {
		callback = casing;
		casing = undefined;
	}

	if (!callback) return syncCopyAny(data, casing);
	asyncCopyAny(data, casing, callback);

};
