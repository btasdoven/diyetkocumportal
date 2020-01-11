const storage = require('node-persist');

const rows = {
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
            yas: '36',
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
            yas: '29',
          }
        }
      }
    },
  6: {
    
  }
};
 

async function start() {
    await storage.init({ dir: 'stg', logging: true });

    if (process.env.PORT == undefined) {
      await storage.clear();
      await storage.setItem('5', rows[5]);
      await storage.setItem('6', rows[6]);
    }
    
    storage.forEach(async function(datum) {
      rows[datum.key] = datum.value;
    });
}

start();

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

  var danisan = rows[userId].danisans[danisanUserName];

  if (!danisan) {
    return {};
  }

  return danisan.profile;
}

exports.putDanisanProfile = function (userId, danisanUserName, danisanProfile) {
  console.log('putDanisanProfile');
  console.log(danisanUserName);
  console.log(danisanProfile);

  if (!rows[userId].danisans[danisanUserName]) {
    rows[userId].danisans[danisanUserName] = { };
  }

  rows[userId].danisans[danisanUserName].profile = danisanProfile;

  storage.setItem(userId, rows[userId]);
}

exports.getDanisanNotes = function (userId, danisanUserName) {
  console.log('getDanisanNotes');
  console.log(danisanUserName);

  var danisan = rows[userId].danisans[danisanUserName];

  if (!danisan || !danisan.notes) {
    return { notes: ''};
  }

  return danisan.notes;
}

exports.putDanisanNotes = function (userId, danisanUserName, danisanNotes) {
  console.log('putDanisanNotes');
  console.log(danisanUserName);
  console.log(danisanNotes);

  if (!rows[userId].danisans[danisanUserName]) {
    rows[userId].danisans[danisanUserName] = { };
  }

  rows[userId].danisans[danisanUserName].notes = danisanNotes;

  storage.setItem(userId, rows[userId]);
}

exports.addDanisan = function (userId, danisanUserName, danisanPreview) {
  console.log('addDanisan')
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

  console.log(rows[userId].danisanPreviews[danisanUserName]);
  console.log(rows[userId].danisans[danisanUserName]);

  storage.setItem(userId, rows[userId]);
}

// exports.putLikes = function (userId, kim, kimi, commentIdx, val) {
//   console.log('putLikes');
//   console.log(kim);
//   console.log(kimi);
//   console.log(commentIdx);
//   console.log(val);

//   oldVal = { liked: false, disliked: false };

//   if (!rows[userId].likes) {
//     rows[userId].likes = {
//       [kim]: { [kimi] : {[commentIdx]: val}}
//     }
//   } else if (!rows[userId].likes[kim]) {
//     rows[userId].likes[kim] = { 
//       [kimi]: { 
//         [commentIdx]: val 
//       }
//     };
//   } else if (!rows[userId].likes[kim][kimi]) {
//     rows[userId].likes[kim][kimi] = { 
//       [commentIdx]: val
//     };
//   } else {
//     oldVal = rows[userId].likes[kim][kimi][commentIdx];
//     rows[userId].likes[kim][kimi][commentIdx] = val
//   }

//   if (!oldVal) {
//     oldVal = { liked: false, disliked: false };
//   }

//   likedChange = oldVal.liked 
//   ? (val.liked ? 0 : -1)
//   : (val.liked ? 1 : 0);
//   dislikedChange = oldVal.disliked 
//   ? (val.disliked ? 0 : -1)
//   : (val.disliked ? 1 : 0);
  
//   console.log(rows[userId].envanter[kimi].comments[commentIdx]);

//   rows[userId].envanter[kimi].comments[commentIdx] = {
//     ...rows[userId].envanter[kimi].comments[commentIdx],
//     like: (rows[userId].envanter[kimi].comments[commentIdx].like || 0) + likedChange,
//     dislike: (rows[userId].envanter[kimi].comments[commentIdx].dislike || 0) + dislikedChange,
//   }

//   console.log(rows[userId].envanter[kimi].comments[commentIdx]);

//   storage.setItem(userId, rows[userId]);
// }

// exports.putClaim = function (userId, user) {
//   console.log('putClaim');

//   if (!rows[userId].envanter[user]) {
//     rows[userId].envanter[user] = {};
//   }
  
//   rows[userId].envanter[user].isClaimed = true;

//   storage.setItem(userId, rows[userId]);
// }

// exports.putEnvanter = function (userId, user, val) {
//   console.log('putEnvanter');
//   console.log(val);
//   if (!rows[userId].envanter[user]) {
//     rows[userId].envanter[user] = {};
//   }
  
//   if (!rows[userId].envanter[user].comments) {
//     rows[userId].envanter[user].comments = [];
//   }

//   rows[userId].envanter[user].comments.push(val);

//   storage.setItem(userId, rows[userId]);
// }

// exports.getEnvanter = function (userId, user) {
//   console.log('getEnvanter');
//   console.log(user)

//   var ret = rows[userId].envanter[user];

//   return ret == undefined ? { comments: [] } : ret;
// }

// exports.putDiary = function (userId, date, val) {
//   console.log('putDiary');
//   console.log(date);

//   rows[userId].diaries[date] = val;
//   storage.setItem(userId, rows[userId]);
// }

// exports.getDiary = function (userId, date) {
//   console.log('getDiary');
//   console.log(date);

//   var ret = rows[userId].diaries[date];

//   return ret == undefined ? { entries: [] } : ret;
// }

// exports.getMaterials =  function (userId, materialId) {
//   console.log('getMaterials');
//   console.log(materialId);
  
//   if (materialId == undefined) {
//     return rows[userId].materialHeaders;
//   }

//   return { [materialId] : rows[userId].materials[materialId] };
// }

// exports.setMaterialPart = function (userId, materialId, partId, values) {
//     console.log('setMaterial');
//     rows[userId].materials[materialId].data[partId].value = values.value;

//     storage.setItem(userId, rows[userId]);
//     //console.log(rows[userId].materials[materialId]);
// }

// exports.getAllFieldList = function(id) {
//   console.log('getAllFieldList');
//   return rows[id].allFieldList;
// }

// exports.getGroups =  function (id, groupId) {
//   console.log('getGroups');
//   console.log(groupId); 
  
//   if (groupId == undefined) {
//     console.log("group id undefined")
//     return rows[id].groups;
//   }

//   return { [groupId] : rows[id].groups[groupId] };
// }

// exports.getFields =  function (id, fieldId) {
//     console.log('getFields');
//     console.log(rows[id].fields);
//     return rows[id].fields[fieldId];
// }

// exports.getLink =  function (id, linkId) {
//     console.log('getLink');
//     if (!row[id].fields[linkId].shareLink) {
//       console.log("incorrect link request " + id + " " + linkId)
//     }
    
//     return rows[id].fields[linkId];
// }

// exports.setFields = function (id, fieldId, value) {
//     console.log('setFields');
//     rows[id].fields[fieldId] = value;
//     rows[id].allFieldList[fieldId] = true;
//     // var fieldData = rows[id].fields[fieldId].data;

//     // Object.keys(fieldData).forEach((fieldId) => {
//     //   if (fieldData[fieldId].type == 'link') {
//     //     var refFieldId = fieldData[fieldId].link;
//     //     var refGroup = refFieldId.split('/')[0];
//     //     fieldData[fieldId].value = rows[id].fields[refGroup].data[refFieldId].value;
//     //   }
//     // });

//     storage.setItem(id, rows[id]);
//     console.log(rows[id].fields[fieldId]);
// }
  