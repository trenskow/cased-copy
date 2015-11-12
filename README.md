# cased-copy
Copy JSON objects and transform key casing.

----

[![travis ci](https://travis-ci.org/trenskow/cased-copy.svg?branch=master)](https://travis-ci.org/trenskow/cased-copy)

## Install

    npm install --save cased-copy
    

## Usage

	var copy = require('cased-copy')
	
	copy(obj, casing, callback)     // Async
    var objCopy = copy(obj, casing) // Sync
    
`casing` can have these values

 * `'camel'` (lowercase)
 * `'pascal'` (uppercase)
 * anything else - or absent (preserve case)

> Asynchronous is non-blocking and allows for I/O. Recommended for large objects.

## Example

    var copy = require('cased-copy')
    
	var obj = {
		'ANumber': 123,
		'AnObject': {
			'AString': 'a string'
		},
		'AnArray': [
			{
				'ABoolean': true
			}
		]
	};

	copy(obj, 'camel', function(camelCasedObj) {
		console.log(JSON.stringify(camelCasedObj, null, 4))
	})
    
The above outputs

	{
		"aNumber": 123,
		"anObject": {
			"aString": "a string"
		},
		"anArray": [
			{
				"aBoolean": true
			}
		]	
	}

Take the output object and copy it with `'pascal'` casing, and it comes back out uppercased.

# License

MIT