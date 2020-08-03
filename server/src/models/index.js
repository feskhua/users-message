const Contact = require('./Contact');
const Message = require('./Message');
const MessageStatus = require('./MessageStatus');
const Notification = require('./Notification');
const NotificationMessage = require('./NotificationMessage');
const Sms = require('./Sms');

const models = {
  Contact,
  Message,
  MessageStatus,
  Notification,
  NotificationMessage,
  Sms,
};

Object.values(models).forEach((model) => model.associate(models));

module.exports = models;
