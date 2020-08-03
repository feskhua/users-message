const { connection, Sequelize } = require('../db/connection');

const MessageStatus = connection.define(
  'MessageStatus',
  {
    id: {
      allowNull: false,
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },

    messageId: {
      allowNull: false,
      type: Sequelize.INTEGER,
    },

    SmsSid: {
      type: Sequelize.STRING,
    },

    MessageSid: {
      allowNull: false,
      type: Sequelize.STRING,
    },

    SmsStatus: {
      type: Sequelize.STRING,
    },

    MessageStatus: {
      allowNull: false,
      type: Sequelize.STRING,
    },

    From: {
      allowNull: false,
      type: Sequelize.STRING,
    },

    To: {
      allowNull: false,
      type: Sequelize.STRING,
    },

    MessagingServiceSid: {
      type: Sequelize.STRING,
    },

    AccountSid: {
      type: Sequelize.STRING,
    },

    ErrorCode: {
      type: Sequelize.STRING,
    },

    ApiVersion: {
      type: Sequelize.STRING,
    },

    createdAt: {
      type: Sequelize.DATE,
    },

    updatedAt: {
      type: Sequelize.DATE,
    },

    deletedAt: {
      type: Sequelize.DATE,
    },
  },

  {
    tableName: 'MessageStatus',
    timestamps: true,
    paranoid: true,
  },
);

MessageStatus.associate = (models) => {
  MessageStatus.belongsTo(models.Message, {
    as: 'message',
    foreignKey: 'messageId',
  });
};

module.exports = MessageStatus;
