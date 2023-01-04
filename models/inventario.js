const { Schema, model } = require('mongoose');

const InventarioSchema = Schema({
    nombre:{type:String},
    fecha: {
         type: Date,
    //    // required: [true, 'la fecha es obligatoria'],
    //     //unique: true
     },
    estado: {
        type: Boolean,
        default: true,
       // required: true
    },
    usuario: {
        type: Schema.Types.ObjectId,
        ref: 'Usuario',
   
    }
});


InventarioSchema.methods.toJSON = function() {
    const { __v, estado, ...data  } = this.toObject();
    return data;
}


module.exports = model( 'Inventario', InventarioSchema );
