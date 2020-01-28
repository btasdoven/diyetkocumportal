const storage = require('node-persist');
const stringHash = require("string-hash");
const email = require('./email')
const moment = require("moment")
require('moment/locale/tr');
moment.locale("tr")

const rows = {
  0: {
    'links': { },
    'users': {
      'demo': { id: 'demo', username: 'demo', name: 'Diyet Koçum Test', password: '1234', email: 'demo@diyetkocum.net', url: '/static/favicon.png' },
      'dyt.kubra_aydin': { id: 'dyt.kubra_aydin', username: 'dyt.kubra_aydin', name: 'Kübra Aydın', password: '1234', email: '', url: 'https://instagram.fcxh3-1.fna.fbcdn.net/v/t51.2885-19/s150x150/79369500_2619425271482161_1159096052670791680_n.jpg?_nc_ht=instagram.fcxh3-1.fna.fbcdn.net&_nc_ohc=_ZSwjUzpLQcAX-ZZBKU&oh=29310039c3379c1e71f5e6d008fc525d&oe=5E98B832' },
      'dyt_ezelkavadar': { id: 'dyt_ezelkavadar', username: 'dyt_ezelkavadar', name: 'Ezel Kavadar', password: '1234', email: 'diyetisyenezelkavadar@gmail.com', url: 'https://scontent-sea1-1.cdninstagram.com/v/t51.2885-19/s320x320/65535962_411795416090543_708510732999720960_n.jpg?_nc_ht=scontent-sea1-1.cdninstagram.com&_nc_ohc=-CRizYY6VPwAX82G5qH&oh=75c5e5b1629d904afafbe3da693681bc&oe=5E9FC51C' },
      'aysuutasdovenn': { id: 'aysuutasdovenn', username: 'aysuutasdovenn', name: 'Aysu Taşdöven', password: '1234', email: 'atasdoven@gmail.com', url: 'https://scontent-sea1-1.cdninstagram.com/v/t51.2885-19/s320x320/80809330_475914226417245_2272595860648886272_n.jpg?_nc_ht=scontent-sea1-1.cdninstagram.com&_nc_ohc=bgrJOAR0sngAX__AfXL&oh=2bf9d7a3818beae4a9aa07cd92d8af1d&oe=5E9A210C' },
      'diyetisyen_annee': { id: 'diyetisyen_annee', username: 'diyetisyen_annee', name: 'Öykü Ada', password: '1234', email: '', url: 'https://scontent-sea1-1.cdninstagram.com/v/t51.2885-19/s320x320/77114870_1381587828677371_3432593624523603968_n.jpg?_nc_ht=scontent-sea1-1.cdninstagram.com&_nc_ohc=uWKRbzKgZagAX9NiM6E&oh=09819f7ec10a671ccb96b40d38c8add8&oe=5EDAE4E0' },
      'dyt.merveakyuzlu': { id: 'dyt.merveakyuzlu', username: 'dyt.merveakyuzlu', name: 'Merve Akar Akyüzlü', password: '1234', email: 'dyt.merveakyuzlu@gmail.com', url: 'https://scontent-sea1-1.cdninstagram.com/v/t51.2885-19/s320x320/69278902_2663850470402012_3198876360567160832_n.jpg?_nc_ht=scontent-sea1-1.cdninstagram.com&_nc_ohc=5aRHGmwWMWAAX_dCoMO&oh=debc845dfbe2ef3676b3d3b63b043e98&oe=5EBB038C' },
      'diyetisyenozgebasin': { id: 'diyetisyenozgebasin', username: 'diyetisyenozgebasin', name: 'Özge Basın Bayram', password: '1234', email: 'ozgebasin@gmail.com', url: 'https://instagram.fcxh3-1.fna.fbcdn.net/v/t51.2885-19/s150x150/69782525_377991819815997_651954444732203008_n.jpg?_nc_ht=instagram.fcxh3-1.fna.fbcdn.net&_nc_ohc=GA5bcxJRiIYAX85qLBu&oh=a2ec5f1723f1c9062753b638110f318d&oe=5E9773EA' },
      'ilaydiet': { id: 'ilaydiet', username: 'ilaydiet', name: 'İlayda Yaluç', password: '1234', email: '', url: 'https://instagram.fyvr2-1.fna.fbcdn.net/v/t51.2885-19/s150x150/28752934_1810220632620925_4794170494410555392_n.jpg?_nc_ht=instagram.fyvr2-1.fna.fbcdn.net&_nc_ohc=Y0E5jG7qe7AAX93uO9E&oh=61b42603c0290bdd4a88b5bb0e05ee69&oe=5EA87149' },
      'diyetisyendoyranli': { id: 'diyetisyendoyranli', username: 'diyetisyendoyranli', name: 'Merve Doyranlı', password: '1234', email: 'doyranlimerve@gmail.com', url: 'https://instagram.fyvr2-1.fna.fbcdn.net/v/t51.2885-19/s150x150/62023617_2268347290160591_911668419881861120_n.jpg?_nc_ht=instagram.fyvr2-1.fna.fbcdn.net&_nc_ohc=XrhwjgFngBgAX9MRmJ8&oh=d785b38c984efe16e3a7eb8eef59da7a&oe=5E9A02E5' },
    },
  },
  // model diyetisyen
  //
  1: {
    profile: {
      '08:00 - 08:30': true,
      '08:30 - 09:00': true,
      '09:00 - 09:30': true,
      '09:30 - 10:00': true,
      '10:00 - 10:30': true,
      '10:30 - 11:00': true,
      '11:00 - 11:30': true,
      '11:30 - 12:00': true,
      '13:00 - 13:30': true,
      '13:30 - 14:00': true,
      '14:00 - 14:30': true,
      '14:30 - 15:00': true,
      '15:00 - 15:30': true,
      '15:30 - 16:00': true,
      '16:00 - 16:30': true,
      '16:30 - 17:00': true,
      'Pazartesi': true,
      'Salı': true,
      'Çarşamba': true,
      'Perşembe': true,
      'Cuma': true,
      'online_diyet': true
    }
  },
  'demo': {
    profile: {
      '08:00 - 08:30': true,
      '08:30 - 09:00': true,
      '09:00 - 09:30': true,
      '09:30 - 10:00': true,
      '10:00 - 10:30': true,
      '10:30 - 11:00': true,
      '11:00 - 11:30': true,
      '11:30 - 12:00': true,
      '13:00 - 13:30': true,
      '13:30 - 14:00': true,
      '14:00 - 14:30': true,
      '14:30 - 15:00': true,
      '15:00 - 15:30': true,
      '15:30 - 16:00': true,
      '16:00 - 16:30': true,
      '16:30 - 17:00': true,
      'Pazartesi': true,
      'Salı': true,
      'Çarşamba': true,
      'Perşembe': true,
      'Cuma': true,
      name: 'Diyet Koçum Test', 
      email: 'demo@diyetkocum.net', 
      url: '/static/favicon.png'
    },
    messagePreviews: {
      'Bilgin Aktaş': {
        name: 'Bilgin Aktaş', 
        username: 'Bilgin Aktaş', 
        unread: 0, 
        mesaj: 'Çok teşekkür ederim diyetisyen hanım 💙 lay lay lommm', 
        aktivite: '5:44 PM', 
        url: 'https://material-ui.com/static/images/avatar/1.jpg'
      },
      'Cemil Burakoğlu': {
        name: 'Cemil Burakoğlu', 
        username: 'Cemil Burakoğlu', 
        unread: 4, 
        mesaj: 'Sizce nasil olur?', 
        aktivite: '7:12 PM', 
        url: 'https://material-ui.com/static/images/avatar/2.jpg'
      },
      'Sibel Cemre Günaydın': {
        name: 'Sibel Cemre Günaydın', 
        username: 'Sibel Cemre Günaydın', 
        unread: 3,
        mesaj: 'Iyi ki varsiniz 😇', 
        aktivite: '1/6/20', 
        url: 'https://material-ui.com/static/images/avatar/3.jpg'
      },
      'Halil Sahinde': {
        name: 'Halil Sahinde', 
        username: 'Halil Sahinde', 
        unread: 0, 
        mesaj: 'Tam olarak 2 kg fark etmis 😋', 
        aktivite: '12/23/19', 
        url: 'https://material-ui.com/static/images/avatar/4.jpg'
      },
    },

    danisanPreviews: {
      'Bilgin Aktaş': {
        name: 'Bilgin Aktaş', 
        username: 'Bilgin Aktaş', 
        aktivite: '5:44 PM', 
        kilo: '86',
        boy: '184',
        yas: '24',
        url: 'https://material-ui.com/static/images/avatar/1.jpg'
      },
      'Cemil Burakoğlu': {
        name: 'Cemil Burakoğlu', 
        username: 'Cemil Burakoğlu',
        aktivite: '7:12 PM', 
        kilo: '91',
        boy: '181',
        yas: '21',
        url: 'https://material-ui.com/static/images/avatar/2.jpg'
      },
      'Sibel Cemre Günaydın': {
        name: 'Sibel Cemre Günaydın', 
        username: 'Sibel Cemre Günaydın', 
        aktivite: '1/6/20', 
        kilo: '73',
        boy: '164',
        yas: '28',
        url: 'https://material-ui.com/static/images/avatar/3.jpg'
      },
      'Halil Sahinde': {
        name: 'Halil Sahinde', 
        username: 'Halil Sahinde', 
        aktivite: '12/23/19', 
        kilo: '121',
        boy: '187',
        yas: '36',
        url: 'https://material-ui.com/static/images/avatar/4.jpg'
      },
      'Görkem Duymaz': {
        name: 'Görkem Duymaz', 
        username: 'Görkem Duymaz', 
        aktivite: '12/12/19', 
        kilo: '94',
        boy: '179',
        yas: '29',
        url: 'https://material-ui.com/static/images/avatar/5.jpg'
      }
    },

    danisans: {
      'Bilgin Aktaş': {
        profile: {
          name: 'Bilgin Aktaş', 
          email: 'bilginaktas@gmail.com',
          tel: '505 376 58 90',
          kilo: '86',
          boy: '184',
          yas: '24',
          url: 'https://material-ui.com/static/images/avatar/1.jpg'
        }
      },
      'Cemil Burakoğlu': {
        profile: {
          name: 'Cemil Burakoğlu', 
          email: 'cemilburakoglu@gmail.com',
          tel: '535 862 12 44',
          kilo: '91',
          boy: '181',
          yas: '21',
          url: 'https://material-ui.com/static/images/avatar/2.jpg'
        }
      },
      'Sibel Cemre Günaydın': {
        profile: {
          name: 'Sibel Cemre Günaydın', 
          email: 's.cemregunaydin@gmail.com',
          tel: '554 940 18 74',
          kilo: '73',
          boy: '164',
          yas: '28',
          url: 'https://material-ui.com/static/images/avatar/3.jpg'
        }
      },
      'Halil Sahinde': {
        profile: {
          name: 'Halil Sahinde',
          url: 'https://material-ui.com/static/images/avatar/4.jpg',
          email: 'halilsahinde@gmail.com',
          tel: '532 375 34 22',
          kilo: '91',
          boy: '165',
          birthday: '10.09.1985',
        },
        notes: {
          notes: "Danışan son haftaki listeye pek uymadı\n\nHaftaya detoks ver"
        }
      },
      'Görkem Duymaz': {
        profile: {
          name: 'Görkem Duymaz',
          url: 'https://material-ui.com/static/images/avatar/5.jpg',
          email: 'gorkemduymaz@gmail.com',
          tel: '505 868 12 49',
          kilo: '104',
          boy: '184',
          birthday: '11.02.1991',
        }
      }
    }
  }
};

