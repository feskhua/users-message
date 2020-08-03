const {
  formatNumber,
  parseNumber,
  isValidNumber,
} = require('libphonenumber-js');

const { connection, Sequelize } = require('../db/connection');

const Contact = connection.define(
  'Contact',
  {
    id: {
      allowNull: false,
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },

    visitDate: {
      type: Sequelize.DATE,
    },

    phoneNumber: {
      allowNull: false,
      type: Sequelize.STRING,
      set(value) {
        if (value) {
          if (!isValidNumber(value)) {
            throw new Error('Invalid phone format');
          }

          const { phone: phoneNumber, country } = parseNumber(value);
          const phone = formatNumber(phoneNumber, country, 'E.164');
          this.setDataValue('phoneNumber', phone);
        } else {
          this.setDataValue('phoneNumber', null);
        }
      },

      validate: {
        notEmpty: true,
      },
    },

    emailAddress: {
      type: Sequelize.STRING,
    },

    prospectName: {
      type: Sequelize.STRING,
    },

    productName: {
      type: Sequelize.STRING,
    },

    status: {
      type: Sequelize.INTEGER,
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
    tableName: 'Contact',
    timestamps: true,
    paranoid: true,
  },
);

Contact.STATUS_ENABLED = 1;
Contact.STATUS_DISABLED = 0;

Contact.associate = (models) => {
  Contact.hasMany(models.Message, {
    as: 'outboundMessages',
    foreignKey: 'from',
    sourceKey: 'phoneNumber',
  });

  Contact.hasMany(models.Message, {
    as: 'inboundMessages',
    foreignKey: 'to',
    sourceKey: 'phoneNumber',
  });

  Contact.hasMany(models.Sms, {
    as: 'sms',
    foreignKey: 'From',
    sourceKey: 'phoneNumber',
  });

  Contact.hasMany(models.NotificationMessage, {
    as: 'notificationMessages',
    foreignKey: 'To',
    sourceKey: 'phoneNumber',
  });
};

module.exports = Contact;
