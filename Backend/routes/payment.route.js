const express = require('express');
const { paymentIntegration, verifyPayment } = require('../controllers/payment.controller');
const router = express.Router();

router.route('/create-order').post(paymentIntegration);
router.route('/verify').post(verifyPayment);

module.exports = router