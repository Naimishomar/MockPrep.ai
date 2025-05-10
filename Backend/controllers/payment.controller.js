const Razorpay = require('razorpay');
const crypto = require('crypto');
const User = require('../models/user.model.js');
const razorpay = new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID,
    key_secret: process.env.RAZORPAY_SECRET_KEY
});

exports.paymentIntegration = async(req,res)=>{
    try {
        const { amount, currency, receipt } = req.body;
        const options = {
            amount: amount * 100, // Amount in paise
            currency: currency || 'INR',
            receipt: receipt || 'receipt#1',
        };
        const order = await razorpay.orders.create(options);
        res.status(200).json(order);
    } catch (error) {
        console.error('Order creation error:', error);
        res.status(500).json({ error: 'Failed to create Razorpay order' });
    }
    }

exports.verifyPayment = async(req,res)=>{
    try {
        const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;
        const body = razorpay_order_id + '|' + razorpay_payment_id;
        const expectedSignature = crypto
        .createHmac('sha256', process.env.RAZORPAY_SECRET_KEY)
        .update(body.toString())
        .digest('hex'); 
        if (expectedSignature === razorpay_signature) {
            const plan = req.body.plan;
            const durations = {
            'Monthly': 30,
            'Half-Yearly': 180,
            'Annually': 365
            };
            const now = new Date();
            const expiry = new Date();
            expiry.setDate(now.getDate() + durations[plan]);
            await User.updateOne({ _id: userId }, { subscription: 'Subscribed' });
            res.status(200).json({ success: true, message: 'Payment verified successfully' });
        } else {
            res.status(400).json({ success: false, message: 'Invalid signature' });
        }
    } catch (error) {
        console.log(error);
        
    }
}