'use strict';
let bcrypt = require('bcrypt');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */

    let salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash('testpass123', salt)

    queryInterface.bulkInsert('accounts', [{
      name: 'fakeName',
      email: 'test@test.com',
      password: hashedPassword //'testpass123'
    }, {
      name: 'fakeName',
      email: 'test2@test.com',
      password: hashedPassword // 'testpass123'
      }
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
    //queryInterface.bulkDelete('accounts', {
    //  email: ['test@test.com', 'test2@test.com']
    //});
  }
};
