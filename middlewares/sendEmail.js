const nodemailer = require('nodemailer');

const sendEmail = async (email, subject, text) => {
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        host: "smtp.gmail.com",


        auth: {
            user: "hotel.system.project@gmail.com",
            pass: process.env.EMAIL_PASSWORD
        }
    });

    const mailOptions = {
        from: "hotel.system.project@gmail.com",
        to: email,
        subject: subject,
        text: text,
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.log(error);
        } else {
            console.log('Email sent: ' + info.response);
        }
    });
}

const sendEmailWithFile = async (email, subject, text, file) => {
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        host: "smtp.gmail.com",


        auth: {
            user: "hotel.system.project@gmail.com",
            pass: process.env.EMAIL_PASSWORD,
        }
    });

    const mailOptions = {
        from: "hotel.system.project@gmail.com",
        to: email,
        subject: subject,
        text: text,
        attachments: [{
            filename: 'invoice.pdf',
            path: file
        }]

    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.log(error);
        } else {
            console.log('Email sent: ' + info.response);
        }
    });
}

module.exports = {
    sendEmail,
    sendEmailWithFile
}

