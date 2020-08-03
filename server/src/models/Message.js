const { connection, Sequelize } = require('../db/connection');

const Message = connection.define(
  'Message',
  {
    id: {
      allowNull: false,
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },

    accountSid: {
      type: Sequelize.STRING,
    },

    apiVersion: {
      type: Sequelize.STRING,
    },

    body: {
      allowNull: false,
      type: Sequelize.TEXT,
    },

    from: {
      type: Sequelize.STRING,
    },

    to: {
      type: Sequelize.STRING,
    },

    dateCreated: {
      type: Sequelize.DATE,
    },

    dateSent: {
      type: Sequelize.DATE,
    },

    dateUpdated: {
      type: Sequelize.DATE,
    },

    direction: {
      type: Sequelize.STRING,
    },

    errorCode: {
      type: Sequelize.STRING,
    },

    errorMessage: {
      type: Sequelize.STRING,
    },

    messagingServiceSid: {
      type: Sequelize.STRING,
    },

    numMedia: {
      type: Sequelize.STRING,
    },

    numSegments: {
      type: Sequelize.STRING,
    },

    price: {
      type: Sequelize.DOUBLE,
    },

    priceUnit: {
      type: Sequelize.STRING,
    },

    sid: {
      type: Sequelize.STRING,
    },

    status: {
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
    tableName: 'Message',
    timestamps: true,
    paranoid: true,
  },
);

Message.associate = (models) => {
  Message.hasOne(models.MessageStatus, {
    as: 'messageStatus',
    foreignKey: 'messageId',
  });
};

module.exports = Message;
