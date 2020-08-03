const { MessageStatus } = require('../models');

const findMessageStatus = (options) => MessageStatus.findOne(options);
const createMessageStatus = (message, data) =>
  MessageStatus.create({
    ...data,
    messageId: message.id,
  });

module.exports = {
  createMessageStatus,
  findMessageStatus,
};
