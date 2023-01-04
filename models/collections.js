const { Schema, model } = require('mongoose');

const CollectionSchema = Schema({

});

CollectionSchema.methods.toJSON = function() {
    const { data  } = this.toObject();
    return data;
}


module.exports = model( 'Collection', CollectionSchema );