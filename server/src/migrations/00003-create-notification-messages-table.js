class Migration {
  static get table() {
    return 'NotificationMessage';
  }

  static async up(queryInterface, Sequelize) {
    await queryInterface.createTable(Migration.table, {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
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
    });

    await queryInterface.addIndex(Migration.table, {
      fields: ['notificationId'],
    });

    await queryInterface.addIndex(Migration.table, {
      fields: ['SmsSid'],
    });

    await queryInterface.addIndex(Migration.table, {
      fields: ['MessageSid'],
    });

    await queryInterface.addIndex(Migration.table, {
      fields: ['From'],
    });

    await queryInterface.addIndex(Migration.table, {
      fields: ['To'],
    });

    await queryInterface.addIndex(Migration.table, {
      fields: ['MessagingServiceSid'],
    });

    await queryInterface.addIndex(Migration.table, {
      fields: ['AccountSid'],
    });

    return null;
  }

  static async down(queryInterface) {
    await queryInterface.dropTable(Migration.table);
    return null;
  }
}

module.exports = Migration;
