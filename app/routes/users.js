const express = require('express');
const router = express.Router();
const userController = require('../controllers/users');

router.put('/:userId', userController.updateById);

module.exports = router;