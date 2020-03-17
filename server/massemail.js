var email = require('./email');

var emailList = {

}

sendMassEmailInternal = function (name, emailAddress) {
    var html = `Merhaba ${name},
<br />
<br />
Koronavirüs🦠 kapımıza dayanmışken danışanlarımı online çalışma sistemine nasıl geçiririm diye düşünüyorsan Diyet Koçum dijital asistanın hizmetinde. 
<br />
<br />
Sana özel hazırlanmış kişisel web sayfanı 5 dakika içerisinde tamamla, danışanlarına dijital anamnez formu gönder ve ölçümleri kolayca takip et.
<br />
<br />
➡️ Hemen şimdi denemek için https://diyetkocum.net
<br />
<br />
Daha fazla bilgi almak için bize bu e-postaya cevap göndererek ulaşabilirsin.
<br />
<br />
Teşekkürler 🙏
<br />
Diyet Koçum Ailesi
<br />
<br />
<img src="https://diyetkocum.net/api/v1/tracking/korona/${emailAddress}" height="1" width="1">`

  email.sendEmail(emailAddress, '', `Koronavirüs ve Online Diyet`, undefined, html)
}

exports.sendMassEmail = function () {
    Object.keys(emailList).forEach( (name) => {
        sendMassEmailInternal(name, emailList[name])
    })
}