async function asyncForEach(array, callback) {
  for (let index = 0; index < array.length; index++) {
    await callback(array[index], index, array);
  }
}


var taskInitStg = () => {
  return storage.init({ dir: 'stg', logging: true })
};

var taskResetStg = () => {
  if (process.env.PORT == undefined) {
    // localhost testing. reinit the db
    //
    // return storage.clear().then(() =>
    //   asyncForEach(Object.keys(users), async (id) => {
    //     await storage.setItem(id.toString(), rows[id] || {});
    // }));
  }

  return storage.getItem('0').then((data) => {
    console.log(data)

    if (data == undefined) {
      return storage.setItem('0', rows[0])
    }
    
    rows[0] = data
    return Promise.resolve()
  });
};

var taskInitNewDietitians = () => {
  
  return asyncForEach(Object.keys(rows[0].users), async (id) => {
    var r = await storage.getItem(id.toString());
    if (JSON.stringify(r) == '{}' || r == undefined) {
      r = { 
        profile: {
          ...rows[1].profile 
        }
      };
      
      r.profile.email = rows[0].users[id].email
      r.profile.name = rows[0].users[id].name
      r.profile.url = rows[0].users[id].url
      return storage.setItem(id.toString(), r);
    }

    return Promise.resolve()
  });
}

