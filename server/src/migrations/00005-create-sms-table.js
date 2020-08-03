class Migration {
  static get table() {
    return 'Sms';
  }

  static async up(queryInterface, Sequelize) {
    await queryInterface.createTable(Migration.table, {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
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
    });

    await queryInterface.addIndex(Migration.table, {
      fields: ['SmsMessageSid'],
    });

    await queryInterface.addIndex(Migration.table, {
      fields: ['SmsSid'],
    });

    await queryInterface.addIndex(Migration.table, {
      fields: ['SmsStatus'],
    });

    await queryInterface.addIndex(Migration.table, {
      fields: ['To'],
    });

    await queryInterface.addIndex(Migration.table, {
      fields: ['MessagingServiceSid'],
    });

    await queryInterface.addIndex(Migration.table, {
      fields: ['MessageSid'],
    });

    await queryInterface.addIndex(Migration.table, {
      fields: ['AccountSid'],
    });

    await queryInterface.addIndex(Migration.table, {
      fields: ['From'],
    });

    return null;
  }

  static async down(queryInterface) {
    await queryInterface.dropTable(Migration.table);
    return null;
  }
}

module.exports = Migration;
