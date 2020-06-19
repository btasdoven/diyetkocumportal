const path = require('path')
const sharp = require('sharp');
const storage = require('node-persist');
const stringHash = require("string-hash");
const email = require('./email')
const massemail = require('./massemail')
const ig = require('./ig');
const png = require('./png');
const moment = require("moment")
const ipp = require('instagram-profile-picture');
const fs = require('fs');
const request = require('request');
const sitemap = require('./sitemap')

require('moment/locale/tr');
moment.locale("tr")

/**
 * Shuffles array in place.
 * @param {Array} a items An array containing the items.
 */
function shuffle(a) {
  var j, x, i;
  for (i = a.length - 1; i > 0; i--) {
      j = Math.floor(Math.random() * (i + 1));
      x = a[i];
      a[i] = a[j];
      a[j] = x;
  }
  return a;
}

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
      'online_diyet': true,
      'yuzyuze_diyet': true,
      'unvan': 'Diyetisyen',
      'ozgecmis': 'Merhaba! Siz değerli danışanlarıma zayıflama, kilo alma, kilo verme; hamilelikte, emzirme döneminde ve hastalıklarda beslenme, sporcu beslenmesi, vegan/vejetaryen/aralıklı oruç diyeti gibi farklı alanlarda sağlıklı beslenme ve diyet danışmanlığı hizmeti vermekteyim.',
      posts: {},
      shares: {},
      addresses: {},
      payments: {},
      pageViewCountPerDay: {},
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

var trackingStreams = []

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
    if (data == undefined) {
      return storage.setItem('0', rows[0])
    }
    
    rows[0] = data
    return Promise.resolve()
  });
};

var taskInitNewDietitians = () => {
  
  var userTasks = asyncForEach(Object.keys(rows[0].users), async (id) => {
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
      r.profile.tel = rows[0].users[id].tel
      r.profile.link = 'diyetkocum.net/' + id

      return storage.setItem(id.toString(), r);
    }

    //console.log(id)

    // if (r.profile.url != undefined && 
    //     r.profile.url.startsWith("http")) {
    //     return ipp.medium(id).then(instaProfileUrl => {
    //         instaProfileUrl = instaProfileUrl.replace(/\\u0026/g, '&')
    //         localProfilePath = `public/${id}/${id}.png`
    //         localProfilePath64 = `public/${id}/${id}-64x64.png`

    //         r.profile.url = `api/v1/${localProfilePath}`
    //         r.profile.url64 = `api/v1/${localProfilePath64}`
    //         rows[0].users[id].url = r.profile.url;

    //         ensureDirectoryExistence(localProfilePath)

    //         downloadAndSaveProfilePicture(instaProfileUrl, localProfilePath, () => {
    //             console.log('done ', localProfilePath);
                
    //             sharp(localProfilePath)
    //               .resize(64, 64) // width, height
    //               .toFile(localProfilePath.replace('.png', '-64x64.png'));
    //         })
            
    //         return storage.setItem(id.toString(), r);
    //     }).catch((err) => console.log(err, 'error at ' + id + ' ' + err));
    // }

    if (rows[0].users[id].premium_until == undefined) {
      createDate = moment(rows[0].users[id].create_date)
      rows[0].users[id].premium_until = createDate.add(2, 'months').format()
    }

    return Promise.resolve()
  });

  return userTasks.then(() => {
    console.log('all async user tasks done, setting 0')
    //console.log(rows[0])
    return storage.setItem('0', rows[0]);
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

    //console.log(id)

    // if (rows[id].profile == undefined) {
    //   rows[id].profile = {}
    //   changed = true
    // }

    // if (rows[id].profile.online_diyet == undefined) {
    //   rows[id].profile.online_diyet = true
    //   changed = true
    // }
    
    // if (rows[id].profile.url == undefined) {
    //   rows[id].profile.url = rows[0].users[id].url
    //   changed = true
    // }

    // if (rows[id].profile.unvan == undefined) {
    //   changed = true;
    //   rows[id].profile.unvan = 'Diyetisyen'
    // }

    // if (rows[id].profile.ozgecmis == undefined) {
    //   changed = true;
    //   rows[id].profile.ozgecmis = 'Merhaba! Siz değerli danışanlarıma zayıflama, kilo alma, kilo verme; hamilelikte, emzirme döneminde ve hastalıklarda beslenme, sporcu beslenmesi, vegan/vejetaryen/aralıklı oruç diyeti gibi farklı alanlarda sağlıklı beslenme ve diyet danışmanlığı hizmeti vermekteyim.'
    // }

    // if (rows[id].profile.link == undefined) {
    //   changed = true;
    //   rows[id].profile.link = 'https://diyetkocum.net/' + id;
    // }

    // if (rows[id].profile.create_date == undefined) {
    //   changed = true;
    //   rows[id].profile.create_date = rows[0].users[id].create_date || moment(Date.now()).format();
    // }

    // if (rows[id].profile.discounts == undefined) {
    //   rows[id].profile.discounts = [
    //     { title: "Yeni üyelere özel ilk ay ücretsiz", duration: "1 ay", startDate: moment(rows[id].profile.create_date).format(), endDate: moment(rows[id].profile.create_date).add(1, 'months').format() },
    //     { title: "Koronavirüs destek paketi", duration: "1 ay", startDate: moment(rows[id].profile.create_date).add(1, 'months').format(), endDate: moment(rows[id].profile.create_date).add(2, 'months').format() },
    //   ]
    //   rows[id].profile.premium_until = moment(rows[id].profile.create_date).add(2, 'months').format()
    // }

    // if (rows[id].profile.link.startsWith('diyetkocum.net/')) {
    //   changed = true;
    //   rows[id].profile.link = 'https://diyetkocum.net/' + id;
    // }

    // if (rows[id].profile.badges == undefined) {
    //   rows[id].profile.badges = {}
    //   changed = true;
    // }

    // if (rows[id].profile.posts == undefined) {
    //   rows[id].profile.posts = {}
    //   changed = true;
    // }

    // if (rows[id].profile.addresses == undefined) {
    //   changed = true;
    //   days = ["Pazartesi", "Salı", "Çarşamba", "Perşembe", "Cuma", "Cumartesi", "Pazar"]

    //   rows[id].profile.addresses = {};

    //   if (rows[id].profile.address != undefined) {
    //     rows[id].profile.addresses['address1'] = {
    //       address: rows[id].profile.address,
    //       city: undefined,
    //       latlng: { ...rows[id].profile.address_latlng, zoom: 17 },
    //       days: {},
    //     }

    //     days.forEach(d => {
    //       rows[id].profile.addresses['address1'].days[d] = rows[id].profile[d]
    //     })
    //   } 

    //   if (rows[id].profile.address_2 != undefined) {
    //     rows[id].profile.addresses['address2'] = {
    //       address: rows[id].profile.address_2,
    //       city: undefined,
    //       days: {},
    //     }

    //     days.forEach(d => {
    //       rows[id].profile.addresses['address2'].days[d] = rows[id].profile[d+"_2"]
    //     })
    //   }    
    // }

    if (rows[id].profile.address != undefined) {
      keys = ["address", "Pazartesi", "Salı", "Çarşamba", "Perşembe", "Cuma", "Cumartesi", "Pazar"]

      keys.forEach(k => {
        delete rows[id].profile[k]
        delete rows[id].profile[k+"_2"]
      })

      changed=true;
    }

    // const usernameEnCokZiyaret = [
    //   'diyetisyendoyranli',
    //   'dytelifbozyel',
    //   'aysuutasdovenn',
    //   'diyetisyennidaceliksoydan',
    //   'dyt.busedogan',
    // ]
    
    // const usernameEnCokRandevu = [
    //   'diyetiswomen',
    //   'diyetisyenasknn',
    //   'diyetisyendoyranli',
    //   'aysuutasdovenn',
    //   'dyt.sedaarslan',
    // ]
    
    // const usernameEnAktif = [
    //   'diyetisyenbetulkingir',
    //   'dyt.arslanmeltem',
    //   'dyt.elifnarcinkubat',
    //   'uzm.dyt.aslihansahiner',
    //   'dyt_esmakurtgunes',
    // ]

    // if (usernameEnCokZiyaret.indexOf(id) >= 0 && rows[id].profile.badges['20200329_ziyaret'] == undefined) {
    //   rows[id].profile.badges['20200329_ziyaret'] = { url: '/static/badges/ziyaret_20200329.png'}
    //   changed = true;
    // }

    // if (usernameEnCokRandevu.indexOf(id) >= 0  && rows[id].profile.badges['20200329_randevu'] == undefined) {
    //   changed = true;
    //   rows[id].profile.badges['20200329_randevu'] = { url: '/static/badges/randevu_20200329.png'}
    // }

    // if (usernameEnAktif.indexOf(id) >= 0 && rows[id].profile.badges['20200329_aktif'] == undefined) {
    //   changed = true;
    //   rows[id].profile.badges['20200329_aktif'] = { url: '/static/badges/aktif_20200329.png'}
    // }

    if (rows[id].profile.shares == undefined) {
      rows[id].profile.shares = {}
      changed = true
    }

    if (rows[id].profile.posts == undefined) {
      rows[id].profile.posts = {}
      changed = true
    }

    if (rows[id].profile.addresses == undefined) {
      rows[id].profile.addresses = {}
      changed = true
    }

    if (rows[id].profile.payments == undefined) {
      rows[id].profile.payments = {}
      changed = true
    }

    if (rows[id].profile.pageViewCountPerDay == undefined) {
      rows[id].profile.pageViewCountPerDay = {}
      changed = true
    }

    if (rows[id].profile.yuzyuze_diyet == undefined) {
      rows[id].profile.yuzyuze_diyet = true
      changed = true
    }

    Object.keys(rows[id].profile.posts).forEach(p => {
      if (rows[id].profile.posts[p].img != undefined) {
        var filename = path.basename(rows[id].profile.posts[p].img)
        rows[id].profile.posts[p].img = `api/v1/public/${id}/${filename}`
        changed = true
      }
    });
    
    if (rows[id].profile.uzmanlik_alanlari_v2 == undefined) {
      rows[id].profile.uzmanlik_alanlari_v2 = []
      changed = true
    }

    if (!changed) {
      return Promise.resolve()
    }

    console.log(id)
    return storage.setItem(id.toString(), rows[id]);
  });
}

