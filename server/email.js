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
    
    if (process.env.NODE_ENV == 'production')
        console.log(mailOptions)

    return new Promise( (resolve, reject) => {
        transporter.sendMail(mailOptions, function(error, info){
            if (error) {
                console.log(error);
                reject(error);
            } else {
                console.log('Email sent: ' + info.response);
                resolve();
            }
        }); 
    });
};

exports.sendEmail = function (to, suffix, subject, text, html) {
    if (to != 'newmessage@diyetkocum.net' && process.env.NODE_ENV == 'production') {
        sendEmailInternal('newmessage@diyetkocum.net', suffix + subject, text, html)
    }

    return sendEmailInternal(to, subject, text, html)
}