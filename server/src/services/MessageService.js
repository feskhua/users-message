const { Message } = require('../models');

const findMessages = (options = {}) => Message.findAll(options);
const findMessage = (options = {}) => Message.findOne(options);
const createMessage = (data) => Message.create(data);

module.exports = {
  findMessages,
  findMessage,
  createMessage,
};
