class Migration {
  static get table() {
    return 'Notification';
  }

  static async up(queryInterface, Sequelize) {
    await queryInterface.createTable(Migration.table, {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
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
    });

    await queryInterface.addIndex(Migration.table, {
      fields: ['sid'],
    });

    await queryInterface.addIndex(Migration.table, {
      fields: ['accountSid'],
    });

    await queryInterface.addIndex(Migration.table, {
      fields: ['serviceSid'],
    });

    await queryInterface.addIndex(Migration.table, {
      fields: ['dateCreated'],
    });

    return null;
  }

  static async down(queryInterface) {
    await queryInterface.dropTable(Migration.table);
    return null;
  }
}

module.exports = Migration;
