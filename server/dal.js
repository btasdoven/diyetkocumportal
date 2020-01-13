const storage = require('node-persist');
const stringHash = require("string-hash");

const rows = {
  0: {
    'links': { }
  },
  5: {
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

const users = [
  { id: 5, username: 'demo', name: 'Diyet Koçum Test', password: '1234', url: '/static/favicon.png' },
  { id: 6, username: 'dyt.kubra_aydin', name: 'Kübra Aydın', password: '1234', url: 'https://instagram.fcxh3-1.fna.fbcdn.net/v/t51.2885-19/s150x150/79369500_2619425271482161_1159096052670791680_n.jpg?_nc_ht=instagram.fcxh3-1.fna.fbcdn.net&_nc_ohc=_ZSwjUzpLQcAX-ZZBKU&oh=29310039c3379c1e71f5e6d008fc525d&oe=5E98B832' },
  { id: 7, username: 'dyt_ezelkavadar', name: 'Ezel Kavadar', password: '1234', url: 'https://scontent-sea1-1.cdninstagram.com/v/t51.2885-19/s320x320/65535962_411795416090543_708510732999720960_n.jpg?_nc_ht=scontent-sea1-1.cdninstagram.com&_nc_ohc=-CRizYY6VPwAX82G5qH&oh=75c5e5b1629d904afafbe3da693681bc&oe=5E9FC51C' },
];

async function start() {
    await storage.init({ dir: 'stg', logging: true });

    if (process.env.PORT == undefined) {
      // localhost testing. reinit the db
      //
      await storage.clear();
      users.forEach(async (user) => {
        await storage.setItem(user.id.toString(), rows[user.id] || {});
      });
    }
    
    // Retrieve the data from db to memory
    //
    await storage.forEach(async function(datum) {
      rows[datum.key] = datum.value;
    });
    
    // For backward compatibility. 
    // Iterate over all the clients and initialize their unique links.
    //
    Object.keys(rows).forEach((id) => {
      if (id == 0 || rows[id].danisans == undefined)
        return;

      Object.keys(rows[id].danisans).forEach(function(danisanUserName) {
        var hash = stringHash(id + danisanUserName)
        if (rows[0].links[hash] == undefined) {
          rows[0].links[hash] = {
            userId: id,
            danisanUserName: danisanUserName
          }
        }
      });
    });

    await storage.setItem('0', rows[0]);
}

start();

exports.loginUser = function(uname, pwd) {
  console.log('loginUser');
  console.log(uname)

  for (let i in users) {
    if (uname == users[i].username && pwd == users[i].password) {
      // First login?
      //
      if (rows[users[i].id] == undefined) {
        rows[users[i].id] = {}
        storage.setItem(users[i].id.toString(), rows[users[i].id]);
      }

      return users[i]
    }
  }

  return undefined;
}

exports.getMessagePreviews = function (userId) {
  console.log('getMessagePreviews');

  return rows[userId].messagePreviews;
}

exports.getDanisanPreviews = function (userId) {
  console.log('getDanisanPreviews');

  return rows[userId].danisanPreviews;
}

exports.getDanisanProfile = function (userId, danisanUserName) {
  console.log('getDanisanProfile');
  console.log(danisanUserName);

  if (rows[userId].danisans == undefined ||
      rows[userId].danisans[danisanUserName] == undefined) {
    return {};
  }

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

  rows[userId].danisans[danisanUserName].profile = danisanProfile;

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