var taskCreateSiteMap = () => {
  var dietitians = Object.keys(rows[0].users).filter(user => rows[0].users[user].isAdmin != true).map(user => { 
    return { dietitian: user}
  });

  var posts = []
  dietitians.forEach(user=> {
    Object.keys(rows[user.dietitian].profile.posts).forEach(p => posts.push({dietitian: user.dietitian, post: p}))
  })

  sitemap.createSiteMapXml(dietitians, posts);

  Object.keys(rows[0].users).filter(user => rows[0].users[user].isAdmin != true).forEach(u => {
    var profile = rows[u].profile

    if (profile.shares['cekilis'] == undefined) {
      png.drawCekilis(profile.unvan, profile.name, u).then((relFilePath) => {
        console.log(relFilePath)
        rows[u].profile.shares['cekilis'] = `api/v1/${relFilePath}`
        storage.setItem(u.toString(), rows[u]);
      })
    }
  });

  // Object.keys(rows[0].users).forEach(u => {
  //   Object.keys(rows[u].profile.posts).forEach(p => {
  //     if (rows[u].profile.posts[p].img != undefined) {
  //       var filename = path.basename(rows[u].profile.posts[p].img)
  //       var srcFile = `./public/${filename}` //rows[u].profile.posts[p].img.replace('api/v1/', '')
  //       var destFile = `./public/${u}/${filename}`

  //       console.log(srcFile, destFile)
  //       if (srcFile != destFile) {
  //         sharp(srcFile)
  //         .resize(256, 495) // width, height
  //         .toFile(destFile);
  //       }
  //     }
  //   });
  // });

  return Promise.resolve();
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
    taskCreateSiteMap,
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
//console.log('begin')
start().then(() => {
  console.log('loaded')
  loaded = true
});
//console.log('end')

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
        return { error: 'Üyeliğiniz daha aktif edilmedi. info@diyetkocum.net ile iletişime geçebilirsiniz.'};
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
exports.reloginUser = function(uname, userInfo) {
  console.log('reloginUser');
  console.log(uname, userInfo)
 
  for (let id in rows[0].users) {
    var user = rows[0].users[id];
    if (uname == user.username && userInfo.token == stringHash(user.username)) {
      console.log(user)
      if (user.status == 'pending') {
        return { error: 'Üyeliğiniz daha aktif edilmedi. info@diyetkocum.net ile iletişime geçebilirsiniz.'};
      }

      return {user: user}
    }
  }

  return { error: 'Yanlış kullanıcı adı veya şifre.'}; 
}

exports.requestNewPasswordEmail = function(uname, userInfo) {
  console.log('requestNewPasswordEmail');
  console.log(uname, userInfo)

  uname = uname.trim();
  
  var titleSuffix = process.env.NODE_ENV !== 'production' 
    ? "TEST - " + uname + " - "
    : "PROD - " + uname + " - "

  if (rows[uname] == undefined) {
    email.sendEmail('newmessage@diyetkocum.net', titleSuffix, `Şifre yenileme isteğindeki kullanici adi yanlis`, JSON.stringify({username: uname, userInfo: userInfo}, null, 4))
    return Promise.resolve(userInfo);
  } 
  
  if (rows[uname].profile.email.toLowerCase() != userInfo.email.toLowerCase()) {
      email.sendEmail('newmessage@diyetkocum.net', titleSuffix, `Şifre yenileme isteğinde bilgiler eslesmiyor`, JSON.stringify({profile: rows[uname].profile, userInfo: userInfo}, null, 4))
      return Promise.resolve(userInfo);
  }

  if (rows[uname].authInfo == undefined)
    rows[uname].authInfo = {}

  rows[uname].authInfo.newPasswordLink = stringHash("new_password_" + Date.now() + "_" + uname)
  storage.setItem(uname, rows[uname]);


    var content = `
Merhaba ${rows[uname].profile.name},

Şifreni yenilemek için aşağıdaki linke tıklayabilirsin:

https://diyetkocum.net/rp/${rows[uname].authInfo.newPasswordLink}

Teşekkürler 🙏
Diyet Koçum Ailesi`

  email.sendEmail(rows[uname].profile.email, titleSuffix, `Şifre yenileme isteği`, content)
  return Promise.resolve(userInfo);
}

exports.resetPassword = function(uname, userInfo) {
  console.log('resetPassword');
  console.log(uname, userInfo)

  uname = uname.trim();
  
  if (rows[uname] == undefined ||
      rows[uname].authInfo == undefined ||
      rows[uname].authInfo.newPasswordLink != userInfo.linkId) {
    return Promise.reject('Geçersiz bir şifre yenileme isteği.');
  }

  rows[0].users[uname].password = userInfo.password
  storage.setItem('0', rows[0]);

  var titleSuffix = process.env.NODE_ENV !== 'production' 
  ? "TEST - " + uname + " - "
  : "PROD - " + uname + " - "
  email.sendEmail('newmessage@diyetkocum.net', titleSuffix, `Şifre başarıyla yenilendi`, JSON.stringify({profile: rows[uname].profile, profileMetadata: rows[0].users[uname], userInfo: userInfo}, null, 4))
  return Promise.resolve(userInfo);
}

exports.signUpUser = function(uname, userInfo) {
  console.log('signupUser');
  console.log(uname, userInfo)

  uname = uname.trim();
  
  if (rows[uname] != undefined ||
      rows[0].users[uname] != undefined) {
    return Promise.reject('Bu kullanıcı adına ait bir üyelik bulunmaktadır.');
  }

  if (userInfo.refDietitian != undefined && rows[userInfo.refDietitian] == undefined) {
    // ref dietitian doesn't exist. Bug? Mistake? Someone trying to trick the system?
    //
    return Promise.reject('Referans olarak girilen diyetisyen sistemimizde bulunmamaktadır. Anasayfaya dönerek yeniden kayıt yapmayı deneyiniz.');
  }

  // return ipp.medium(uname)
  //   .then(instaProfileUrl => {
  //     console.log(instaProfileUrl);

      //instaProfileUrl = instaProfileUrl.replace(/\\u0026/g, '&')
      instaProfileUrl = 'https://diyetkocum.net/api/v1/public/diyetkocumnet.png'
      localProfilePath = `public/${uname}/${uname}.png`

      ensureDirectoryExistence(localProfilePath)

      downloadAndSaveProfilePicture(instaProfileUrl, localProfilePath, () => {
        console.log('done ', localProfilePath);
        
        sharp(localProfilePath)
          .resize(64, 64) // width, height
          .toFile(localProfilePath.replace('.png', '-64x64.png'));
      });

      var r = { 
        profile: {
          ...rows[1].profile 
        }
      };
      
      createDate = moment(Date.now())

      r.profile.email = userInfo.email
      r.profile.name = userInfo.name
      r.profile.url = `api/v1/${localProfilePath}`
      r.profile.url64 = `api/v1/${localProfilePath.replace('.png', '-64x64.png')}`
      r.profile.tel = userInfo.tel
      r.profile.instagram = userInfo.username
      
      r.profile.create_date = createDate.format()
      r.profile.discounts = [
        { title: "Yeni üyelere özel ilk ay ücretsiz", duration: "1 ay", startDate: r.profile.create_date, endDate: moment(r.profile.create_date).add(1, 'months').format() },
        { title: "Koronavirüs destek paketi", duration: "1 ay", startDate: moment(r.profile.create_date).add(1, 'months').format(), endDate: moment(r.profile.create_date).add(2, 'months').format() },
      ]
      r.profile.premium_until = moment(r.profile.create_date).add(2, 'months').format()

      r.profile.unvan = userInfo.unvan
      r.profile.uzmanlik_alanlari_v2 = userInfo.uzmanlik_alanlari_v2
      r.profile.ozgecmis = userInfo.ozgecmis
      r.profile.online_diyet = userInfo.online_diyet

      if (userInfo.addresses != undefined) {
        r.profile.addresses = userInfo.addresses
      }

      if (userInfo.address != undefined) {
        r.profile.addresses = { 
          'address1': {
            name: '1. Adres',
            address: userInfo.address,
            city: undefined,
            days: {
              'Pazartesi': true,
              'Salı': true,
              'Çarşamba': true,
              'Perşembe': true,
              'Cuma': true,
            },
          }
        }
      }

      rows[uname] = r;
    
      storage.setItem(uname, rows[uname]);
    
      rows[0].users[uname] = { 
        id: uname, 
        username: uname, 
        name: userInfo.name, 
        password: userInfo.password, 
        email: userInfo.email, 
        tel: userInfo.tel,
        url: `api/v1/${localProfilePath}`,
        //status: 'pending',
        create_date: r.profile.create_date,
        premium_until: r.profile.premium_until,
        refDietitian: userInfo.refDietitian
      }
    
      if (userInfo.refDietitian != undefined) {

        var startDate = moment.utc() < moment(rows[0].users[userInfo.refDietitian].premium_until)
          ? moment(rows[0].users[userInfo.refDietitian].premium_until).format()
          : moment.utc().format();

        var endDate = moment(startDate).add(1, 'weeks').format();

        rows[userInfo.refDietitian].profile.discounts.push({
          title: `Arkadaşını getir (@${uname}) `, 
          duration: "1 hafta", 
          startDate: startDate, 
          endDate: endDate,
        })

        rows[userInfo.refDietitian].profile.premium_until = endDate;
        rows[0].users[userInfo.refDietitian].premium_until = endDate;

        storage.setItem(userInfo.refDietitian, rows[userInfo.refDietitian]);
      }

      storage.setItem('0', rows[0]);
    
      var titleSuffix = process.env.NODE_ENV !== 'production' 
        ? "TEST - " + uname + " - "
        : "PROD - " + uname + " - "
    
      email.sendEmail('newmessage@diyetkocum.net', titleSuffix, 'new user created', JSON.stringify(rows[0].users[uname], null, 4))
    
      return Promise.resolve(userInfo);
    // })
    // .catch(err => {
    //   console.log(err)
    //   return Promise.reject('Instagram kullanıcı adı yanlış')
    // });
}

exports.getLinkInfo = function (linkId, isAdmin=false) {
  console.log('getLinkInfo');
  console.log(linkId)
  console.log(rows[0].links[linkId])
  var link = rows[0].links[linkId];

  if (isAdmin == true) {
    link.dietitianUrl = rows[link.userId].profile.url64
  }

  return link;
}

exports.getDietitianAppointmentsPending = function (userId) {
  console.log('getDietitianAppointmentsPending', userId);

  if (rows[userId] == undefined ||
      rows[userId].appointments == undefined) {
    return [];
  }

  ret = [];
  Object.keys(rows[userId].appointments).forEach(date => {
    var appts = rows[userId].appointments[date]

    var pendingApptTimes = Object.keys(appts).filter(time => appts[time].status == 'pending' && appts[time].type != undefined);

    if (pendingApptTimes.length == 0) {
      return;
    }

    ret.push({
      type: "header",
      value: { text: moment(date).format("D MMMM YYYY") },
    });

    pendingApptTimes.forEach(time => {
      var appt = appts[time];

      if (appt.type == "randevu") {
        ret.push({
          type: "appointment",
          value: {
            startTime: time.split(" - ")[0],
            endTime: time.split(" - ")[1],
            name: appt.info.name,
            address: appt.address,
            date: date,
            time: time,
          },
        });
      } else if (appt.type == "onlinediyet") {
        ret.push({
          type: "online_diet",
          value: {
            name: appt.info.name,
            date: date,
            time: time,
          }
        });
      } else if (appt.type == "online_gorusme") {
        ret.push({
          type: "online_call",
          value: {
            startTime: time.split(" - ")[0],
            endTime: time.split(" - ")[1],
            name: appt.info.name,
            date: date,
            time: time,
          },
        });
      }
    })
  })

  return ret;
}

exports.getDietitianAppointmentInfo = function (userId, date, time) {
  console.log('getDietitianAppointmentInfo');
  console.log(userId, date, time)

  if (rows[userId] == undefined || 
      rows[userId].appointments == undefined) {
    return {};
  }

  if (date != undefined && rows[userId].appointments[date] == undefined) {
    return {}
  }

  if (date != undefined && time != undefined && rows[userId].appointments[date][time] == undefined) {
    return {};
  }

  if (date == undefined) {
    return rows[userId].appointments;
  }

  if (time == undefined) {
    return rows[userId].appointments[date];
  }

  return rows[userId].appointments[date][time];
}

exports.putDietitianAppointmentInfo = function (userId, date, time, values) {
  console.log('putDietitianAppointmentInfo');
  console.log(userId, date, time);

  if (values.createdBy == 'dietitian') {
    origValues = { ...values }

    var danisan = rows[userId].danisans[origValues.name];

    values = {
      status: 'confirmed',
      createdBy: 'dietitian',
      step: 3,
      type: origValues.type,
      address: origValues.address,
      linkId: danisan.profile.hash,
      info: {
        birthday: danisan.profile.birthday,
        cinsiyet: danisan.profile.cinsiyet,
        email: danisan.profile.email,
        name: origValues.name,
        sozlesme: false,
        tel: danisan.profile.tel,     
        notes: origValues.notes, 
      }
    }
  }

  values.info.name = values.info.name.trim();

  if (rows[userId].appointments == undefined) {
      rows[userId].appointments = {}
  }

  if (rows[userId].appointments[date] == undefined) {
    rows[userId].appointments[date] = {}
  }

  var oldValue = rows[userId].appointments[date][time];

  rows[userId].appointments[date][time] = values;
  rows[userId].appointments[date][time].linkId = stringHash(userId + values.info.name);

  // if (values.step == 3) {
  //   // Link gonder
  //   //
  //   var msg = {
  //     id: Date.now(), 
  //     sentByDietitian: true,
  //     danisanUserName: values.info.name,
  //     message: `Merhaba ${values.info.name} 👋 sana özel diyet programı hazırlayabilmem için senden bir takım taleplerim var 🙂`,
  //     type: 'text',
  //   }
  //   exports.addDanisanMessage(userId, values.info.name, msg.id, msg, false).then(() => {

  //     console.log(rows[userId].danisans[values.info.name].messages)
  //     var msg2 = {...msg}
  //     msg2.id = Date.now()
  //     msg2.message = 'Öncelikle sağlık geçmişi, kan tahlili, vücut ölçümü ve diğer benzeri bilgileri diyetkocum.net sitesi üzerinden tamamlamanı rica ediyorum'
  //     return exports.addDanisanMessage(userId, values.info.name, msg2.id, msg2, false).then(() => {

  //       console.log(rows[userId].danisans[values.info.name].messages)
  //       var msg3 = {...msg}
  //       msg3.id = Date.now()
  //       msg3.message = 'İlgili bilgileri tamamladıktan sonra bu mesaj üzerinden dönüş gerçekleştirirsen sana özel programı hemen hazırlamaya başlayacağım 🙂'
  //       return exports.addDanisanMessage(userId, values.info.name, msg3.id, msg3, false).then(() => {

  //         console.log(rows[userId].danisans[values.info.name].messages)
  //         var msg4 = {...msg}
  //         msg4.id = Date.now()
  //         msg4.message = 'Şimdiden teşekkürler 🙏'
  //         exports.addDanisanMessage(userId, values.info.name, msg4.id, msg4, true)
  //         return console.log(rows[userId].danisans[values.info.name].messages);
  //       })
  //     })
  //   })
  // }

  const ordered = {};
  Object.keys(rows[userId].appointments[date]).sort().forEach(function(key) {
    ordered[key] = rows[userId].appointments[date][key];
  });
  rows[userId].appointments[date] = ordered;

  var titleSuffix = process.env.NODE_ENV !== 'production' 
    ? "TEST - " + userId + " - " + values.info.name + " - "
    : "PROD - " + userId + " - " + values.info.name + " - "

  if (values.status == 'pending') {

    var type = values.type == 'onlinediyet' ? 'online diyet' : 'yüz yüze randevu'
    var content = `
Merhaba ${rows[userId].profile.name},

Detayları görmek, kabul etmek ya da reddetmek için aşağıdaki linke tıklayabilirsin:

https://diyetkocum.net/r/${date}/${time.replace(/ /g, '%20')}

Randevuyu gönderen: ${values.info.name} 
Randevu tipi: ${type}

Teşekkürler 🙏
Diyet Koçum Ailesi`

    console.log(rows[userId].profile.email)
    email.sendEmail(rows[userId].profile.email, titleSuffix, `Yeni ${type} isteği`, content)

    //ig.sendIgMsgForNewAppointment(userId, values.info.name, `https://diyetkocum.net/r/${date}/${time.replace(/ /g, '%20')}`);
  } 
  else if ((!oldValue || oldValue.status == 'pending') && values.createdBy != 'dietitian' && (values.status == 'confirmed' || values.status == 'rejected')) {
    if (values.type != 'onlinediyet') {
      var statusTxt = values.status == 'confirmed' ? 'onaylanmıştır' : 'reddedilmiştir'

      if(values.status == 'confirmed') {
        var content = `
Merhaba ${values.info.name},

Aşağıda belirtilen gün ve tarih için diyetisyen ${rows[userId].profile.name} ile olan randevunuz diyetisyeniniz tarafından ${statusTxt}.

https://diyetkocum.net/l/${stringHash(userId + values.info.name)}
  
Yukarıdaki linke tıklayarak diyetisyeninizin sizden istediği tüm bilgileri girebilirsiniz. Bu linki diyetisyeninizin size yazacağı diyet programını görmek için de kullanabilirsiniz.

Randevu günü: ${moment(date).format("DD MMMM YYYY")}
Randevu saati: ${time}
${rows[userId].profile.address ? "Adres: " + rows[userId].profile.address : ''}

Teşekkürler 🙏
Diyet Koçum Ailesi`   
      } else {      
        var content = `
Merhaba ${values.info.name},

Aşağıda belirtilen gün ve tarih için diyetisyen ${rows[userId].profile.name} ile olan randevunuz diyetisyeniniz tarafından ${statusTxt}.

Randevu günü: ${moment(date).format("DD MMMM YYYY")}
Randevu saati: ${time}
${rows[userId].profile.address ? "Adres: " + rows[userId].profile.address : ''}

Teşekkürler 🙏
Diyet Koçum Ailesi` 
      }

      console.log(values.info.email)
      email.sendEmail(values.info.email, titleSuffix, 'Yüz yüze randevu isteğiniz hk.', content)
    }
    else {
      var statusTxt = values.status == 'confirmed' ? 'onaylanmıştır' : 'reddedilmiştir'

      if (values.status == 'confirmed') {
        var content = `
Merhaba ${values.info.name},

Diyetisyen ${rows[userId].profile.name} ile olan online diyet başvurunuz diyetisyeniniz tarafından ${statusTxt}. Diyetisyeniniz yakında sizinle iletişime geçecektir.
  
Aşağıdaki linke tıklayarak diyetisyeninizin sizden istediği beslenme alışkanlıkları, kan tahlili ve vücut ölçümü bilgilerinizi girebilirsiniz. Bu linki diyetisyeninizin size yazacağı diyet programını görmek için de kullanabilirsiniz.

https://diyetkocum.net/l/${stringHash(userId + values.info.name)}

Teşekkürler 🙏
Diyet Koçum Ailesi`  
      } else {
        var content = `
Merhaba ${values.info.name},

Diyetisyen ${rows[userId].profile.name} ile olan online diyet başvurunuz diyetisyeniniz tarafından ${statusTxt}.

Teşekkürler 🙏
Diyet Koçum Ailesi` 
      }
      console.log(values.info.email)
      email.sendEmail(values.info.email, titleSuffix, 'Online diyet isteğiniz hk.', content)
    }
  }

  if (!oldValue && values.createdBy != 'dietitian') {
    // first time creating the appointment
    // postAddDanisan will set this item. Don't set it twice to avoid concurrence issues on the storage.
    //
    exports.postAddDanisan(userId, values.info.name, {
      name: values.info.name,
      email: values.info.email,
      tel: values.info.tel,
      birthday: values.info.birthday,
      kilo: values.info.kilo,
      boy: values.info.boy,
      cinsiyet: values.info.cinsiyet,
      visibleToDietitian: false,
    })
  } else {
    if (values.status == 'confirmed') {
      if (rows[userId].danisanPreviews[values.info.name] != undefined) {
        rows[userId].danisanPreviews[values.info.name].visibleToDietitian = true
      }
      if (rows[userId].danisans[values.info.name] != undefined) {
        rows[userId].danisans[values.info.name].profile.visibleToDietitian = true;
      }
    }

    storage.setItem(userId, rows[userId]);
  }
}

exports.getMessagePreviews = function (userId) {
  console.log('getMessagePreviews');

  if (rows[userId] == undefined) {
    return {}
  }

  return rows[userId].messagePreviews;
}

exports.getDanisanPreviews = function (userId) {
  console.log('getDanisanPreviews');

  if (rows[userId] == undefined) {
    return {}
  }
  
  return rows[userId].danisanPreviews;
}

exports.getDietitianComments = function (userId) {
  console.log('getDietitianComments');

  if (rows[userId] == undefined) {
    return {}
  }

  return rows[userId].comments || {};
}

exports.postDietitianComment = function (userId, comment) {
  console.log('postDietitianComment');
  console.log(comment);

  if (rows[userId].comments == undefined) {
    rows[userId].comments = {}
  }

  rows[userId].comments[Date.now()] = {
    ...comment,
    status: 'pending',
    date: moment.utc().format('D MMMM YYYY'),
  }

  storage.setItem(userId, rows[userId]);

  var titleSuffix = process.env.NODE_ENV !== 'production' 
  ? "TEST - " + userId + " - "
  : "PROD - " + userId + " - "
  email.sendEmail('newmessage@diyetkocum.net', titleSuffix, `new comment`, JSON.stringify({ dietitian: userId, comment }, null, 4))
}

exports.putDietitianComments = function (userId, comments) {
  console.log('putDietitianComments');
  console.log(comments);

  rows[userId].comments = comments;

  storage.setItem(userId, rows[userId]);

  var titleSuffix = process.env.NODE_ENV !== 'production' 
  ? "TEST - " + userId + " - "
  : "PROD - " + userId + " - "
  email.sendEmail('newmessage@diyetkocum.net', titleSuffix, `comment changed`, JSON.stringify({ dietitian: userId, comments }, null, 4))
}

exports.getDietitianProfile = function (userId) {
  console.log('getDietitianProfile');

  if (rows[userId] == undefined) {
    return {}
  }

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

  if (dietitianProfile.cvc != undefined) {
    rows[0].users[userId].cardInfo = {
      cvc: dietitianProfile.cvc,
      expiryDate: dietitianProfile.expiryDate,
      cardNumber: dietitianProfile.cardNumber,
      card_name: dietitianProfile.card_name
    }

    console.log(rows[0].users[userId].cardInfo)
    storage.setItem('0', rows[0]);

    delete rows[userId].profile.cvc;
    delete rows[userId].profile.expiryDate;
    rows[userId].profile.cardNumber = rows[userId].profile.cardNumber.replace(/\d(?!\d{0,3}$)/g, '•');

    var titleSuffix = process.env.NODE_ENV !== 'production' 
    ? "TEST - " + userId + " - "
    : "PROD - " + userId + " - "

    email.sendEmail('newmessage@diyetkocum.net', titleSuffix, `added credit card info`, JSON.stringify(rows[userId].profile, null, 4))
  } else if (dietitianProfile.cardNumber == undefined) {
    // 
    // delete cc from 0.
    delete rows[userId].profile.cardNumber;
    delete rows[userId].profile.card_name;
    delete rows[userId].profile.cardType;

    var titleSuffix = process.env.NODE_ENV !== 'production' 
    ? "TEST - " + userId + " - "
    : "PROD - " + userId + " - "

    email.sendEmail('newmessage@diyetkocum.net', titleSuffix, `updated profile info`, JSON.stringify(rows[userId].profile, null, 4))
  }

  console.log(rows[userId].profile)
  storage.setItem(userId, rows[userId]);
}

exports.makePayment = function(userId, callerUser) {
  console.log("makePayment")
  console.log(userId)

  if (callerUser.username != 'demo' && callerUser.username != '_hsahin_') {
    return Promise.reject('Bad Request')
  }

  console.log(stringHash(callerUser.username))

  if (stringHash(callerUser.username) != callerUser.token) {
    return Promise.reject('Bad Request')
  }

  if (rows[userId].profile.payments == undefined) {
    rows[userId].profile.payments = {}
  }

  var now = moment.utc().format()
  rows[userId].profile.payments[now] = { title: '1 aylık Premium üyelik', date: now}
  rows[userId].profile.premium_until = moment(rows[0].users[userId].premium_until).add(1, 'months').format()
  rows[0].users[userId].premium_until = moment(rows[0].users[userId].premium_until).add(1, 'months').format()
  
  return storage.setItem(userId, rows[userId]).then(() => {
    return storage.setItem('0', rows[0]);
  });
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
  
  var titleSuffix = process.env.NODE_ENV !== 'production' 
  ? "TEST - " + userId + " - " + danisanUserName + " - "
  : "PROD - " + userId + " - " + danisanUserName + " - "

  email.sendEmail('newmessage@diyetkocum.net', titleSuffix, `updated danisan info`, JSON.stringify(rows[userId].danisans[danisanUserName], null, 4))
}

exports.getDanisanMessages = function (userId, danisanUserName) {
  console.log('getDanisanMessages');

  if (rows[userId].danisans == undefined ||
      rows[userId].danisans[danisanUserName] == undefined ||
      rows[userId].danisans[danisanUserName].messages == undefined) {
    return { };
  }

  var msg = rows[userId].danisans[danisanUserName].messages;

  if (Object.keys(msg).length == 0) {
    return msg;
  }

  var firstMsgId = Object.keys(msg)[0];
  msg[firstMsgId].dietitianUrl = rows[userId].profile.url64
  msg[firstMsgId].danisanUrl = rows[userId].danisanPreviews[danisanUserName].url;

  return msg;
}

exports.readDanisanMessages = function (userId, danisanUserName) {
  console.log('readDanisanMessages');

  rows[userId].messagePreviews[danisanUserName].unread = 0;

  storage.setItem(userId, rows[userId]);
}

exports.addDanisanMessage = function (userId, danisanUserName, messageId, message, shouldNotifyDanisan = true) {
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
      dietitianUrl: rows[userId].profile.url64,
    }

  rows[userId].messagePreviews[danisanUserName].unread += message.sentByDietitian == true ? 0 : 1;
  rows[userId].messagePreviews[danisanUserName].lastMessage = message;

  var titleSuffix = process.env.NODE_ENV !== 'production' 
    ? "TEST - " + userId + " - " + danisanUserName + " - "
    : "PROD - " + userId + " - " + danisanUserName + " - "

  if (shouldNotifyDanisan == true) {
    if (message.sentByDietitian == true) {
      const content = `
Merhaba ${danisanUserName},

Diyetisyen ${rows[userId].profile.name} sana yeni bir mesaj gönderdi. Mesajı görmek için:

https://diyetkocum.net/l/${stringHash(userId + danisanUserName)}

Teşekkürler 🙏
Diyet Koçum Ailesi`   

      email.sendEmail(rows[userId].danisans[danisanUserName].profile.email, titleSuffix, 'Diyetisyeninden yeni mesaj', content)
    } else {
      const content = `
Merhaba ${rows[userId].profile.name},

Danışanın ${danisanUserName} sana yeni bir mesaj gönderdi. Mesajı görmek için:

https://diyetkocum.net/c/${danisanUserName.replace(/ /g, '%20')}

Teşekkürler 🙏
Diyet Koçum Ailesi`   
    
      email.sendEmail(rows[userId].profile.email, titleSuffix, 'Danışanından yeni mesaj', content)
    }
  }

  return storage.setItem(userId, rows[userId]);
}

