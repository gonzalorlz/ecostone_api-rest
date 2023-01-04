const { Router } = require('express');
const { crearColecion } = require('../controllers/collections');

const router = Router();



router.post('/', [ 
    
    // validarJWT,
    // check('nombre','El nombre es obligatorio').not().isEmpty(),
    // validarCampos
], crearColecion );


module.exports = router;