var taskInitRows = () => {
  return storage.forEach(async function(datum) {
    rows[datum.key] = datum.value;
  });
}

var taskUpgradeStg = () => {
  return asyncForEach(Object.keys(rows), async (id) => {
    if (id == 0 || id == 1) {
      return Promise.resolve()
    }

    var changed = false;

    console.log(id)

    if (rows[id].profile != undefined && 
        rows[id].profile.online_diyet == undefined) {
      rows[id].profile.online_diyet = true
      changed = true
    }
    
    if (rows[id].profile != undefined && 
        rows[id].profile.url == undefined) {
      rows[id].profile.url = rows[0].users[id].url
      changed = true
    }
    
    console.log(changed)

    if (!changed) {
      return Promise.resolve()
    }

    console.log(id, rows[id])
    return storage.setItem(id.toString(), rows[id]);
  });
}


function start() {
  return startAsync()
}

async function startAsync() {
  console.log('begin start')

  var tasks = [
    taskInitStg,
    taskResetStg,
    taskInitNewDietitians,
    taskInitRows,
    taskUpgradeStg,
  ];

  return new Promise((resolve, reject) => {
    var i = 0;
    tasks
      .reduce(
        (promiseChain, currentTask) => {
          return promiseChain.then(chainResults => {
            console.log("executing task", ++i)
            return currentTask().then(currentResult =>
              [ ...chainResults, currentResult ]
            )
          });
        }, 
        Promise.resolve([])
      ).then(arrayOfResults => {
        console.log('end start')
        resolve(arrayOfResults)
      })})
}

