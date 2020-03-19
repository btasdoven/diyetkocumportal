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
<img src="https://diyetkocum.net/api/v1/tracking/korona2/${emailAddress}/img.gif" height="1" width="1">`

  return email.sendEmail(emailAddress, '', `Koronavirüs ve Online Diyet`, undefined, html)
}

var failed = {}

var sendEmailSingle = function (name, email, i) {
    return new Promise( (resolve, reject) => {
        setTimeout(() => {
            sendMassEmailInternal(name, email)
                .then(() => resolve({[email]: true}))
                .catch((e) => {
                    resolve({[email]: e})
                });
        },
        i * 10000)
    });
}

exports.sendMassEmail = function () {
    var proms = []
    Object.keys(emailList).forEach( (name, idx) => {
        proms.push(sendEmailSingle(name, emailList[name], idx));
    })

    return Promise.all(proms);
}