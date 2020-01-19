var nodemailer = require('nodemailer');

console.log(process.env.EMAIL_PASS)

var transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'diyetkocumapp@gmail.com',
    pass: process.env.EMAIL_PASS
  }
});


exports.sendEmail = function (to, subject, text) {
    var mailOptions = {
        from: 'diyetkocumapp@gmail.com',
        to: to,
        subject: subject,
        text: text
    };
    
    console.log(mailOptions)

    transporter.sendMail(mailOptions, function(error, info){
        if (error) {
            console.log(error);
        } else {
            console.log('Email sent: ' + info.response);
        }
    }); 
}   