var loaded = false;
console.log('begin')
start().then(() => {
  console.log('loaded')
  loaded = true
});
console.log('end')

exports.isLoaded = () => loaded;

exports.loginUser = function(uname, pwd) {
  console.log('loginUser');
  console.log(uname)

  for (let id in rows[0].users) {
    var user = rows[0].users[id];
    if (uname == user.username && pwd == user.password) {
      console.log(user)
      if (user.status == 'pending') {
        console.log('pending user')
        return { error: 'Bu kullanıcının üyeliği daha aktif edilmedi.'};
      }

      // First login?
      //
      if (rows[id] == undefined) {
        rows[id] = { ...rows[1] };
        storage.setItem(id.toString(), rows[id]);
      }

      if (rows[id].profile.email == undefined) {
        rows[id].profile.email = user.email;
        storage.setItem(id.toString(), rows[id]);
      }

      return {user: user}
    }
  }

  return { error: 'Yanlış kullanıcı adı veya şifre.'};
}

exports.signUpUser = function(uname, userInfo) {
  console.log('signupUser');
  console.log(uname, userInfo)

  uname = uname.trim();
  
  if (rows[uname] != undefined ||
      rows[0].users[uname] != undefined) {
    return { error: 'Bu kullanıcı adına ait bir üyelik bulunmaktadır.'};
  }

  var r = { 
    profile: {
      ...rows[1].profile 
    }
  };
  
  r.profile.email = userInfo.email
  r.profile.name = userInfo.name
  r.profile.url = userInfo.url
  r.profile.tel = userInfo.tel
  rows[uname] = r;

  storage.setItem(uname, rows[uname]);

  rows[0].users[uname] = { 
    id: uname, 
    username: uname, 
    name: userInfo.name, 
    password: userInfo.password, 
    email: userInfo.email, 
    tel: userInfo.tel,
    url: userInfo.url,
    status: 'pending'
  }

  storage.setItem('0', rows[0]);

  var titleSuffix = process.env.NODE_ENV !== 'production' 
    ? "TEST - " + uname + " - "
    : "PROD - " + uname + " - "

  email.sendEmail('newmessage@diyetkocum.net', titleSuffix + 'new user created', JSON.stringify(rows[0].users[uname]))

  return { user: userInfo }
}

exports.getLinkInfo = function (linkId) {
  console.log('getLinkInfo');
  console.log(linkId)
  console.log(rows[0].links[linkId])
  return rows[0].links[linkId];
}

