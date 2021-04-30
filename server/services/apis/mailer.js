const nodemailer = require('nodemailer');
const moment = require('moment');

const errorDetected = async (err) => {
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: 'roadrunnerservicebot@gmail.com',
          pass: process.env.MAIL_PW
        }
      });

    const time = moment().format('LLLL');
    
    const mailOptions = {
        from: 'roadrunnerservicebot@gmail.com',
        to: 'harshithl1777@gmail.com',
        subject: `Error detected at ${time}`,
        text: `Error detected during webhook operation at ${time}. The error is listed below:
        ${err}`
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) console.log(error);
        else console.log('Email sent: ' + info.response);
    });
}

module.exports = {
    errorDetected
}