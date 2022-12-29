const mongoose = require('../connection');

const User = require('../../models/User');
const usersSeed = require('../data/usersRaw.json');

User.deleteMany({}).then(() => {
    User.create(usersSeed).then(users => {
        console.log(users)
    })
})

    

module.exports = mongoose