exports.getDietitianAppointmentInfo = function (userId, date) {
  console.log('getDietitianAppointmentInfo');
  console.log(userId, date)

  if (rows[userId].appointments == undefined ||
    (date != undefined && rows[userId].appointments[date] == undefined))
    return {};

  console.log(rows[userId].appointments)

  if (date == undefined) {
    return rows[userId].appointments;
  }

  return rows[userId].appointments[date];
}

exports.putDietitianAppointmentInfo = function (userId, date, time, values) {
  console.log('putDietitianAppointmentInfo');
  console.log(userId, date, time);

  values.info.name = values.info.name.trim();

  if (rows[userId].appointments == undefined) {
      rows[userId].appointments = {}
  }

  if (rows[userId].appointments[date] == undefined) {
    rows[userId].appointments[date] = {}
  }

  var oldValue = rows[userId].appointments[date][time];

  rows[userId].appointments[date][time] = values;

  if (values.step == 3) {
    // Link gonder
    //
    var msg = {
      id: Date.now(), 
      sentByDietitian: true,
      danisanUserName: values.info.name,
      message: `Merhaba ${values.info.name} 👋 diyet programı yazabilmek için senden sağlık geçmişini, kan tahlilini ve vücüt ölcümlerini rica ediyorum`,
      type: 'text',
    }
    exports.addDanisanMessage(userId, values.info.name, msg.id, msg)

    var msg2 = {...msg}
    msg2.id = Date.now()
    msg2.message = 'Bu siteyi kullanarak bilgilerin hepsini girebilirsin. Bilgileri girdikten sonra bana buradan haber verirsen ben de programı yazabilirim'
    exports.addDanisanMessage(userId, values.info.name, msg2.id, msg2)

    var msg3 = {...msg}
    msg3.id = Date.now()
    msg3.message = 'Şimdiden teşekkür ederim 🙏'
    exports.addDanisanMessage(userId, values.info.name, msg3.id, msg3)
  }

  const ordered = {};
  Object.keys(rows[userId].appointments[date]).sort().forEach(function(key) {
    ordered[key] = rows[userId].appointments[date][key];
  });

  rows[userId].appointments[date] = ordered;

  var titleSuffix = process.env.NODE_ENV !== 'production' 
    ? "TEST - " + userId + " - " + values.info.name + " - "
    : "PROD - " + userId + " - " + values.info.name + " - "

  if (values.status == 'pending') {

    var type = values.type == 'onlinediyet' ? 'Online diyet' : 'Yüz yüze randevu'
    var content = `
Merhaba ${rows[userId].profile.name},

Aşağıda belirtilen gün ve tarih için ${values.info.name} isminde bir danışan tarafından randevu isteği gönderildi.

Kabul etmek ya da reddetmek için aşağıdaki linke tıklayabilirsin:

https://diyetkocum.net/r
 
Randevu tipi: ${type}
Randevu günü: ${moment(date).format("DD MMMM YYYY")}
Randevu saati: ${time}
Danışan e-posta adresi:  ${values.info.email}
Danışan telefon numarası: ${values.info.tel}
Danışan doğum tarihi: ${moment(values.info.birthday).format("DD MMMM YYYY")}
Danışan ek bilgiler: ${values.info.notes || ''}

Teşekkürler,
Diyet Koçum Ailesi`

    console.log(rows[userId].profile.email)
    email.sendEmail(rows[userId].profile.email, 'Yeni randevu isteği', content)
    email.sendEmail('newmessage@diyetkocum.net', titleSuffix + 'Yeni randevu isteği', content)
  } 
  else if (oldValue.status == 'pending' && (values.status == 'confirmed' || values.status == 'rejected')) {
    if (values.type != 'onlinediyet') {
      var statusTxt = values.status == 'confirmed' ? 'onaylanmıştır' : 'reddedilmiştir'
      var content = `
Merhaba ${values.info.name},

Aşağıda belirtilen gün ve tarih için diyetisyen ${rows[userId].profile.name} ile randevunuz diyetisyeniniz tarafından ${statusTxt}.
  
Aşağıdaki linke tıklayarak diyetisyeninizin sizden istediği beslenme alışkanlıkları, kan tahlili ve vücut ölçümü bilgilerinizi girebilirsiniz.

https://diyetkocum.net/l/${stringHash(userId + values.info.name)}
    
Randevu günü: ${moment(date).format("DD MMMM YYYY")}
Randevu saati: ${time}
${rows[userId].profile.address ? "Adres: " + rows[userId].profile.address : ''}

Teşekkürler,
Diyet Koçum Ailesi`   

      console.log(values.info.email)
      email.sendEmail(values.info.email, 'Randevunuz ' + statusTxt, content)
      email.sendEmail('newmessage@diyetkocum.net', titleSuffix + 'Randevunuz ' + statusTxt, content)   
    }
    else {
      var statusTxt = values.status == 'confirmed' ? 'onaylanmıştır' : 'reddedilmiştir'
      var content = `
Merhaba ${values.info.name},

Diyetisyen ${rows[userId].profile.name} ile olan online diyet başvurunuz diyetisyeniniz tarafından ${statusTxt}. Diyetisyeniniz yakında sizinle iletişime geçecektir.
  
Aşağıdaki linke tıklayarak diyetisyeninizin sizden istediği beslenme alışkanlıkları, kan tahlili ve vücut ölçümü bilgilerinizi girebilirsiniz.

https://diyetkocum.net/l/${stringHash(userId + values.info.name)}

Teşekkürler,
Diyet Koçum Ailesi`  

      console.log(values.info.email)
      email.sendEmail(values.info.email, 'Online diyet isteğiniz ' + statusTxt, content)
      email.sendEmail('newmessage@diyetkocum.net', titleSuffix + 'Online diyet isteğiniz ' + statusTxt, content)   
    }
  }

  if (oldValue.status == 'pending' && values.status == 'confirmed') {
    exports.postAddDanisan(userId, values.info.name, {
      name: values.info.name,
      email: values.info.email,
      tel: values.info.tel,
      birthday: values.info.birthday,
      kilo: values.info.kilo,
      boy: values.info.boy,
      cinsiyet: values.info.cinsiyet,
    })
  } else {
    // postAddDanisan will set this item. Don't set it twice to avoid concurrence issues on the storage.
    //
    storage.setItem(userId, rows[userId]);
  }
}

