'use strict';

// YOU KNOW WHAT TO DO //

/**
 * each: Designed to loop over a collection, Array or Object, and applies the 
 * action Function to each value in the collection.
 * 
 * @param {Array or Object} collection: The collection over which to iterate.
 * @param {Function} action: The Function to be applied to each value in the 
 * collection
 */
function each(collection, action) {
    if(Array.isArray(collection)) {
        for(var i = 0; i < collection.length; i++) {
            action(collection[i], i, collection);
        }
    } else {
        for (var key in collection) {
            action(collection[key], key, collection);
        }
    }
}
module.exports.each = each;

/**
 * map: iterates over a collection (Array or Object) and applies a transform function which modifies
 * each value in the collection. returns a new array of modified values
 * 
 * @Param {Array or Object}: collection to loop over
 * @Param {Anonymous Function}: function that transforms each value when called
 * 
 */
function map(collection, transform) {
    //create new output array to store transformed values
    var transformed = [];
    // implement each to iterate over the collection
    each(collection, (value, index, collection) => {
        // call transform callback function on the value, index, and collection
        //push results of transform function call to new output array
        transformed.push(transform(value, index, collection));
    });
    //return array of transformed values
    return transformed;
}

module.exports.map = map;

/**
 * pluck: iterates over an array of objects and returns a new array of values from objects where input
 * property exists
 * 
 * @Param {Array}: array to loop through and access objects
 * @Param {property}: string referencing target property being searched for in objects
 */
function pluck(array, property) {
    //implement map to return new array of values found at input property in objects
    return map(array, (object, index, array) => {
        //if object has input property as a key
        if(object.hasOwnProperty(property)) {
            //return values at that key in new array
            return object[property];
        }
    });
}
module.exports.pluck = pluck;

/**
 * unique: iterates over an array and returns a new array without duplicate values.
 * 
 * @Param {Array}: array to loop over to compare for duplicate values
 */
function unique(array) {
    //create new output array. will have no duplicate values
    var dupeFree = [];
    //implement each to loop over array
    each(array, (value, index, array) => {
        //check if value is in output array using indexOf
        if(indexOf(array, value) === -1) {
            //push value to output array if value was not found in output array intially
            dupeFree.push(value);
        }
    })
    //return duplicate free output array
    return dupeFree;
}
module.exports.unique = unique;

/**
 * filter: iterates over a collection (Array or Object) and returns new array of truthy values if test
 * function call on value, index, and collection is truthy. 
 * 
 * @Param {Array or Object}: collection to loop over
 * @Param {Anonymous function}: function to test values
 * 
 */
function filter(collection, test) {
    //create array output to store truthy values
    var passed = [];
    //use each to iterate collection
    each(collection, (value, index, collection) => {
        //create conditional statement to test for truthy values on test function call
        //if test call on value, index, and collection evaluates as true
        if(test(value, index, collection)) {
            //push values to new array
            passed.push(value);
        }
    });
    //return new array of truthy values
    return passed;
}
module.exports.filter = filter;


/**
 * indexOf: iterates over an array and returns a number representing an index value at which input value was
 * FIRST found. if no value is found in the array, -1 is returned.
 * 
 * @Param {Array}: array to loop over
 * @Param {value}: value being searched for in array. if value is found, it's index position will be returned
 */

function indexOf(array, value) {
    //create index container
    var index = -1;
    //create index list container
    var indexStorage = [];
    //iterate over array implementing each
    each(array, (val, i, array) => {
        //if value in array matches input value
        if(val === value) {
            //push the index to storage array
            indexStorage.push(i);
            //reassign output index to index position where target value was FIRST found
            index = indexStorage[0];
        }
    });
    //return output index
    return index;
}
module.exports.indexOf = indexOf;

/**
 * contains: iterates over an array and returns a boolean value based on if a value
 * was found in the array. if the value was found in the array, true is return. False otherwise
 * 
 * @Param {Array}: array to loop through and search for value
 * @Param {target}: target value being searched for
 * 
 */
function contains(array, target) {
    return indexOf(array, target) > -1 ? true : false;
}
module.exports.contains = contains;

