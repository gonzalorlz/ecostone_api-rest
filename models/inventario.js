const { Schema, model } = require('mongoose');

const datosSchema = new Schema({
    codigo: {type: String},
    // stock: {type: String,require:true},
    // descripcion:{type: String,require:true},
    // categoria:{type: String,require:true},
  })
  
  const inventarioSchema = new Schema({
    nombre: { type: String, unique: true,require:true },
    fecha:{type:Date},
    // Array of subdocuments
     arrayDetalle: [datosSchema],
    // // Single subdocument
    // singleDetalle: datosSchema
  })
  
  inventarioSchema.methods.toJSON = function() {
    const { __v, estado, ...data  } = this.toObject();
    return data;
}

  module.exports = model( 'Inventario', inventarioSchema );