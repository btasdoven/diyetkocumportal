var nodemailer = require('nodemailer');

console.log(process.env.EMAIL_PASS)

var transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'diyetkocumapp@gmail.com',
    pass: process.env.EMAIL_APP_PASS
  }
});

var sendEmailInternal = function (to, subject, text, html) {
    var mailOptions = {
        from: 'Diyet Koçum <info@diyetkocum.net>',
        to: to,
        subject: subject,
        text: text,
        html: html,
    };
    
    console.log(mailOptions)

    transporter.sendMail(mailOptions, function(error, info){
        if (error) {
            console.log(error);
        } else {
            console.log('Email sent: ' + info.response);
        }
    }); 
};

exports.sendEmail = function (to, suffix, subject, text, html) {
    sendEmailInternal(to, subject, text, html)
    if (to != 'newmessage@diyetkocum.net' && process.env.NODE_ENV == 'production') {
        sendEmailInternal('newmessage@diyetkocum.net', suffix + subject, text, html)
    }
}