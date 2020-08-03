class Migration {
  static get table() {
    return 'Message';
  }

  static async up(queryInterface, Sequelize) {
    await queryInterface.createTable(Migration.table, {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
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
    });

    await queryInterface.addIndex(Migration.table, {
      fields: ['accountSid'],
    });

    await queryInterface.addIndex(Migration.table, {
      fields: ['direction'],
    });

    await queryInterface.addIndex(Migration.table, {
      fields: ['from'],
    });

    await queryInterface.addIndex(Migration.table, {
      fields: ['to'],
    });

    await queryInterface.addIndex(Migration.table, {
      fields: ['messagingServiceSid'],
    });

    await queryInterface.addIndex(Migration.table, {
      fields: ['sid'],
    });

    await queryInterface.addIndex(Migration.table, {
      fields: ['status'],
    });

    return null;
  }

  static async down(queryInterface) {
    await queryInterface.dropTable(Migration.table);
    return null;
  }
}

module.exports = Migration;
