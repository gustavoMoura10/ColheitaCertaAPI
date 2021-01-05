'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
   const transaction = await queryInterface.sequelize.transaction();
   return await Promise.all([
     queryInterface.changeColumn(
       "stocks",
       "value",
       {
        type: Sequelize.DECIMAL(10,2),
        allowNull: false,
       },
       {
         transaction,
       }
     ),
   ]);
 },

 down: async (queryInterface, Sequelize) => {
   const transaction = await queryInterface.sequelize.transaction();
    return await Promise.all([
     queryInterface.changeColumn(
       "stocks",
       "value",
       {
        type: Sequelize.DECIMAL,
        allowNull: false,
       },
       {
         transaction,
       }
     ),
   ]);
 },
};
