const express = require('express');
const router = express.Router();
const { register, login, getuser, getAllUsers, protect } = require('../controllers/authController');

router.post('/register', register);
router.post('/login', login);
router.get('/:id', protect, getuser);
router.get('/', protect, getAllUsers);

module.exports = router;