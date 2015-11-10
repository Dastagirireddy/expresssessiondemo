/**
* Created on 11/06/2015 by DastagiriReddy
*/ 

describe('Sample demo for jasmine matcher methods', function(){

	it('toBe matcher', function(){

		expect(100).toBe(100); // Equates integer and boolean values
	});

	it('toEqual matcher', function(){

		expect('jasmine tutorial').toBe('jasmine tutorial'); // Equates string values
	});

	it('toBeNull matcher', function(){

		var mockVar = null;

		expect(mockVar).toBeNull(); // Equates null values
	});	

	it('toBeDefined matcher', function(){

		var mockVar = 'mock';

		expect(mockVar).toBeDefined(); // Verifies that variable is initialized or not
	});

	it('toBeUndefined matcher', function(){

		var mockVar;

		expect(mockVar).toBeUndefined(); // Verifies that variable is initialized or not
	});

	describe('Boolean Casting', function(){

		it('toBeFalsy matcher', function(){

			expect(false).toBeFalsy(); // Equates false values
		});

		it('toBeTruthy matcher', function(){

			expect(true).toBeTruthy(); // Equates true values
		});
	});

	it('Regular expression toMatch matcher', function(){

		expect("foo bar").toMatch(/bar/); // Equates text agaist with regular expressions
	});

	it('toContain matcher', function(){

		expect([1, 2, 3]).toContain(1); // Equates element is avaiable or not 
	});	

	it('toBeCloseTo matcher', function(){

		// Setting the second argument to 0 effectively rounds the numbers to integers
		expect(12.3456789).toBeCloseTo(12, 0);  

		// Setting the second argument to 1 effectively rounds the numbers to float points
		expect(12.3456789).toBeCloseTo(12.3, 1);  
	});

	it('toThrow matcher', function(){


		var fn = function(x) {

		    if(x === 2) {

		        throw new Error('user other than 2');
		    }
		};

		expect(fn.bind(null, 2)).toThrow(); // Eqautes error handler
	});
});