/**
 * reject: iterates over collection (Array or Object) and returns a new array of values that are falsey when
 * called with test callback function.
 * 
 * @Param {Array or Object}: collection to loop through
 * @Param {callback function}: function that will determined whether values in collection are truthy or falsey
 */
function reject(collection, test) {
    //implement filter to return new array of falsey values 
    return filter(collection, (value, index, collection) => {
        //if values are falsey when test is called on value, index, and collection
        if(!test(value, index, collection)) {
            // add values to new array being returned
            return value;
        }
    });
}
module.exports.reject = reject;

/**
 * reduce: iterates over a collection (Array or Object) and returns an accumulation
 * of values from callback function call. the values being accumulated are stored in a seed variable.
 * this seed will always be a starting point for accumulation. if no seed is given, seed will be assigned to first
 * value in collection.
 * 
 * @Param {Array or Object}: collection to loop over
 * @Param {Anonymous function}: function to accumlate seed value
 * @Param {seed}: starting point value of accumulation
 */
function reduce(collection, func, seed) {
  //???
  var seedUndefined = arguments.length < 3;
  console.log(seedUndefined, 'what is this?');
  each(collection, function(elem, index, list){
    //if undefined seed
    if(seedUndefined) {
      //???
      seedUndefined = false;
      //reassign seed to first element and continue looping
      seed = elem;
    } else {
      //assign seed to function call an continue looping
      seed = func(seed, elem, index, list);
    }
  });
  //return seed
  return seed;
}

module.exports.reduce = reduce;


/**
 * every: iterates a collection (Array or Object) and returns a boolean value based on truthiness or falsiness
 * of values called by a test function. If all values in test call are truthy, boolean value of true return. 
 * False boolean is return if at least one value in test call fails.
 * 
 * @Param {Array or Object}: collection to loop through
 * @Param {callback function}: function that gets called on value, index, and collection to determine truthiness or falsiness
 */
function every(collection, test) {
    //assign container to default boolean value
    var result = true;
    //iterate over collection with each. callback takes value, index, and collection
    each(collection, (value, index, collection) => {
        //if no test function is provided
        if(test === undefined) {
            //check if value is falsy
            if(!value) {
              //assign result to false if value is falsy
               result = false;
            } else {
                //assign value to true if value is truthy
                result = true;
            }
        //check if provided test call on value, index, and collection evaluates as false
        } else if(!test(value, index, collection)) {
            //assign result to false if calls are falsy values
            result = false;
        }
    });
    //return boolean result;
    return result;
}
module.exports.every = every;
/**
 * some: iterates over collection (Array or Object) and returns boolean value based on the evaluation
 * of a test function call on a value, index, and collection.
 * if at least one value is truthy upon it being called by test function, true is returned. 
 * if all values are falsy when called by test function, false is returned.
 * 
 * @Param {Array or Object}: collection to loop through
 * @Param {callback function}: function that will get called on value, index, and collection to determine truthiness or falsiness
 */
function some(collection, test) {
    //assign default boolean value to container
    var result = false;
    //use each to iterate collection. callback takes value, index, and collection
    each(collection, (value, index, collection) => {
        //if no test callback is given
        if(test === undefined) {
            //check if value is truthy
            if(value) {
                //assign result to true if value is truthy
               result = true; 
            } else {
                //assign result to false if value is falsy
                result = false;
            }
        // if test call on value, index, and collection has a truthy expression
        } else if(test(value, index, collection)) {
            //assign result to true
            result = true;
        }
    });
    //return boolean
    return result;
}
module.exports.some = some;




/**
 * extends: iterates over any number of input objects and returns the first object with key value pairs copied from other input
 * objects.
 * 
 * @Param {Objects}: collections to loop through
 */
function extend(...objs) {
    //iterate over array of objects
    each(objs, (obj, key, objs) => {
        //iterate over objects
        each(obj, (value, key, obj) => {
            //copy key value pairs of objects into FIRST object
            objs[0][key] = value;
        });    
    });
    //return first object 
    return objs[0];
}
module.exports.extend = extend;
