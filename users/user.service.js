
const config = require('../config.json');
const jwt = require('jsonwebtoken');
const Role = require('../_helpers/role');
const User = require('../models/users');
const bcrypt = require('bcryptjs');

const users = [
    { id: 1, username: 'admin', password: 'admin', firstName: 'Admin', lastName: 'User', role: Role.Admin },
    { id: 2, username: 'user', password: 'user', firstName: 'Normal', lastName: 'User', role: Role.User }
];
module.exports = {
    authenticate,
    getAll,
    getById,
    create,
    update,
    delete: _delete
};

async function authenticate({ username, password }) {
    const user = users.find(u => u.username === username && u.password === password);
    if (user) {
        const token = jwt.sign({ sub: user.id, role: user.role }, config.secret);
        const { password, ...userWithoutPassword } = user;
        return {
            ...userWithoutPassword,
            token
        };
    }
}

async function getAll() {
    return users.map(u => {
        const { password, ...userWithoutPassword } = u;
        return userWithoutPassword;
    });
}

async function getById(id) {
    const user = users.find(u => u.id === parseInt(id));
    if (!user) return;
    const { password, ...userWithoutPassword } = user;
    return userWithoutPassword;
}
// async function getAll() {
//     return await User.find();
// }
//
// async function getById(id) {
//     return await User.findById(id);
// }

async function create(userParam) {
    // validate
    if (await User.findOne({userName: userParam.userName})) {
        throw 'Username "' + userParam.userName + '" is already taken';
    }
    const user = new User(userParam);

    // hash password
    if (userParam.password) {
        user.password = bcrypt.hashSync(userParam.password, 10);
    }
    if(userParam.role === 'ADMIN'){
            user.role = Role.Admin;
    }
    else if(userParam.role === 'USER'){
        user.role = Role.User;
    }

    // save user
    await user.save();
}

async function update(id, userParam) {
    const user = await User.findById(id);

    // validate
    if (!user) throw 'User not found';
    if (user.userName !== userParam.userName && await User.findOne({ userName: userParam.userName })) {
        throw 'Username "' + userParam.userName + '" is already taken';
    }

    // hash password if it was entered
    if (userParam.password) {
        userParam.password = bcrypt.hashSync(userParam.password, 10);
    }

    // copy userParam properties to user
    Object.assign(user, userParam);

    await user.save();
}

async function _delete(id) {
    await User.findByIdAndRemove(id);
}
