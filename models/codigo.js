
const { Schema, model } = require('mongoose');


  
  const codigoSchema = new Schema({
    codigoFsl: { type: String,  },
    codigoEcostone:{ type: String,  },

  })
  
  codigoSchema.methods.toJSON = function() {
    const { __v, estado, ...data  } = this.toObject();
    return data;
}

  module.exports = model( 'Codigo', codigoSchema );