exports.getMessagePreviews = function (userId) {
  console.log('getMessagePreviews');

  return rows[userId].messagePreviews;
}

exports.getDanisanPreviews = function (userId) {
  console.log('getDanisanPreviews');

  return rows[userId].danisanPreviews;
}

exports.getDietitianProfile = function (userId) {
  console.log('getDietitianProfile');

  return rows[userId].profile || {};
}

exports.putDietitianProfile = function (userId, dietitianProfile) {
  console.log('putDietitianProfile');
  console.log(dietitianProfile);

  if (rows[userId].profile == undefined) {
    rows[userId].profile = dietitianProfile;
  } else {
    rows[userId].profile = {
      ...rows[userId].profile,
      ...dietitianProfile
    };
  }

  storage.setItem(userId, rows[userId]);
}

exports.getDanisanProfile = function (userId, danisanUserName) {
  console.log('getDanisanProfile');
  console.log(danisanUserName);

  if (rows[userId].danisans == undefined ||
      rows[userId].danisans[danisanUserName] == undefined ||
      rows[userId].danisans[danisanUserName].profile == undefined) {
    return {};
  }

  rows[userId].danisans[danisanUserName].profile.hash = stringHash(userId + danisanUserName)
  return rows[userId].danisans[danisanUserName].profile;
}

exports.putDanisanProfile = function (userId, danisanUserName, danisanProfile) {
  console.log('putDanisanProfile');
  console.log(danisanUserName);
  console.log(danisanProfile);

  if (rows[userId].danisans == undefined ||
      rows[userId].danisans[danisanUserName] == undefined) {
    rows[userId].danisans[danisanUserName] = { };
  }

  var hash = stringHash(userId + danisanUserName)
  rows[userId].danisans[danisanUserName].profile = danisanProfile;
  rows[userId].danisans[danisanUserName].profile.hash = hash

  storage.setItem(userId, rows[userId]);

  console.log(rows[0].links[hash])
  if (rows[0].links[hash] == undefined) {
    rows[0].links[hash] = {
      userId: userId,
      danisanUserName: danisanUserName
    }

    storage.setItem('0', rows[0])
  }
}

