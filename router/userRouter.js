const express = require('express');
const router = express.Router()
const userController = require('../controller//userController');


// @description: Register user
// @method: POST
// @rest-api: /api/user/register
router.post('/register', userController.register)

// @description: Send message to email
// @method: POST
// @rest-api: /api/user/nodemailer
router.post('/nodemailer', userController.sendEmail)

// @description: Authorization + Session
// @method: POST
// @rest-api: /api/user/login/session
router.post('/login/session', userController.session_auth)

// @description: Decode session
// @method: GET
// @rest-api: /api/user/session/decode
router.get('/session/decode', userController.decode_session)

// @description: Encode session
// @method: GET
// @rest-api: /api/user/session/encode
router.get('/session/encode', userController.encode_session)

// @description: Delete session
// @method: GET
// @rest-api: /api/user/session/delete
router.get('/session/delete', userController.delete_session)

// @description: Authorization + Token
// @method: POST
// @rest-api: /api/user/login/token
router.post('/login/token', userController.token_auth)

// @description: Decode + Token
// @method: GET
// @rest-api: /api/user/token/decode
router.get('/token/decode', userController.decode_token)

// @description: Get all users
// @method: GET
// @rest-api: /api/user/all
router.get('/all', userController.getAll)

// @description: Get a user
// @method: GET
// @rest-api: /api/user/:id
router.get('/:id', userController.getOne)

// @description: Delete a user
// @method: DELETE
// @rest-api: /api/user/:id
router.delete('/:id', userController.getOne)

module.exports = router
