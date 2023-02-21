
const { Schema, model } = require('mongoose');

const datosSchema = new Schema({
    codigo: {type: String,require:true},
    stock: {type: String,require:true},
    descripcion:{type: String,require:true},
    categoria:{type: String,require:true},
  })
  
  const addProductoSchema = new Schema({
    name: { type: String, unique: true },
    // Array of subdocuments
    arraydetalle: [datosSchema],
    // Single subdocument
    singleDetalle: datosSchema
  })
  
  addProductoSchema.methods.toJSON = function() {
    const { __v, estado, ...data  } = this.toObject();
    return data;
}

  module.exports = model( 'Producto', addProductoSchema );



