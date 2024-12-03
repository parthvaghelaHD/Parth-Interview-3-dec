require('dotenv').config();
const nodemailer = require('nodemailer');

exports.sendEmailWithPDF = async (email, pdfPath) => {
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.EMAIL_USER,
            password: process.env.EMAIL_PASS
        }
    });

    const mailOptions =
    {
        from: process.env.EMAIL_USER,
        to: email,
        subject: "Product Details PDF",
        text:" Pleasse find the attached product details PDF",
        attachments: [{filename: "product-details.pdf", path: pdfPath}]
    };

    await transporter.sendMail(mailOptions);
};