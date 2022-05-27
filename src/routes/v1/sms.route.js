const express = require('express');
const validate = require('../../middlewares/validate');
const smsValidation = require('../../validations/sms.validation');
const smsController = require('../../controllers/sms.controller');

const router = express.Router();

router.post('/register', validate(smsValidation.register), smsController.register);
router.post('/login', validate(smsValidation.login), smsController.login);

module.exports = router;
