const { Schema, model } = require('mongoose');

const datosSchema = new Schema({
    codigo: {type: String},
    stock: {type: String},
    descripcion:{type: String},
    categoria:{type: String},
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