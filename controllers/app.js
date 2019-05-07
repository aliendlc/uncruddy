const express = require('express')
const sessions = express.Router()
const User = require('../models/users.js')
const bcrypt = require('bcrypt')

user.get('/app', (req, res) => {
  res.render('profiles.ejs')
})
