const { connection, Sequelize } = require('../db/connection');

const NotificationMessage = connection.define(
  'NotificationMessage',
  {
    id: {
      allowNull: false,
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },

    notificationId: {
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
    tableName: 'NotificationMessage',
    timestamps: true,
    paranoid: true,
  },
);

NotificationMessage.associate = (models) => {
  NotificationMessage.belongsTo(models.Notification, {
    as: 'notification',
    foreignKey: 'notificationId',
  });
};

module.exports = NotificationMessage;
