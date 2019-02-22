var 
    expect = require('chai').expect,
    sinon = require('sinon'),
    lodown = require('../index'),
    customers = require('./fixtures/customers.json');

describe('lodown', function() {
    describe('each', function() {
        it('should iterate an Array, applying action to each element, index of the element, and the collection', function() {
            var action = sinon.spy();
            lodown.each(customers, action);
            expect(action.callCount).to.equal(customers.length);
            customers.forEach(function(customer, index){
               expect(action.calledWith(customer, index, customers)).to.be.true;
            });
        });
   
        it('should iterate an Object, applying action for each value, key of value, and Object', function() {
            var action = sinon.spy();
            var customer = customers[0];
            lodown.each(customer, action);
            expect(action.callCount).to.equal(Object.keys(customer).length);
            for(var key in customer) {
              expect(action.calledWith(customer[key], key, customer)).to.be.true;
            }
        });
    });
    describe('map', () => {
        it('should iterate an array, and return a new array of values modified by application of an action', () => {
            var transform = sinon.spy();
            lodown.map(customers, transform);
            var map = lodown.map(customers, (value, index) =>  value.name + '!' );
            var transformed = [];
            expect(transform.callCount).to.equal(customers.length);
            expect(Array.isArray(map)).to.be.true;
            customers.forEach((customer, index) => {
                expect(transform.calledWith(customer, index, customers)).to.be.true;
                transformed.push(customer.name + '!');
            });
            expect(map).to.deep.equal(transformed);
        });
        it('should iterate an object and return a new array of values modified by a transform action', () => {
            var transform = sinon.spy();
            lodown.map(customers, transform);
            var map = lodown.map(customers[0], (value, key) => value + 5);
            var transformed = [];
            // expect(transform.calledCount).to.equal(Object.keys(customers[0]).length);
            expect(Array.isArray(map)).to.be.true;
            for(var key in customers[0]) {
                transformed.push(customers[0][key] + 5) 
            }
            expect(map).to.deep.equal(transformed);
        })
    });
    // describe('filter');
});