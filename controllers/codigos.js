const { response } = require('express');
const {Codigo}  = require('../models');

const obtenerCodigos = async(req, res = response ) => {
    const codigos = await Codigo.find();
    if (codigos){
        res.json({
            //total,
            codigos
        });
    }

}

// const obtenerCodigo = async(req, res = response ) => {
   

//     const { id } = req.params;
//     const codigo = await Codigo.findById( id )
//                             .populate('usuario', 'nombre');

//     res.json( codigo );

// }

// const crearInventario = async(req, res = response ) => {
//     const fecha=new Date()
//     const nombre = req.body.nombre
//     console.log(nombre)
//     const inventarioDB = await Inventario.findOne({ nombre });
//     if ( inventarioDB ) {
//         return res.status(400).json({
//             msg: `el inventario :   ${ inventarioDB.nombre }, ya existe`
//         });
//     }
//     // Generar la data a guardar
//     const data = {
//         nombre,
//         fecha,
//         arrayDetalle:[]
//         //usuario: req.usuario._id
//     }
//     const inventario = new Inventario( data );
//     // Guardar DB
//     await inventario.save();
//     res.status(201).json(inventario);
// }

// const newCreateInventario = async(req, res = response ) => {
//     const fecha=new Date()
//     const nombre = req.body.nombre
//     console.log(nombre)
//     const inventarioDB = await Inventario.findOne({ nombre });
//     if ( inventarioDB ) {
//         return res.status(400).json({
//             msg: `el inventario :   ${ inventarioDB.nombre }, ya existe`
//         });
//     }
//     // Generar la data a guardar
//     const data = {
//         nombre,
//         fecha,
//         arrayDetalle:[]
//         //usuario: req.usuario._id
//     }
//     const inventario = new Inventario( data );
//     // Guardar DB
//     await inventario.save();
//     res.status(201).json(inventario);
// }

// const actualizarInventario = async( req, res = response ) => {

//     const { id } = req.params;
//     const { estado, usuario, ...data } = req.body;

//     data.nombre  = data.nombre.toUpperCase();
//     data.usuario = req.usuario._id;

//     const inventario = await Inventario.findByIdAndUpdate(id, data, { new: true });

//     res.json( inventario );

// }

// const borrarInventario = async(req, res =response ) => {

//     const { id } = req.params;
//     const inventarioBorrada = await Inventario.findByIdAndUpdate( id, { estado: false }, {new: true });

//     res.json( inventarioBorrada );
// }


const crearCodigo = async(req, res = response ) => {
    const { estado, usuario, ...body } = req.body;
    const codigoFslDB = await Codigo.findOne({ codigoFsl: body.codigoFsl });
    const codigoEcostoneDB = await Codigo.findOne({ codigoFsl: body.codigoFsl });

    if ( codigoFslDB ) {
        return res.status(400).json({
            msg: `El producto ${ codigoFslDB.codigoFsl }, ya existe`
        });
    }
    if ( codigoEcostoneDB ) {
        return res.status(400).json({
            msg: `El producto ${ codigoEcostoneDB.codigoFsl }, ya existe`
        });
    }
    // Generar la data a guardar
    const data = {
        ...body,
        codigoFsl: body.codigoFsl,
        codigoEcostone: body.codigoEcostone
    }
    const codigo = new Codigo( data );
    // Guardar DB
    await codigo.save();
    res.status(201).json(codigo);
}





module.exports = {
obtenerCodigos,
crearCodigo
    
}