const UserModel = require('../models/User');
const utility = require('./utilities');

async function changeEmail(_id, email) {
    return await UserModel.updateOne({_id}, {$set: {email}});
}

async function changePassword(_id, currentPassword, newPassword) {
    const user = await UserModel.findById(_id);
    if (!utility.comparePassword(currentPassword, user.password)) {
        throw new Error('Password does not match, please type in correct current password');
    }
    user.set('password', newPassword);
    await user.save();
}


module.exports = {
    changeEmail,
    changePassword,
}