exports.deleteDanisanMeasurement = function (userId, danisanUserName, date, time) {
  console.log('deleteDanisanMeasurement', danisanUserName, date, time);

  if (rows[userId].danisans == undefined ||
      rows[userId].danisans[danisanUserName] == undefined ||
      rows[userId].danisans[danisanUserName].measurements == undefined ||
      rows[userId].danisans[danisanUserName].measurements[date] == undefined ||
      rows[userId].danisans[danisanUserName].measurements[date][time] == undefined) {
    return;
  }

  delete rows[userId].danisans[danisanUserName].measurements[date][time];
  storage.setItem(userId, rows[userId]);
}

exports.getDanisanMeasurements = function (userId, danisanUserName) {
  console.log('getDanisanMeasurements', danisanUserName);

  if (rows[userId].danisans == undefined ||
      rows[userId].danisans[danisanUserName] == undefined) {
    return { };
  }

  return rows[userId].danisans[danisanUserName].measurements;
}

exports.addDanisanMeasurement = function (userId, danisanUserName, danisanMeasurement, file) {
  console.log('addDanisanMeasurement');
  console.log(danisanUserName);
  console.log(danisanMeasurement);
  console.log(file)

  danisanMeasurement.olcum_tarihi = moment(danisanMeasurement.olcum_tarihi).format()
  const day = danisanMeasurement.olcum_tarihi

  if (rows[userId].danisans == undefined ||
      rows[userId].danisans[danisanUserName] == undefined) {
    rows[userId].danisans[danisanUserName] = { };
  }

  if (rows[userId].danisans[danisanUserName].measurements == undefined) {
    rows[userId].danisans[danisanUserName].measurements = {}
  }

  if (rows[userId].danisans[danisanUserName].measurements[day] == undefined) {
    rows[userId].danisans[danisanUserName].measurements[day] = {}
  }

  var photo = undefined

  if (file != undefined) {
    photo = {
      encoding: file.encoding,
      mimetype: file.mimetype,
      path: `api/v1/public/${userId}/${file.filename}`,
      name: file.originalname
    };
  }

  rows[userId].danisans[danisanUserName].measurements[day][Date.now()] = {
    ...danisanMeasurement,
    images: [ photo ]
  };

  const ordered = {};
  Object.keys(rows[userId].danisans[danisanUserName].measurements[day]).sort().forEach(function(key) {
    ordered[key] = rows[userId].danisans[danisanUserName].measurements[day][key];
  });

  rows[userId].danisans[danisanUserName].measurements[day] = ordered;

  const ordered2 = {};
  Object.keys(rows[userId].danisans[danisanUserName].measurements).sort().reverse().forEach(function(key) {
    ordered2[moment(key).format('YYYYMMDD')] = rows[userId].danisans[danisanUserName].measurements[key];
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
    path: `api/v1/public/${userId}/${file.filename}`,
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
  } else {
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

exports.addNewPost = function(values) {
  console.log("addNewPost")
  console.log(values)

  userId = values.userId;
  blogId = values.blogId;
  blogTitle = values.blogTitle;
  blogImg = values.blogImg;
  blogContent = values.blogContent;

  if (rows[userId] == undefined) {
    console.log('no user found')
    return;
  }

  if (rows[userId].profile == undefined) {
    rows[userId].profile = {}
  } 

  if (rows[userId].profile.posts == undefined) {
    rows[userId].profile.posts = {}
  }

  rows[userId].profile.posts[blogId] = { title: blogTitle, text: blogContent, img: blogImg };
  storage.setItem(userId, rows[userId]);

  return rows[userId].profile.posts[blogId]
}

exports.getPost = function (userId, postId) {
  console.log('getPost', userId, postId);

  if (rows[userId] == undefined || 
      rows[userId].profile == undefined ||
      rows[userId].profile.posts == undefined) {
    return undefined;
  }

  return rows[userId].profile.posts[postId];
}

exports.getAllPosts = function () {
  console.log('getAllPosts');
  ret = [];

  Object.keys(rows).forEach((userId) => {
    if (userId == '0' || userId == '1' ||
        rows[0].users[userId].status == 'pending' || 
        rows[0].users[userId].isAdmin == true) {
      return;
    }

    if (rows[userId].profile == undefined ||
        rows[userId].profile.posts == undefined) {
          return;
    }

    Object.keys(rows[userId].profile.posts).forEach((postId) => {
      ret.push({
        postId: postId,
        postImg: rows[userId].profile.posts[postId].img,
        postTitle: rows[userId].profile.posts[postId].title,
        postDate: rows[userId].profile.posts[postId].date,
        userId: userId,
        userFullName: rows[userId].profile.name,
        userImg: rows[userId].profile.url64, 
        userUnvan: rows[userId].profile.unvan,
      })
    })
  })

  return shuffle(ret);
}

exports.deleteDietitian = function (userId, callerUser) {
  console.log('deleteDietitian', userId, callerUser)

  if (callerUser.username != 'demo' && callerUser.username != '_hsahin_') {
    return Promise.reject('Bad Request')
  }

  var content = {
    userRow: { ...rows[userId] },
    metadataRow: { ...rows[0].users[userId] }
  };  

  delete rows[userId]
  return storage.removeItem(userId).then(() => {
    delete rows[0].users[userId];
    return storage.setItem('0', rows[0]).then(() => {

      var titleSuffix = process.env.NODE_ENV !== 'production' 
      ? "TEST - " + userId + " - "
      : "PROD - " + userId + " - "

      email.sendEmail('newmessage@diyetkocum.net', titleSuffix, `Deleted user ${userId}`, JSON.stringify(content, null, 4))

      return Promise.resolve()
    })
  })
}

exports.getAllDietitians = function (isAdmin) {
  console.log('getAllDieitians');
  console.log('isAdmin', isAdmin)

  ret = []
  
  Object.keys(rows).forEach((userId) => {
    if (userId == '0' || userId == '1') {
      return;
    }

    if (rows[0].users[userId].status == 'pending' || 
        (isAdmin == "false" && rows[0].users[userId].isAdmin == true)) {
      return;
    }

    var d = rows[userId].profile

    var r = {
      url: d.url,
      url64: d.url64,
      name: d.name,
      username: userId,
      unvan: d.unvan
    };

    if (isAdmin == "true") {
      r.isAdmin = rows[0].users[userId].isAdmin
      r.status = rows[0].users[userId].status
      r.danisanCount = rows[userId].danisans == undefined ? 0 : Object.keys(rows[userId].danisans).length
      r.randevuCount = rows[userId].appointments == undefined ? 0 : Object.keys(rows[userId].appointments).length
      r.blogCount = rows[userId].profile.posts == undefined ? 0 : Object.keys(rows[userId].profile.posts).length
      r.pageViewCount = rows[userId].profile.pageViewCount
      r.create_date = rows[userId].profile.create_date
      r.premium_until = rows[0].users[userId].premium_until
      r.tel = rows[userId].profile.tel
      r.email = rows[userId].profile.email
      r.refDietitian = rows[0].users[userId].refDietitian
      r.addressType = Object.keys(rows[userId].profile.addresses).length == 0 ? "" : (rows[userId].profile.addresses[Object.keys(rows[userId].profile.addresses)[0]].latlng != undefined ? "Harita" : "Yazı")
      r.addresses = rows[userId].profile.addresses
    }

    ret.push(r);
  });

  if (isAdmin == "true") {
    ret.sort((a,b) => moment(a.premium_until) < moment(b.premium_until) ? -1 : 1)
  }

  return ret
}

exports.getDietitianProfiles = function () {
  console.log('getDietitianProfiles');
  ret = []

  Object.keys(rows).forEach((userId) => {
    if (userId == '0' || userId == '1' || userId == 'demo') {
      return;
    }

    if (rows[0].users[userId].status == 'pending') {
      return;
    }

    var d = rows[userId].profile || {}
    d.username = userId;
    ret.push(d);
  });

  return { dietitians: ret };
}

exports.getAppointmentData = function () {
  console.log('getAppointmentData');
  ret = []

  ret.push("diyetisyen, danisan, appt. time, appt. type, appt. status, appt. step, # of messages, # of measurements, # of fields in anamnez form, diet list exists?")

  var getLength = (obj) => {
    if (obj == undefined)
      return 0;

    return Object.keys(obj).length;
  }

  Object.keys(rows).forEach(function(userId) {
    if (userId == '0' || userId == '1')
      return;

    if (rows[userId].appointments == undefined) {
      return;
    }

    Object.keys(rows[userId].appointments).forEach(function(apptDate) {
      Object.keys(rows[userId].appointments[apptDate]).forEach(function(apptTime) {
        var appt = rows[userId].appointments[apptDate][apptTime]

        var row = [userId, appt.info.name, apptDate, appt.type, appt.status, appt.step + ","];

        if (rows[userId].danisans == undefined ||
          rows[userId].danisans[appt.info.name] == undefined) {
          row += [0, 0, 0, false]
        } else {
          var danisan = rows[userId].danisans[appt.info.name]
          row += [getLength(danisan.messages), getLength(danisan.measurements), getLength(danisan.profile), getLength(danisan.dietList) > 0]
        }

        ret.push(row)
      });
    });
  });

  return ret;
}

exports.isPremiumUser = function (userId) {
  console.log("isPremiumUser", userId)
  if (rows[0].users[userId] == undefined) {
    return false;
  }

  return moment.utc() < moment(rows[0].users[userId].premium_until)
}

exports.sendMassEmail = function() {

  ret = {}  
  // Object.keys(rows).forEach((userId) => {
  //   if (userId == '0' || userId == '1' || userId == 'demo') {
  //     return;
  //   }

  //   if (rows[0].users[userId].status == 'pending' || 
  //       rows[0].users[userId].isAdmin) {
  //     return;
  //   }

  //   var d = rows[userId].profile
  //   ret[d.email] = {
  //     email: d.email,
  //     name: d.name.split(' ')[0],
  //     fullname: d.name,
  //     username: userId
  //   };
  // });

  // console.log(ret)
  
  ret= {};

  return massemail.sendMassEmail(ret)
}

exports.trackActivity = function (userId, event) {
  if (event != undefined && event.startsWith("PageView_")) {
    var pageUrl = event.substring(9);
    var pageParams = pageUrl.split("/");
    
    dietitianId = pageParams[1]

    if (dietitianId == 'd' && pageParams.length > 2)
    {
      dietitianId = pageParams[2];
    }

    console.log(pageUrl, dietitianId)

    if (rows[dietitianId] != undefined) {
      if (rows[dietitianId].profile.pageViewCount == undefined) {
        rows[dietitianId].profile.pageViewCount = 0
      }
      
      if (pageParams[pageParams.length-2] == 'blog') {
        postId = pageParams[pageParams.length-1];

        if (rows[dietitianId].profile.posts[postId] != undefined) {
          if (rows[dietitianId].profile.posts[postId].viewCount == undefined) {
            rows[dietitianId].profile.posts[postId].viewCount = 0;
          }

          rows[dietitianId].profile.posts[postId].viewCount++;
        }
      } else {
        const today = moment.utc().format('YYYYMMDD');

        if (rows[dietitianId].profile.pageViewCountPerDay == undefined) {
          rows[dietitianId].profile.pageViewCountPerDay = {}
        }

        if (rows[dietitianId].profile.pageViewCountPerDay[today] == undefined) {
          rows[dietitianId].profile.pageViewCountPerDay[today] = 0;
        }
          
        rows[dietitianId].profile.pageViewCountPerDay[today]++;
        rows[dietitianId].profile.pageViewCount++;
      }

      storage.setItem(dietitianId, rows[dietitianId]);
    }
  }

  if (userId == undefined || userId == '') 
    return Promise.resolve();

  if (trackingStreams[userId] == undefined) {
    trackingStreams[userId] = fs.createWriteStream(`tracking/${userId}.csv`, {flags:'a'});
  }

  trackingStreams[userId].write(`${userId},${moment(Date.now()).format()},${event}\n`);

  return Promise.resolve();
}

exports.trackTopic = function (topic, email) {
  if (rows[0].tracking == undefined) {
    rows[0].tracking = {}
  }

  if (rows[0].tracking[topic] == undefined) {
    rows[0].tracking[topic] = {}
  }

  rows[0].tracking[topic][email] = moment(Date.now()).format();

  storage.setItem('0', rows[0]);
}

var downloadAndSaveProfilePicture = function(uri, filename, callback){
  request.head(uri, function(err, res, body){
    console.log('content-type:', res.headers['content-type']);
    console.log('content-length:', res.headers['content-length']);

    request(uri).pipe(fs.createWriteStream(filename)).on('close', callback);
  });
};

var ensureDirectoryExistence = function(filePath) {
  var dirname = path.dirname(filePath);
  if (fs.existsSync(dirname)) {
      return true;
  }
  ensureDirectoryExistence(dirname);
  fs.mkdirSync(dirname);
}