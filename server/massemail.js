var email = require('./email');

var emailList = {
    'Batuhan': 'btasdoven@gmail.com',
}

sendMassEmailInternal = function (name, emailAddress) {
    var html = `Merhaba ${name},
<br />
<br />
Koronavirüs🦠 kapımıza dayanmışken danışanlarımı nasıl online çalışma sistemine geçiririm diye düşünüyorsan Diyet Koçum dijital asistanın hizmetinde 😷 
<br />
<br />
Sana özel profesyonelce hazırlanmış kişisel web sayfanı 5 dakika içerisinde hazırla, danışanlarına dijital anamnez formu gönder ve ölçümleri kolayca takip et.
<br />
<br />
➡️ Hemen şimdi üye olmak için https://diyetkocum.net
<br />
<br />
Daha fazla bilgi almak için bize bu e-postaya cevap göndererek ulaşabilirsin.
<br />
<img src="https://localhost:4000/api/v1/tracking/korona/${emailAddress}" height="1" width="1">
<br />
Teşekkürler 🙏
<br />
Diyet Koçum Ailesi`

  email.sendEmail(emailAddress, '', `Koronavirüs ve online diyet`, undefined, html)
}

exports.sendMassEmail = function () {
    Object.keys(emailList).forEach( (name) => {
        sendMassEmailInternal(name, emailList[name])
    })
}