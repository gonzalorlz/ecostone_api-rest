const { response } = require('express');
const {Inventario}  = require('../models');
const inventario = require('../models/inventario');


const obtenerInventarios = async(req, res = response ) => {
    const inventarios = await Inventario.find();
    if (inventarios){
        res.json({
            //total,
            inventarios
        });
    }

}

const obtenerInventario = async(req, res = response ) => {
   

    const { id } = req.params;
    const inventario = await Inventario.findById( id )
                            .populate('usuario', 'nombre');

    res.json( inventario );

}

const crearInventario = async(req, res = response ) => {
    const fecha=new Date()
    const nombre = req.body.nombre
    console.log(nombre)
    const inventarioDB = await Inventario.findOne({ nombre });
    if ( inventarioDB ) {
        return res.status(400).json({
            msg: `el inventario :   ${ inventarioDB.nombre }, ya existe`
        });
    }
    // Generar la data a guardar
    const data = {
        nombre,
        fecha,
        arrayDetalle:[]
        //usuario: req.usuario._id
    }
    const inventario = new Inventario( data );
    // Guardar DB
    await inventario.save();
    res.status(201).json(inventario);
}

const newCreateInventario = async(req, res = response ) => {
    const fecha=new Date()
    const nombre = req.body.nombre
    console.log(nombre)
    const inventarioDB = await Inventario.findOne({ nombre });
    if ( inventarioDB ) {
        return res.status(400).json({
            msg: `el inventario :   ${ inventarioDB.nombre }, ya existe`
        });
    }
    // Generar la data a guardar
    const data = {
        nombre,
        fecha,
        arrayDetalle:[]
        //usuario: req.usuario._id
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

const addProductoInventario=async (req,res=response)=>{
    const array=req.body.arrayDetalle
    const _id=req.body._id;
    const codigo=req.body.arrayDetalle.codigo


   //const inventarioDB = await Inventario.findOne({ 'arrayDetalle.codigo':codigo });
    //console.log(inventarioDB)
    const tem= false;
    if(!tem){
        if (req.body._id) {
            Inventario.updateOne({ _id: req.body._id }, {
                    $push: {
                        'arrayDetalle': array
                    }
                },
               (error) => {
                    if (error) {
                        return res.json({
                            success: false,
                            msj: 'No se pudo agregar el teléfono',
                            err
                        });
                    } else {
                        return res.json({
                            success: true,
                            msj: 'Se agregó correctamente el teléfono'
                        });
                    }
                }
            )
        } else {
            return res.json({
                success: false,
                msj: 'No se pudo agregar el teléfono, por favor verifique que el _id sea correcto'
            });
        }
    }else{
        return res.json({
            success: false,
            msj: 'ya existe este codigo'
           
        });
    }
}





module.exports = {
    crearInventario,
    obtenerInventario,
    obtenerInventarios,
    actualizarInventario,
    borrarInventario,
    addProductoInventario
}