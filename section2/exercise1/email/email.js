require('dotenv').config();

const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_USER,
        password: process.env.EMAIL_PASS
    }
})

const sendEmail = async (to, subject, text) => {
    try {
        await transporter.sendMail({
            from: process.env.EMAIL_USER,
            to,
            subject,
            text
        })
    } catch (err) {
        console.log("error while sending an email", err);
    }
}

module.exports = sendEmail;