let ImageKit = require("imagekit");

exports.ImageKit = new ImageKit({
    publicKey : process.env.PUBLIC_KEY_IMAGEKIT,
    privateKey : process.env.PRIVATE_KEY_IMAGEKIT,
    urlEndpoint : process.env.ENDPOINT_IMAGEKIT
});
