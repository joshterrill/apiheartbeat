const utility = require('../../lib/utilities');
const jwt = require('jsonwebtoken');
const UserModel = require('../../models/User');

async function login(email, password) {
  email = email.toLowerCase();
  const user = await UserModel.findOne({email});
  if (!user) {
    return {ok: false, error: 'No account found'};
  }
  if (utility.comparePassword(password, user.password)) {
    if (user.isActive) {
      await UserModel.updateOne({_id: user._id}, {$set: {lastLoginOn: new Date()}});
      const token = jwt.sign({email: user.email, _id: user._id, permissions: user.permissions, iat: new Date().getTime()}, process.env.JWT_SECRET, utility.createSignObjects(user.email));
      return {ok: true, token};
    } else {
      return {ok: false, error: 'Account has been deactivated, please contact the website admin'};
    }
  } else {
    return {ok: false, error: 'Login failed, please check email and password'};
  }
}

async function register(email, password, permissions) {
  email = email.toLowerCase();
  const findUser = await UserModel.findOne({email})
  if (findUser) {
    return {ok: false, error: 'Email already exists'};
  } else {
    password = utility.encryptPassword(password);

    let user = await UserModel.create({
      email,
      password,
      createdOn: new Date(),
      lastLoginOn: null,
      permissions: permissions ? permissions : ['user'],
      isActive: true,
    });
    user.password = undefined;
    const token = jwt.sign({email: user.email, _id: user._id, permissions: user.permissions, iat: new Date().getTime()}, process.env.JWT_SECRET, utility.createSignObjects(user.email));
    return {ok: true, user, token};
  }
}

module.exports = {
  login,
  register,
}