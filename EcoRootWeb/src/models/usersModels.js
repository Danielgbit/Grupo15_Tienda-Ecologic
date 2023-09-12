const fs = require('fs');
const path = require('path');
const bcrypt = require('bcrypt');
const models = require('./productsModels');

const userModels = {

    userRouteJson: path.join(__dirname, '../data/users.json'),

    createUser: (userData) => {

        const users = userModels.findAllUser();

        const emailInUse = userModels.findByEmail(userData.email);


        if (emailInUse) {
            return ({
                email: 'el email esta en uso'
            });
        };

        userData.password = bcrypt.hashSync(userData.password, 10);

        users.push(userData);

        const userDataJson = JSON.stringify(users);

        fs.writeFileSync(userModels.userRouteJson, userDataJson, 'utf-8');

    },

    findAllUser: () => {
        const allUsers = JSON.parse(fs.readFileSync(userModels.userRouteJson, 'utf-8'));

        return allUsers;
    },

    findByEmail: (email) => {
        const allusers = userModels.findAllUser();

        const searchEmail = allusers.find(user => user.email === email);

        return searchEmail || null;

    },

    findByPk: (id) => {
        const users = userModels.findAllUser();

        const userByPk = users.find(user => user.id === id);

        return userByPk;
    },

    destroy: (userId) => {

        const users = userModels.findAllUser();

        const newUser = users.filter((user) => user.id !== userId);

        const newJson = JSON.stringify(newUser, null, 2);

        console.log(newUser);

        fs.writeFileSync(userModels.userRouteJson, newJson, 'utf-8');

    },

    update: (userUpdated) => {
        
        let users = userModels.findAllUser();

        if (users.id !== userUpdated.id) {
            userUpdated.password = bcrypt.hashSync(userUpdated.password, 10);
        };


        const userIndex = users.findIndex((user) => user.id === userUpdated.id);

        users[userIndex] = userUpdated;

        const userJSON = JSON.stringify(users, null, 2);

        fs.writeFileSync(userModels.userRouteJson, userJSON, 'utf-8');

    }
};

module.exports = userModels;