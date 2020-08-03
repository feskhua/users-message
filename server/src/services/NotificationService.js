const { Notification } = require('../models');

const findNotifications = (options = {}) => Notification.findAll(options);
const findNotification = (options = {}) => Notification.findOne(options);
const createNotification = (data) => Notification.create(data);

module.exports = {
  findNotifications,
  findNotification,
  createNotification,
};
