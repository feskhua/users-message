require('dotenv').config({ path: `${__dirname}/../../.env` });

const { Sms } = require('../models');

const { SMS_UNSUBSCRIBE_CODE } = process.env;

const findSmsAll = (options = {}) => Sms.findAll(options);
const findSms = (options = {}) => Sms.findOne(options);
const createSms = (data) => Sms.create(data);
const isUnsubscribeSms = (sms) => sms.Body.includes(SMS_UNSUBSCRIBE_CODE);

module.exports = {
  findSmsAll,
  findSms,
  createSms,
  isUnsubscribeSms,
};
