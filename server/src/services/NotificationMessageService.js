const { NotificationMessage } = require('../models');

const findNotificationMessage = (options) =>
  NotificationMessage.findOne(options);

const createNotificationMessage = (notification, data) =>
  NotificationMessage.create({
    ...data,
    notificationId: notification.id,
  });

module.exports = {
  createNotificationMessage,
  findNotificationMessage,
};
