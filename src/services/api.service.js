const { cubeTechUrl } = require('../config/config');
const { postRequest } = require('../utils/apiRequests');

/**
 * Send a SMS to one number or multiple SMS
 */
const sendSMS = async (params, headers) => {
  const url = `${cubeTechUrl}/sendSMS`;
  const response = await postRequest(url, params, headers);
  return response;
};

module.exports = {
  sendSMS,
};
