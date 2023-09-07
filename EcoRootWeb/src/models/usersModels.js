const fs = require('fs');
const path = require('path');

const userModels = {

    userRouteJson: path.join(__dirname, '../data/users.json'),

        createUser: (userData) => {

        const users = userModels.findAllUser();

        console.log(users);

        users.push(userData);
        
        const userDataJson = JSON.stringify(users);

        fs.writeFileSync(userModels.userRouteJson, userDataJson, 'utf-8');    
        
    },

    findAllUser:() => {
        const users = fs.readFileSync(userModels.userRouteJson, 'utf-8');

        allUsers = JSON.parse(users);

        return allUsers;
    },

    findByField: function (field, text) {
        const allUsers = this.findAllUser();

        const userFound = allUsers.find(oneUser => oneUser[field] === text);

        return userFound;
    },


};

module.exports = userModels;

/* console.log(userModels.findByField('email', 'Jairito@gmail.com')) */