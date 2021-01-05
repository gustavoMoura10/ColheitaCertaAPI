const { Op } = require('sequelize');
const Locations = require('../models/Locations');
const validator = require('validator').default;
const moment = require('moment');
const zipService = require('../services/zipService');

exports.saveValidation = async (body, id) => {
    let errors = [];

    if (body.zipCode) {
        try {
            const request = await zipService.get(`/${body.zipCode.includes('-')?body.zipCode.split('-').join(''):body.zipCode}/json`);
            console.log(request)
        } catch (error) {
            console.log(error)
            errors.push({
                error: true,
                message: 'Wrong zip code'
            });
        }
    }
    console.log(body)
    if (!(validator.isAlpha(body.publicPlace.split(' ').join(''), ['pt-BR'])) || !body.publicPlace)
        errors.push({
            error: true,
            message: 'Wrong public place'
        })
    if (!(validator.isNumeric(String(body.number), ['pt-BR'])) || !body.number)
        errors.push({
            error: true,
            message: 'Wrong public place'
        })

    if (body.complement) {
        if (!(validator.isAlphanumeric(body.complement.split(' ').join(''), ['pt-BR'])))
            errors.push({
                error: true,
                message: 'Wrong complement'
            })
    }
    if (!(validator.isAlpha(body.neighborhood.split(' ').join(''), ['pt-BR'])) || !body.neighborhood)
        errors.push({
            error: true,
            message: 'Wrong neighborhood'
        })
    if (!(validator.isAlpha(body.state, ['pt-BR'])) || !body.state)
        errors.push({
            error: true,
            message: 'Wrong state'
        })
    if (!(validator.isAlpha(body.city.split(' ').join(''), ['pt-BR'])) || !body.city)
        errors.push({
            error: true,
            message: 'Wrong city'
        })
    const location = await Locations.findOne({
        where:{
            userId:{
                [Op.eq]:id
            }
        }
    });
    if(location){
        errors.push({
            error: true,
            message: 'Location already exit for this user'
        })
    }
    return {
        all: [...errors],
        first: errors.shift()
    }
}

exports.distanceValidation = async (params) => {
    let errors = [];
    if(!params.id){
        errors.push({
            error: true,
            message: 'Missing param id'
        })
    }
    return {
        all: [...errors],
        first: errors.shift()
    }
}