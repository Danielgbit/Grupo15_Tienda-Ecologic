const fs = require('fs');
const path = require('path');
const bcrypt = require('bcrypt');

const userModels = {

    userRouteJson: path.join(__dirname, '../data/users.json'),

    createUser: (userData) => {

        const users = userModels.findAllUser();

        const emailInUse = userModels.findByEmail(userData.email);


        if (emailInUse) {
            return ({
                email: 'el email esta en uso'
            })
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

    findByField: (field, text) => {

        const userFound = allUsers.find(oneUser => oneUser[field] === text);

        return userFound;
    },



};

module.exports = userModels;

