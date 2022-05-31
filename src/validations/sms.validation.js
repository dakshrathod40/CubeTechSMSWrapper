const Joi = require('joi');

const defaultBody = {
  username: Joi.string().required(),
  message: Joi.string().required(),
  sendername: Joi.string().required(),
  templateId: Joi.string().required(),
  smstype: Joi.string().valid('TRANS').required(),
  numbers: Joi.array().items(Joi.string()).required(),
  apikey: Joi.string().required(),
};
const sendSMS = {
  body: Joi.object().keys(defaultBody),
};

const scheduleSMS = {
  body: Joi.object().keys({
    ...defaultBody,
    scheduled: Joi.string().required(),
  }),
};

module.exports = {
  sendSMS,
  scheduleSMS,
};
