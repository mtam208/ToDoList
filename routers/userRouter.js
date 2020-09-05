const express = require('express')
const router = express.Router()
const path = require('path')
const jwt = require('jsonwebtoken')
const cookieParser = require('cookie-parser');

const bodyParser = require('body-parser')
router.use(bodyParser.urlencoded({ extended: false }))
router.use(bodyParser.json())
router.use(cookieParser());

const UserModel = require('../models/userDB')

router.get('/login', (req, res, next) => {
    res.render('loginPage')
})

router.get('/signup', (req, res, next) => {
    res.render('signupPage')
})

router.post('/login', (req, res, next) => {
    UserModel.findOne({
        username: req.body.username,
        password: req.body.password
    })
    .then(data => {
        if (data) {
            let token = jwt.sign(data._id.toJSON(), 'secret');
            res.cookie('token', token, { maxAge: 30*60*1000 });
            return res.redirect('../api/tasks')
          } else {
            return res.redirect('/users/login')
          }
    })
    .catch(err => {
        res.status(500).json('Server error POST login')
    })
})

router.post('/signup', (req, res, next) => {
    UserModel.create({
        username: req.body.username,
        password: req.body.password
    })
    .then(data => {
        res.redirect('/users/login')
    })
    .catch(err => {
        res.status(500).json('Server error POST signup')
    })
})

module.exports = router