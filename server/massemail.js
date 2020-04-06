var email = require('./email');

const getNameHtml = (o, text) => {
    return `<b>${text}</b>`

    if (o.fullname == text) {
        return `<b>${text}</b>`
    }

    return text;
}

sendMassEmailInternal = function (o, emailAddress) {
//     var html = `Merhaba ${name},
// <br />
// <br />
// Koronavirüs🦠 kapımıza dayanmışken danışanlarımı online çalışma sistemine nasıl geçiririm diye düşünüyorsan Diyet Koçum dijital asistanın hizmetinde. 
// <br />
// <br />
// Sana özel hazırlanmış kişisel web sayfanı 5 dakika içerisinde tamamla, danışanlarına dijital anamnez formu gönder ve ölçümleri kolayca takip et.
// <br />
// <br />
// ➡️ Hemen şimdi denemek için https://diyetkocum.net
// <br />
// <br />
// Daha fazla bilgi almak için bize bu e-postaya cevap göndererek ulaşabilirsin.
// <br />
// <br />
// Teşekkürler 🙏
// <br />
// Diyet Koçum Ailesi
// <br />
// <br />
// <img src="https://diyetkocum.net/api/v1/tracking/korona2/${emailAddress}/img.gif" height="1" width="1">`

var html = `Merhaba ${o.name},
<br />
<br />
Diyet Koçum'da her Pazartesi günü başlayıp her Pazar gecesi sona eren haftalık sıralamaya Diyet Koçum Haftanın Enleri denir. 
Diyet Koçum Haftanın Enleri her Pazartesi günü 10:00 saatinde önceki hafta yapılan işlemlere göre belirlenir ve üç çeşittir:
<br />
<ul>
	<li>Haftanın Profili En Çok Ziyaret Edilen Diyetisyenleri</li>
	<li>Haftanın En Çok Randevu Alan Diyetisyenleri</li>
	<li>Haftanın En Aktif Diyetisyenleri</li>
</ul>
Bu haftanın enlerine giren diyetisyenlerimiz 
${getNameHtml(o, 'Merve Doyranlı')}, 
${getNameHtml(o, 'Elif Bozyel')}, 
${getNameHtml(o, 'Aysu Taşdöven')}, 
${getNameHtml(o, 'Nida Çeliksoydan')}, 
${getNameHtml(o, 'Buse Doğan')}, 
${getNameHtml(o, 'Büşra Özyavuz')}, 
${getNameHtml(o, 'Aşkın Özdemir')}, 
${getNameHtml(o, 'Seda Nur Arslan')}, 
${getNameHtml(o, 'Betül Kıngır')}, 
${getNameHtml(o, 'Meltem Arslan')}, 
${getNameHtml(o, 'Elif Kubat')}, 
${getNameHtml(o, 'Aslıhan Şener')} ve 
${getNameHtml(o, 'Esma Kurt Güneş')}'i tebrik ederiz.
<br />
<br />
➡️ Listenın detaylarını görmek için: https://diyetkocum.net/enler
<br />
<br />
Sen de onümüzdeki hafta Diyet Koçum Haftanın Enleri listesinde yerini almak istersen 
Kişisel Sayfanı farklı platformlarda (Facebook, Twitter, Instagram gibi) paylaşarak görünülürlüğünü
arttırabilir ve profilinin daha çok ziyaret edilmesini sağlayabilirsin. Böylelikle, daha çok randevu alabilirsin.
Aynı zamanda Diyet Koçum üzerinden Yeni Danışan ekleyerek ve bu danışanlarının bilgilerini tamamlayarak hem istediğin zaman istediğin
yerden danışan bilgilerine ulaşabilir hem de Diyet Koçum Haftanın Enleri arasında yerini alabilirsin.
<br />
<br />
Teşekkürler 🙏
<br />
Diyet Koçum Ailesi
<br />
<br />
<img src="https://diyetkocum.net/api/v1/tracking/enler_20200406/${emailAddress}/img.gif" height="1" width="1">`

  return email.sendEmail(emailAddress, '', `Haftanın Enleri`, undefined, html)
}

var failed = {}

var sendEmailSingle = function (obj, email, i) {
    return new Promise( (resolve, reject) => {
        setTimeout(() => {
            sendMassEmailInternal(obj, email)
                .then(() => resolve({[email]: true}))
                .catch((e) => {
                    resolve({[email]: e})
                });
        },
        i * 10000)
    });
}

exports.sendMassEmail = function (emailList) {
    var proms = []
    Object.keys(emailList).forEach( (email, idx) => {
        proms.push(sendEmailSingle(emailList[email], email, idx));
    })

    return Promise.all(proms);
}