exports.getDanisanMessages = function (userId, danisanUserName) {
  console.log('getDanisanMessages');

  if (rows[userId].danisans == undefined ||
      rows[userId].danisans[danisanUserName] == undefined) {
    return { };
  }

  return rows[userId].danisans[danisanUserName].messages;
}

exports.readDanisanMessages = function (userId, danisanUserName) {
  console.log('readDanisanMessages');

  rows[userId].messagePreviews[danisanUserName].unread = 0;

  storage.setItem(userId, rows[userId]);
}

exports.addDanisanMessage = function (userId, danisanUserName, messageId, message) {
  console.log('addDanisanMessage');
  console.log(message);

  if (rows[userId].danisans == undefined)
    rows[userId].danisans = {}

  if (rows[userId].danisans[danisanUserName] == undefined)
    rows[userId].danisans[danisanUserName] = {}

  if (rows[userId].danisans[danisanUserName].messages == undefined)
    rows[userId].danisans[danisanUserName].messages = {}

  rows[userId].danisans[danisanUserName].messages[messageId] = message

  if (rows[userId].messagePreviews == undefined)
    rows[userId].messagePreviews = {}

  if (rows[userId].messagePreviews[danisanUserName] == undefined)
    rows[userId].messagePreviews[danisanUserName] = { 
      unread: 0,
      danisanUrl: rows[userId].danisanPreviews[danisanUserName].url,
      dietitianUrl: rows[userId].profile.url,
    }

  rows[userId].messagePreviews[danisanUserName].unread += message.sentByDietitian == true ? 0 : 1;
  rows[userId].messagePreviews[danisanUserName].lastMessage = message;

  storage.setItem(userId, rows[userId]);
}

exports.getDanisanMeasurements = function (userId, danisanUserName) {
  console.log('getDanisanMeasurements');
  console.log(danisanUserName);

  if (rows[userId].danisans == undefined ||
      rows[userId].danisans[danisanUserName] == undefined) {
    return { };
  }

  return rows[userId].danisans[danisanUserName].measurements;
}

exports.addDanisanMeasurement = function (userId, danisanUserName, danisanMeasurement) {
  console.log('addDanisanMeasurement');
  console.log(danisanUserName);
  console.log(danisanMeasurement);

  if (rows[userId].danisans == undefined ||
      rows[userId].danisans[danisanUserName] == undefined) {
    rows[userId].danisans[danisanUserName] = { };
  }

  if (rows[userId].danisans[danisanUserName].measurements == undefined) {
    rows[userId].danisans[danisanUserName].measurements = {}
  }

  if (rows[userId].danisans[danisanUserName].measurements[danisanMeasurement.olcum_tarihi] == undefined) {
    rows[userId].danisans[danisanUserName].measurements[danisanMeasurement.olcum_tarihi] = {}
  }

  rows[userId].danisans[danisanUserName].measurements[danisanMeasurement.olcum_tarihi][Date.now()] = danisanMeasurement;

  const ordered = {};
  Object.keys(rows[userId].danisans[danisanUserName].measurements[danisanMeasurement.olcum_tarihi]).sort().forEach(function(key) {
    ordered[key] = rows[userId].danisans[danisanUserName].measurements[danisanMeasurement.olcum_tarihi][key];
  });

  rows[userId].danisans[danisanUserName].measurements[danisanMeasurement.olcum_tarihi] = ordered;

  const ordered2 = {};
  Object.keys(rows[userId].danisans[danisanUserName].measurements).sort().reverse().forEach(function(key) {
    ordered2[key] = rows[userId].danisans[danisanUserName].measurements[key];
  });

  rows[userId].danisans[danisanUserName].measurements = ordered2;

  storage.setItem(userId, rows[userId]);
}

exports.getDanisanNotes = function (userId, danisanUserName) {
  console.log('getDanisanNotes');
  console.log(danisanUserName);

  if (rows[userId].danisans == undefined ||
      rows[userId].danisans[danisanUserName] == undefined) {
    return { notes: ''};
  }

  return rows[userId].danisans[danisanUserName].notes;
}

