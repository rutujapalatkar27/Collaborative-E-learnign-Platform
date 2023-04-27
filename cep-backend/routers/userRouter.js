const express = require('express');
const router = express.Router();

const userController = require('../controllers/userController');
const codeController = require('../controllers/codeController');

router.get('/', userController.test);
router.post('/signup', userController.signup);
router.post('/signin', userController.signin);
router.post('/code/run', codeController.compile);
router.post('/sessionsget', userController.sessionGet);
router.post('/sessions', userController.sessionPost);

module.exports = router;