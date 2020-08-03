const { connection, Sequelize } = require('../db/connection');

const Sms = connection.define(
  'Sms',
  {
    id: {
      allowNull: false,
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },

    ToCountry: {
      type: Sequelize.STRING,
    },

    ToState: {
      type: Sequelize.STRING,
    },

    SmsMessageSid: {
      type: Sequelize.STRING,
    },

    NumMedia: {
      type: Sequelize.STRING,
    },

    ToCity: {
      type: Sequelize.STRING,
    },

    FromZip: {
      type: Sequelize.STRING,
    },

    SmsSid: {
      type: Sequelize.STRING,
    },

    FromState: {
      type: Sequelize.STRING,
    },

    SmsStatus: {
      type: Sequelize.STRING,
    },

    FromCity: {
      type: Sequelize.STRING,
    },

    Body: {
      allowNull: false,
      type: Sequelize.TEXT,
    },

    FromCountry: {
      type: Sequelize.STRING,
    },

    To: {
      allowNull: false,
      type: Sequelize.STRING,
    },

    MessagingServiceSid: {
      type: Sequelize.STRING,
    },

    ToZip: {
      type: Sequelize.STRING,
    },

    NumSegments: {
      type: Sequelize.STRING,
    },

    MessageSid: {
      type: Sequelize.STRING,
    },

    AccountSid: {
      type: Sequelize.STRING,
    },

    From: {
      allowNull: false,
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
    tableName: 'Sms',
    timestamps: true,
    paranoid: true,
  },
);

Sms.associate = () => {};

module.exports = Sms;
