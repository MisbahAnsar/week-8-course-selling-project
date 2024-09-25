const express = require('express');
const jwt = require('jsonwebtoken');
const user = require('../Routes/user');

const generateToken = (user) => {
    const info = {
        id: user._id,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName
    };

    return jwt.sign(info, process.env.SECRET, { expiresIn: '30d' })
};

module.exports = generateToken;