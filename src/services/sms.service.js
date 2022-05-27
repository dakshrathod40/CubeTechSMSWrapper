const httpStatus = require('http-status');
const { apiService } = require('.');

/**
 * Send a SMS to one number or multiple SMS
 */
const sendSMS = async (body) => {
  const apiResponse = await apiService.sendSMS(params, {});
  return apiResponse;
};

/**
 * Send a SMS to one number or multiple SMS
 */
const verifyMobileNumbers = async (numbers) => {};

/**
 * Send a SMS to one number or multiple SMS
 */
const verifyText = async (message) => {};

module.exports = {
  sendSMS,
  verifyMobileNumbers,
  verifyText,
};
