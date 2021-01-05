'use strict';
const { default: Axios } = require("axios")
module.exports = {
  up: async (queryInterface, Sequelize) => {
    const nuts = await Axios.get('https://taco-food-api.herokuapp.com/api/v1/category/15/food');
    let resultNuts = [];
    const notAllowedWords = ['torrada', 'cru', 'crua', 'torrado', 'semente','cozido','cozida','refogado','refogada']
    for (let el of nuts.data) {
      const split = el.description.split(',');
      const name = split[1] && !notAllowedWords.includes(split[1].trim())?
      `${split[0].trim()} ${split[1].trim()}`:split[0].trim();
      if (!resultNuts.includes(name)) {
        resultNuts.push({
          name
        });
      }
    }
    console.log(resultNuts)
    return queryInterface.bulkInsert('products', resultNuts);
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('products', null, {});
  }
};