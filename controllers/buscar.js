const { response } = require('express');
const { ObjectId } = require('mongoose').Types;

const { Usuario, Categoria, Producto,Inventario, InventariosBodega } = require('../models');


const coleccionesPermitidas = [
    'usuarios',
    'categorias',
    'productos',
    'roles',
    'inventario',
    'collections',
    'inventariosBodega'
];




const buscarUsuarios = async( termino = '', res = response ) => {

    const esMongoID = ObjectId.isValid( termino ); // TRUE 

    if ( esMongoID ) {
        const usuario = await Usuario.findById(termino);
        return res.json({
            results: ( usuario ) ? [ usuario ] : []
        });
    }

    const regex = new RegExp( termino, 'i' );
    const usuarios = await Usuario.find({
        $or: [{ nombre: regex }, { correo: regex }],
        $and: [{ estado: true }]
    });

    res.json({
        results: usuarios
    });

}
const buscarInventarioBodega = async( termino = '', res = response ) => {
    const esMongoID = ObjectId.isValid( termino ); // TRUE 
    if ( esMongoID ) {
        const InventariosBodega = await InventariosBodega.findById(termino);
        return res.json({
            results: ( inventariosBodega ) ? [ inventariosBodega ] : []
        });
    }
    const regex = new RegExp( termino, 'i' );
    const inventariosBodegas = await InventariosBodega.find({
        $or: [{ codigo: regex }]
    });
    res.json({
        results: inventariosBodegas
    });

}

const buscarCategorias = async( termino = '', res = response ) => {

    const esMongoID = ObjectId.isValid( termino ); // TRUE 

    if ( esMongoID ) {
        const categoria = await Categoria.findById(termino);
        return res.json(
            {
            results: ( categoria ) ? [ categoria ] : []
        }
        );
    }

    const regex = new RegExp( termino, 'i' );
    const categorias = await Categoria.find({ nombre: regex, estado: true });

    res.json({
        results: categorias
    });

}
const buscarInventarios = async( termino = '', res = response ) => {

    const esMongoID = ObjectId.isValid( termino ); // TRUE 

    if ( esMongoID ) {
        const inventario = await Inventario.findById(termino);
        return res.json({
            results: ( inventario ) ? [ inventario ] : []
        });
    }

    const regex = new RegExp( termino, 'i' );
    const inventario = await Inventario.find({ nombre: regex, estado: true });

    res.json({
        results: inventario
    });

}

const buscarProductos = async( termino = '', res = response ) => {

    const esMongoID = ObjectId.isValid( termino ); // TRUE 

    if ( esMongoID ) {
        const producto = await Producto.findById(termino)
                            .populate('categoria','nombre');
        return res.json({
            results: ( producto ) ? [ producto ] : []
        });
    }

    const regex = new RegExp( termino, 'i' );
    const productos = await Producto.find({ nombre: regex, estado: true })
                            .populate('categoria','nombre')

    res.json({
        results: productos
    });

}

const buscar = ( req, res = response ) => {
    
    const { coleccion, termino  } = req.params;

    if ( !coleccionesPermitidas.includes( coleccion ) ) {
        return res.status(400).json({
            msg: `Las colecciones permitidas son: ${ coleccionesPermitidas }`
        })
    }

    switch (coleccion) {
        case 'inventariosBodega':
            buscarInventarioBodega(termino,res);
            break;
        case 'usuarios':
            buscarUsuarios(termino, res);
        break;
        case 'categorias':
            buscarCategorias(termino, res);
        break;
        case 'productos':
            buscarProductos(termino, res);
        break;

        default:
            res.status(500).json({
                msg: 'Se le olvido hacer esta búsquda'
            })
    }

}



module.exports = {
    buscar,
    
}