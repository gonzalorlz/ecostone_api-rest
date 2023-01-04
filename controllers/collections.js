const { response } = require('express');
//const { collection } = require('../models');
const { db, collection } = require('../models/collections');

 

const crearColecion = async(req, res = response ) =>  {
    console.log('uno');
        const nombre = req.body.nombre.toUpperCase();


        const _o= await db.collection.collection('hola')
        console.log(_o)
 

 }

    
module.exports={
    crearColecion
}