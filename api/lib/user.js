const userData = require('../modules/user');
const book = require('./book');

const registerUser = async(data)=>{
    try {
        const registerData = new userData({
            firm: data.firm,
            OwnerName:data.name,
            email:data.email,
            password:data.password
        })
        console.log(data)
        const save = await registerData.save();
        return save;
    } catch (error) {
        console.error(error);
        return false;
    }
}
module.exports = {registerUser}