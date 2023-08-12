const fs = require('fs');
const path = require('path');
const userRouteJson = path.join(__dirname, '../data/users.json')

const userModels = {
    userLogin: (userData) => {
        const userDataJson = JSON.stringify(userData)
        fs.writeFileSync(userRouteJson, userDataJson, 'utf-8')
    } 
}

module.exports=userModels