exports.putDanisanNotes = function (userId, danisanUserName, danisanNotes) {
  console.log('putDanisanNotes');
  console.log(danisanUserName);
  console.log(danisanNotes);

  if (rows[userId].danisans == undefined ||
      rows[userId].danisans[danisanUserName] == undefined) {
    rows[userId].danisans[danisanUserName] = { };
  }

  rows[userId].danisans[danisanUserName].notes = danisanNotes;

  storage.setItem(userId, rows[userId]);
}

exports.getDanisanFiles = function (userId, danisanUserName) {
  console.log('getDanisanFiles');
  console.log(danisanUserName);

  if (rows[userId] == undefined || 
      rows[userId].files == undefined ||
      rows[userId].files[danisanUserName] == undefined) {
    return { };
  }

  return rows[userId].files[danisanUserName];
}

exports.addDanisanFiles = function (userId, danisanUserName, file, type) {
  console.log('addDanisanFiles');
  console.log(danisanUserName);
  console.log(file)
  console.log(type)

  if (rows[userId].files == undefined) {
    rows[userId].files = { };
  }

  if (rows[userId].files[danisanUserName] == undefined) {
    rows[userId].files[danisanUserName] = {}
  }

  if (rows[userId].files[danisanUserName][type] == undefined) {
    rows[userId].files[danisanUserName][type] = {}
  }

  var now = Date.now()
  var day = moment(now).format('YYYYMMDD');

  if (rows[userId].files[danisanUserName][type][day] == undefined) {
    rows[userId].files[danisanUserName][type][day] = {}
  }

  rows[userId].files[danisanUserName][type][day][now] = {
    encoding: file.encoding,
    mimetype: file.mimetype,
    path: 'api/v1/public/' + file.filename,
    name: file.originalname,
    type: type,
  };

  const ordered = {};
  Object.keys(rows[userId].files[danisanUserName][type][day]).sort().forEach(function(key) {
    ordered[key] = rows[userId].files[danisanUserName][type][day][key];
  });

  rows[userId].files[danisanUserName][type][day] = ordered;

  storage.setItem(userId, rows[userId]);
}

exports.getDanisanDietList = function (userId, danisanUserName) {
  console.log('getDanisanDietList');
  console.log(danisanUserName);

  if (rows[userId].danisans == undefined ||
      rows[userId].danisans[danisanUserName] == undefined ||
      rows[userId].danisans[danisanUserName].dietList == undefined) {
    return { hash: stringHash(userId + danisanUserName) };
  }

  rows[userId].danisans[danisanUserName].dietList.hash = stringHash(userId + danisanUserName)

  return rows[userId].danisans[danisanUserName].dietList;
}

exports.putDanisanDietList = function (userId, danisanUserName, danisanDietList) {
  console.log('putDanisanDietList');
  console.log(danisanUserName);
  console.log(danisanDietList);

  if (rows[userId].danisans == undefined ||
      rows[userId].danisans[danisanUserName] == undefined) {
    rows[userId].danisans[danisanUserName] = { };
  }

  rows[userId].danisans[danisanUserName].dietList = danisanDietList;
  rows[userId].danisans[danisanUserName].dietList.hash = stringHash(userId + danisanUserName)

  storage.setItem(userId, rows[userId]);
}

exports.postAddDanisan = function (userId, danisanUserName, danisanPreview) {
  console.log('postAddDanisan')
  console.log(danisanUserName)
  console.log(danisanPreview);

  if (rows[userId].danisanPreviews == undefined) {
    rows[userId].danisanPreviews = {
      [danisanUserName]: danisanPreview
    };
  } else if (rows[userId].danisanPreviews[danisanUserName] == undefined) {
    rows[userId].danisanPreviews[danisanUserName]= danisanPreview;
  }

  if (rows[userId].danisans == undefined) {
    rows[userId].danisans = {
      [danisanUserName]: { profile: {} }
    };
  } else if (rows[userId].danisans[danisanUserName] == undefined) {
    rows[userId].danisans[danisanUserName] = { profile: {} }
  }

  rows[userId].danisans[danisanUserName].profile = {
    ...rows[userId].danisans[danisanUserName].profile,
    ...danisanPreview, 
  };

  rows[0].links[stringHash(userId + danisanUserName)] = {
    userId: userId,
    danisanUserName: danisanUserName
  }

  storage.setItem(userId, rows[userId]);
  storage.setItem('0', rows[0]);
}