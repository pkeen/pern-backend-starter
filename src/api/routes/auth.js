const express = require('express');
var passport = require('passport');
var LocalStrategy = require('passport-local');
var crypto = require('crypto');
var db = require('../db');
const router = express.Router();

router.get('/login', function(req, res, next) {
    res.render('auth/login');
});

module.exports = router;