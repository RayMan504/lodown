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
    })
    //return array of transformed values
    return transformed;
}

module.exports.map = map;


