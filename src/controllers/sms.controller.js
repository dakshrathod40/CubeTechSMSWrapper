const httpStatus = require('http-status');
const catchAsync = require('../utils/catchAsync');
const { smsService } = require('../services');
const ApiError = require('../utils/ApiError');

const sendSMS = catchAsync(async (req, res) => {
  const verifiedMobileNumbers = await smsService.verifyMobileNumbers(req.body);
  if (!verifiedMobileNumbers) {
    throw new ApiError(httpStatus.EXPECTATION_FAILED, 'Please target Indian origin numbers only.');
  }
  const verifiedText = await smsService.verifyText(req.body);
  if (!verifiedText) {
    throw new ApiError(httpStatus.EXPECTATION_FAILED, 'Please match the message with template.');
  }
  const smsResponse = await smsService.sendSMS(req.body);

  res.send(smsResponse);
});

module.exports = {
  sendSMS
};
