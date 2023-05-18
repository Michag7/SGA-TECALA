const {Router} = require('express');
const { postLogin } = require('../controllers/login.controller')

const router = Router();


router.post('/login', postLogin )

module.exports = router;