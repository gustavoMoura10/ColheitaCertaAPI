const Products = require('../models/Products');

exports.findAll = async (req, resp, next) => {
    let status = 400;
    try {
        status = 500;
        const products = await Products.findAll();
        status = 200;
        return resp.status(status).json(products);
    } catch (error) {
        return resp.status(status).send(
            status === 500 ?
                { error: true, message: 'Error in Server' } :
                error)
    }
}