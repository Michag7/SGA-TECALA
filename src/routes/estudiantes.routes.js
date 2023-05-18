const {Router} = require('express');
const { getEstudiante} = require('../controllers/estudiantes.controller')

const router = Router();


router.get('/estudiante', getEstudiante )


module.exports = router;