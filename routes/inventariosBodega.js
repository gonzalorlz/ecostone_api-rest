const { Router } = require('express');
const { check } = require('express-validator');
const { validarJWT, validarCampos, esAdminRole } = require('../middlewares');
const { obtenerInventarios,
        obtenerInventarioBodega,
        crearInventario,
        actualizarInventario, 
        addProductoInventario,
        borrarInventario } = require('../controllers/inventariosBodega');
const { existeInventarioPorId } = require('../helpers/db-validators');
const router = Router();
router.get('/', obtenerInventarios );
router.get('/:id',[
    //check('id', 'No es un id de Mongo válido').isMongoId(),
    //check('id').custom( existeInventarioPorId ),
    //,
], obtenerInventarioBodega );

// Crear inventario - privado - cualquier persona con un token válido
router.post('/', [ 
    validarJWT,
    check('nombre','El nombre es obligatorio').not().isEmpty(),
   // validarCampos
], crearInventario );

router.post('/addProducto', [ 
    validarJWT,
    check('_id','El ID es obligatorio').not().isEmpty(),
   // validarCampos
], addProductoInventario );

// Actualizar - privado - cualquiera con token válido
router.put('/:id',[
    validarJWT,
    check('nombre','El nombre es obligatorio').not().isEmpty(),
    check('id').custom( existeInventarioPorId ),
    validarCampos
],actualizarInventario );

// Borrar una inventario - Admin
router.delete('/:id',[
    validarJWT,
    esAdminRole,
    check('id', 'No es un id de Mongo válido').isMongoId(),
    check('id').custom( existeInventarioPorId ),
    validarCampos,
],borrarInventario);

module.exports = router;