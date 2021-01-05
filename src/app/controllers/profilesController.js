const moment = require('moment');
const Profiles = require('../models/Profiles');
const Users = require('../models/Users');
const { saveValidation } = require('../validators/profilesValidator');
const {ImageKit} = require('../../config/imageKit')


exports.save = async (req, resp, next) => {
    let status = 400;
    try {
        let defaultImage = 'https://ik.imagekit.io/hmtqyxcegz/icoUser_RWFi_EeO4.png';

        const { all } = await saveValidation(req.body,req.headers['user-id']);
        if (all.length > 0) throw all;
        status = 500;
        if(req.body.profilePicture.mime && req.body.profilePicture.data){
            let extension = req.body.profilePicture.mime.split('/').pop();
            const image = await ImageKit.upload({
                file : req.body.profilePicture.data, //required
                fileName : `${req.headers['user-id']}_profile_picture_${new Date().getTime()}.${extension}`,   //required
            });
            req.body.profilePicture = image.url;
        }else{
            req.body.profilePicture = defaultImage;
        }
        req.body.birthdate = moment(req.body.birthdate,'DD/MM/YYYY').toDate();
        req.body.userId = req.headers['user-id'];
        const profile = await (await Profiles.create(req.body)).toJSON();
        
        status = 200;
        return resp.status(status).json(profile);

    } catch (error) {
        console.log(error);
        return resp.status(status).send(
            status === 500 ?
                { error: true, message: 'Error in Server' } :
                error)
    }
}
