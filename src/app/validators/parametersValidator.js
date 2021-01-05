exports.saveValidation = async (body) =>{
    let errors = [];

    if(!body.key && typeof body.key !== 'string'){
        errors.push({
            error: true,
            message: 'Wrong key'
        });
    }
    if(!body.value && typeof body.value !== 'string'){
        errors.push({
            error: true,
            message: 'Wrong value'
        });
    }
    return {
        all: [...errors],
        first: errors.shift()
    }
}