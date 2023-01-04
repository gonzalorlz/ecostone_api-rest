const { response } = require('express');
const {Inventario}  = require('../models');


const obtenerInventarios = async(req, res = response ) => {


    const { limite = 100, desde = 0 } = req.query;
    const query = { estado: true };

    const [ total, inventario ] = await Promise.all([
        Inventario.countDocuments(query),
        Inventario.find(query)
            .populate('usuario', 'nombre')
            .skip( Number( desde ) )
            .limit(Number( limite ))
    ]);

    res.json({
        total,
        inventario
    });
}

const obtenerInventario = async(req, res = response ) => {
   

    const { id } = req.params;
    const inventario = await Inventario.findById( id )
                            .populate('usuario', 'nombre');

    res.json( inventario );

}

const crearInventario = async(req, res = response ) => {
    const fecha=new Date()

    const nombre = req.body.nombre.toUpperCase();

    const inventarioDB = await Inventario.findOne({ nombre });

    if ( inventarioDB ) {
        return res.status(400).json({
            msg: `el inventario :   ${ inventarioDB.nombre }, ya existe`
        });
    }

    // Generar la data a guardar
    const data = {
        fecha,
        nombre,
        usuario: req.usuario._id
    }

    const inventario = new Inventario( data );

    // Guardar DB
    await inventario.save();

    res.status(201).json(inventario);

}

const actualizarInventario = async( req, res = response ) => {

    const { id } = req.params;
    const { estado, usuario, ...data } = req.body;

    data.nombre  = data.nombre.toUpperCase();
    data.usuario = req.usuario._id;

    const inventario = await Inventario.findByIdAndUpdate(id, data, { new: true });

    res.json( inventario );

}

const borrarInventario = async(req, res =response ) => {

    const { id } = req.params;
    const inventarioBorrada = await Inventario.findByIdAndUpdate( id, { estado: false }, {new: true });

    res.json( inventarioBorrada );
}




module.exports = {
    crearInventario,
    obtenerInventario,
    obtenerInventarios,
    actualizarInventario,
    borrarInventario
}