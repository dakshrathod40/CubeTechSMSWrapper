const { cubeTechUrl } = require('../config/config');
const { templateMapper } = require('../constants');
const { getRequest } = require('../utils/apiRequests');

/**
 * Send a SMS to one number or multiple SMS
 */
const sendSMS = async ({ templateId, ...body }) => {

  const url = `${cubeTechUrl}/sendSMS`;
  const response = await getRequest(url, body);
  return response;
};

/**
 * verify mobile numbers
 */
const verifyMobileNumbers = async ({ numbers }) => {
  numbers = numbers.map((item) => item.slice(item.length - 10));
  return numbers.every((number) => number.length === 10);
};

/**
 * verify text with template
 */
const verifyText = async ({ message, templateId }) => {
  const regex = templateMapper[templateId];
  if (regex) {
    const matches = [...message.matchAll(regex)];
    return !!matches.length && matches.every((match) => match.length < 31);
  }
  return false;
};

module.exports = {
  sendSMS,
  verifyMobileNumbers,
  verifyText,
};
