const fs = require('fs');
const path = require('path');

const userModels = {

    userRouteJson: path.join(__dirname, '../data/users.json'),

    findAllUser:() => {
        const users = fs.readFileSync(userModels.userRouteJson, 'utf-8');

        allUsers = JSON.parse(users);

        return allUsers;
    },

    createUser: (userData) => {

        const users = userModels.findAllUser();

        console.log(users);

        users.push(userData);
        
        const userDataJson = JSON.stringify(users);

        fs.writeFileSync(userModels.userRouteJson, userDataJson, 'utf-8');    
        
    }

};

module.exports = userModels;