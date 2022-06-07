const express = require('express');
const { smsController } = require('../../controllers');
const validate = require('../../middlewares/validate');
const { smsValidation } = require('../../validations');

const router = express.Router();

router.post('/sendSMS', validate(smsValidation.sendSMS), smsController.sendSMS);
router.post('/scheduleSMS', validate(smsValidation.scheduleSMS), smsController.sendSMS);

module.exports = router;
