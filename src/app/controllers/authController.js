const jwt = require('jsonwebtoken');
const { loginValidation, changeTokenValidation } = require('../validators/authValidator');
const Users = require('../models/Users');
const Profiles = require('../models/Profiles');
const Locations = require('../models/Locations');
const { Op } = require('sequelize');
const expiresIn = '1d';
exports.login = async (req, resp, next) => {
    let status = 400;
    try {
        const { all } = await loginValidation(req.body);
        if (all.length > 0) throw all;
        status = 500;
        const user = await (await Users.findOne({
            where: {
                email: {
                    [Op.like]: req.body.email
                }
            },
            include: [
                { model: Profiles, as: 'profile' },
                { model: Locations, as: 'location' }
            ]
        })).toJSON();
        delete user.password;
        const token = jwt.sign({
            ...user
        }, process.env.JWT_TOKEN, { expiresIn  });
        status = 200;
        return resp.status(status).json({
            ...user,
            token
        })
    } catch (error) {
        console.log(error)
        return resp.status(status).send(
            status === 500 ?
                { error: true, message: 'Error in Server' } :
                error)
    }
}

exports.changeToken = async (req, resp, next) => {
    let status = 400;
    try {
        status = 500;
        const user = await (await Users.findByPk(req.headers['user-id'],
            {
                include: [
                    { model: Profiles, as: 'profile' },
                    { model: Locations, as: 'location' }
                ]
            })).toJSON();
        delete user.password;
        const token = jwt.sign({
            ...user
        }, process.env.JWT_TOKEN, { expiresIn });
        status = 200;
        return resp.status(status).json({
            ...user,
            token
        })

    } catch (error) {
        console.log(error);
        return resp.status(status).send(
            status === 500 ?
                { error: true, message: 'Error in Server' } :
                error)
    }
}