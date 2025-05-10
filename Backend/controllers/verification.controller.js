const nodemailer = require("nodemailer");
require('dotenv').config()

exports.sendMail = async(receiverMail,otp, username)=>{
    const transporter = nodemailer.createTransport({
    service:"gmail",
    auth: {
        user: process.env.ETHEREAL_USERNAME,
        pass: process.env.ETHEREAL_PASSWORD,
    },
    });
    const mailOption = {
        from: '<naimishomar@gmail.com>',
        to: receiverMail,
        subject: "Welcome to MockPrep community",
        html: `<b>Hello ${username}, <br/> Your OTP for PrepMock is ${otp}</b>`,
    }
    const info = await transporter.sendMail(mailOption);
    console.log("Message sent: %s", info.messageId);
}