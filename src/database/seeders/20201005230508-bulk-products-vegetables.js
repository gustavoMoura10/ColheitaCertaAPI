'use strict';
const { default: Axios } = require("axios")
module.exports = {
  up: async (queryInterface, Sequelize) => {
    const nuts = await Axios.get('https://taco-food-api.herokuapp.com/api/v1/category/2/food');
    let resultNuts = [];
    const notAllowedWords = ['torrada', 'cru', 'crua', 'torrado', 'semente', 'cozido', 'cozida', 'refogado', 'refogada', 'sauté', 'folhas desidratadas', 'frito', 'frita', 'Nhoque', 'Biscoito','Pão', 'Seleta de legumes', 'purê', 'molho industrializado']
    for (let el of nuts.data) {
      const split = el.description.split(',');
      const name = split[1] && !notAllowedWords.includes(split[1].trim()) || !notAllowedWords.includes(split[0].trim())?
        `${split[0].trim()} ${split[1].trim()}` : split[0].trim();
      if (!resultNuts.find(el => el.name === name)) {
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