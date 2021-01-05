const axios = require('axios').default;

const zipService = axios.create({
    baseURL: 'https://viacep.com.br/ws'
})

module.exports = zipService;