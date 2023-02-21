const { Schema, model } = require('mongoose');

const ProductoSchema = Schema({
    nombre:{
        type:String,
        required:true,

    },
    descripcion:{
        type:String,
        required:true

    },
    stock:{
        type:String,
        required:true
    }, 
    categoria:{

    },  
     inventario:{
        type: Schema.Types.ObjectId,
                required:true,
                ref:'Inventario'
        },

    // nombre: {
    //     type: String,
    //     required: [true, 'El nombre es obligatorio'],
    //     unique: true
    // },
    // descripcion: {
    //     type: Strin,
    //     default: true,
    //     required: true
    // },
    // usuario: {
    //     type: Schema.Types.ObjectId,
    //     ref: 'Usuario',
    //     required: true
    // },
    // precio: {
    //     type: Number,
    //     default: 0
    // },
    // inventario:{
    //         type:Stryng,
    //         required:true,
    //         ref:'Inventario'
    // },
    // // categoria: {
    // //     type: Schema.Types.ObjectId,
    // //     ref: 'Categoria',
    // //     required: true
    // // },
    // descripcion: { type: String },
    // disponible: { type: Boolean, defult: true },
    // img: { type: String },
});


ProductoSchema.methods.toJSON = function() {
    const { __v, estado, ...data  } = this.toObject();
    return data;
}


module.exports = model( 'Producto', ProductoSchema );
