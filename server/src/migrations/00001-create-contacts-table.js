class Migration {
  static get table() {
    return 'Contact';
  }

  static async up(queryInterface, Sequelize) {
    await queryInterface.createTable(Migration.table, {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },

      visitDate: {
        type: Sequelize.DATE,
      },

      phoneNumber: {
        allowNull: false,
        type: Sequelize.STRING,
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
        allowNull: false,
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
    });

    await queryInterface.addIndex(Migration.table, {
      fields: ['visitDate'],
    });

    await queryInterface.addIndex(Migration.table, {
      fields: ['phoneNumber'],
    });

    await queryInterface.addIndex(Migration.table, {
      fields: ['emailAddress'],
    });

    await queryInterface.addIndex(Migration.table, {
      fields: ['prospectName'],
    });

    await queryInterface.addIndex(Migration.table, {
      fields: ['productName'],
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
