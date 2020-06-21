const express = require('express');
const router = express.Router();
const userService = require('./user.service');
const authorize = require('../_helpers/authorize');
const Role = require('../_helpers/role');

// routes
router.post('users/authenticate', authenticate);     // public route
router.post('users/register',authorize(Role.Admin), register);


function authenticate(req, res, next) {
    userService.authenticate(req.body)
        .then(user => user ? res.json(user) : res.status(400).json({ message: 'Username or password is incorrect' }))
        .catch(err => next(err));
}

function register(req, res, next) {
    userService.create(req.body)
        .then(() => res.json({}))
        .catch(err => next(err));
}

module.exports = router;
