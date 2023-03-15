const { Router } = require('express');
const { check } = require('express-validator');

const { validarJWT, validarCampos, esAdminRole } = require('../middlewares');

const { obtenerCodigos, crearCodigo, } = require('../controllers/codigos');

const { existeCategoriaPorId, existeProductoPorId } = require('../helpers/db-validators');
const { route } = require('./auth');

const router = Router();

/**
 * {{url}}/api/categorias
 */

//  Obtener todas las categorias - publico
router.get('/', obtenerCodigos );

// Obtener una categoria por id - publico
// router.get('/:id',[
//     check('id', 'No es un id de Mongo válido').isMongoId(),
//     check('id').custom( existeProductoPorId ),
//     validarCampos,
// ], obtenerProducto );


// Crear categoria - privado - cualquier persona con un token válido
router.post('/', [
    validarJWT,
    check('codigoFsl','El codigo fsl es obligatorio').not().isEmpty(),
    check('codigoEcostone','codigo ecostone obligatorio').not().isEmpty(),

    validarCampos
], crearCodigo );

// router.post('/:id',[
//     //validarJWT,
//     check('name','el nombre es obligatorio' ).not().isEmpty
// ],agregarDetalleProducto);

// // Actualizar - privado - cualquiera con token válido
// router.put('/:id',[
//     validarJWT,
//     // check('categoria','No es un id de Mongo').isMongoId(),
//     check('id').custom( existeProductoPorId ),
//     validarCampos
// ], actualizarProducto );

// // Borrar una categoria - Admin
// router.delete('/:id',[
//     validarJWT,
//     esAdminRole,
//     check('id', 'No es un id de Mongo válido').isMongoId(),
//     check('id').custom( existeProductoPorId ),
//     validarCampos,
// ], borrarProducto);


 module.exports = router;