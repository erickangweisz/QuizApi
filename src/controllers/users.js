const User = require('../models/user')

function getUsers(req, res) {
    User.find().exec((err, users) => {
        if (err) 
            res.status(500).send({ message: `request error: ${err}` })
        else {
            if (!users) 
                res.status(404).send({ message: `there are no users` })
            else 
                res.status(200).send({ users: users })
        }
    })
}

function updateUser(req, res) {
    const userId = req.params.userId
    const update = req.body

    User.findByIdAndUpdate(userId, update, (err, userUpdated) => {
        if (err) 
            res.status(500).send({ message: `error updating user: ${err}` })

        res.status(200).send({ user: userUpdated })
    })
}

function getUserById(req, res) {
    let userId = req.params.userId

    User.findOneAndUpdate({ _id: userId }, (err, user) => {
        if (err) 
            return res.status(500).send({ message: `request error: ${err}` })
        if (!user) 
            return res.status(404).send({ message: 'the user dont exist' })

        res.status(200).send({ user })
    })
}

function deleteUser(req, res) {
    let userId = req.params.userId

    User.findById(userId, (err, user) => {
        if (err) 
            res.status(500).send({ message: `error deleting user: ${err}` })

        user.remove(err => {
            if (err) 
                res.status(500).send({ message: `error deleting user: ${err}` })
            
            res.status(200).send({ message: 'the user has been deleted' })
        })
    })
}

module.exports = {
    getUsers,
    updateUser,
    getUserById,
    deleteUser
}