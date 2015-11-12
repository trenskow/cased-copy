var expect = require('chai').expect,
	copy = require('../index.js');

describe('copy-cased', function() {

	describe('(async)', function() {
		it ('should convert to camel case', function(done) {
			copy({
				'TestNumber': 123,
				'TestObj': {
					'TestString': 'a string'
				},
				'TestArray': [
					{
						'TestBoolean': true
					}
				]
			}, 'camel', function(obj) {
				expect(obj).to.have.property('testNumber').equal(123);
				expect(obj).to.have.property('testObj').be.an('Object');
				expect(obj.testObj).to.have.property('testString').equal('a string'),
				expect(obj).to.have.property('testArray').of.length(1);
				expect(obj.testArray[0]).to.have.property('testBoolean').equal(true);
				done();
			});
		});
		it ('should convert to pascal case', function(done) {
			copy({
				'testNumber': 123,
				'testObj': {
					'testString': 'a string'
				},
				'testArray': [
					{
						'testBoolean': true
					}
				]
			}, 'pascal', function(obj) {
				expect(obj).to.have.property('TestNumber').equal(123);
				expect(obj).to.have.property('TestObj').be.an('Object');
				expect(obj.TestObj).to.have.property('TestString').equal('a string'),
				expect(obj).to.have.property('TestArray').of.length(1);
				expect(obj.TestArray[0]).to.have.property('TestBoolean').equal(true);
				done();
			});
		});
		it ('should preserve case', function(done) {
			copy({
				'tEstNumber': 123,
				'tEstObj': {
					'tEstString': 'a string'
				},
				'tEstArray': [
					{
						'tEstBoolean': true
					}
				]
			}, function(obj) {
				expect(obj).to.have.property('tEstNumber').equal(123);
				expect(obj).to.have.property('tEstObj').be.an('Object');
				expect(obj.tEstObj).to.have.property('tEstString').equal('a string'),
				expect(obj).to.have.property('tEstArray').of.length(1);
				expect(obj.tEstArray[0]).to.have.property('tEstBoolean').equal(true);
				done();
			});
		});
	});

	describe('(sync)', function() {
		it ('should convert to camel case', function() {
			var obj = copy({
				'TestNumber': 123,
				'TestObj': {
					'TestString': 'a string'
				},
				'TestArray': [
					{
						'TestBoolean': true
					}
				]
			}, 'camel');
			expect(obj).to.have.property('testNumber').equal(123);
			expect(obj).to.have.property('testObj').be.an('Object');
			expect(obj.testObj).to.have.property('testString').equal('a string'),
			expect(obj).to.have.property('testArray').of.length(1);
			expect(obj.testArray[0]).to.have.property('testBoolean').equal(true);
		});
		it ('should convert to pascal case', function() {
			var obj = copy({
				'testNumber': 123,
				'testObj': {
					'testString': 'a string'
				},
				'testArray': [
					{
						'testBoolean': true
					}
				]
			}, 'pascal');
			expect(obj).to.have.property('TestNumber').equal(123);
			expect(obj).to.have.property('TestObj').be.an('Object');
			expect(obj.TestObj).to.have.property('TestString').equal('a string'),
			expect(obj).to.have.property('TestArray').of.length(1);
			expect(obj.TestArray[0]).to.have.property('TestBoolean').equal(true);
		});
		it ('should preserve case', function() {
			var obj = copy({
				'tEstNumber': 123,
				'tEstObj': {
					'tEstString': 'a string'
				},
				'tEstArray': [
					{
						'tEstBoolean': true
					}
				]
			});
			expect(obj).to.have.property('tEstNumber').equal(123);
			expect(obj).to.have.property('tEstObj').be.an('Object');
			expect(obj.tEstObj).to.have.property('tEstString').equal('a string'),
			expect(obj).to.have.property('tEstArray').of.length(1);
			expect(obj.tEstArray[0]).to.have.property('tEstBoolean').equal(true);
		});
	});

});
