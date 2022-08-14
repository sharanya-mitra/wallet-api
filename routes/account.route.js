const express = require('express');
const router = express.Router();

// Require the controllers
const account_controller = require('../controller/account.controller');


/**
 * @route   POST /account/newAccount
 * @desc    Create a new account
 */
router.post('/newAccount', account_controller.new_account);

module.exports = router;
