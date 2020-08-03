const { connection, Sequelize } = require('../db/connection');

const Notification = connection.define(
  'Notification',
  {
    id: {
      allowNull: false,
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },

    sid: {
      type: Sequelize.STRING,
    },

    accountSid: {
      type: Sequelize.STRING,
    },

    serviceSid: {
      type: Sequelize.STRING,
    },

    message: {
      allowNull: false,
      type: Sequelize.TEXT,
    },

    dateCreated: {
      type: Sequelize.DATE,
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
    tableName: 'Notification',
    timestamps: true,
    paranoid: true,
  },
);

Notification.associate = (models) => {
  Notification.hasMany(models.NotificationMessage, {
    foreignKey: 'notificationId',
  });
};

module.exports = Notification;
