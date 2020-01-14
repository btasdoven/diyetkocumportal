var nodemailer = require('nodemailer');

console.log(process.env.EMAIL_PASS)

var transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'diyetkocumapp@gmail.com',
    pass: process.env.EMAIL_PASS //'d1y3tk0cum'
  }
});


exports.sendEmail = function (to, subject, text) {
    var mailOptions = {
        from: 'diyetkocumapp@gmail.com',
        to: to,
        subject: subject,
        text: text
    };

    transporter.sendMail(mailOptions, function(error, info){
        if (error) {
            console.log(error);
        } else {
            console.log('Email sent: ' + info.response);
        }
    }); 
}   