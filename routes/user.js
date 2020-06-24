const express = require('express');
const router = require('express-promise-router')();

const UsersController = require('../controllers/user');
const { validateBody, schemas } = require('../helpers/routehelpers');

router.route('/signup')
    //email and password
    .post( validateBody(schemas.authSchema), UsersController.signUp);

router.route('/signin')
    //Generate token
    .post(UsersController.signIn);

router.route('/secret')
    .get(UsersController.secret);


module.exports = router;
