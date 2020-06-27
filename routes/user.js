const express = require('express');
const router = require('express-promise-router')();
const passport = require('passport');
const passportconfig = require('../passport');

const UsersController = require('../controllers/user');
const { validateBody, schemas } = require('../helpers/routehelpers');

router.route('/signup')
    //email and password
    .post( validateBody(schemas.authSchema), UsersController.signUp);

router.route('/signin')
    //Generate token
    .post( validateBody(schemas.authSchema) ,passport.authenticate('local', {session: false}), UsersController.signIn);

router.route('/secret')
    .get(passport.authenticate('jwt', { session: false }), UsersController.secret);


module.exports = router;
