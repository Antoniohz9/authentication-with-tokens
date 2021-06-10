const express = require('express');
const User = require('../controllers/userCtrl');
const Hooks = require ('../hooks/passport');
const api = express.Router();

// // Usuarios
api.post('/login', Hooks.login)// autentication
api.get('/user', Hooks.auth, User.getUserAll)// get all users

module.exports = api