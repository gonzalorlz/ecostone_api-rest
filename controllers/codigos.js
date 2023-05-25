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