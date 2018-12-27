const storage = require('node-persist');

const rows = {
    5: {
      groups: {
        "profile": {
          id: 'profile',
          header: "Profile",
        },
        "legal": {
          id: 'legal',
          header: "Legal",
        },
        "facebook": {
          id: 'facebook',
          header: "Facebook",
          headerImg: "https://img.icons8.com/material/24/000000/facebook.png",
        }
      },
      fields: {
        "profile": {
          id: 'profile',
          header: "Profile",
          data: {
            'profile/name': { name: 'Name', value: 'Batuhan' },
            'profile/surname': { name: 'Surname', value: 'Tasdoven' },
            'profile/mobile': { name: 'Mobile', value: '+1 (425)-241-5251' },
            'profile/email': { name: 'E-mail', value: 'btasdoven@gmail.com' },
            'profile/address': { name: 'Home Address', value: '207 - 8950 University High Street, Burnaby, BC V5A4Y8, Canada' },
          }
        },
        "legal": {
          id: 'legal',
          header: "Legal",
          data: {
            'legal/passport': { name: 'Passport No', value: 'A01312345' },
            'legal/sin': { name: 'SIN (Canada)', value: '123-4567' },
            'legal/ssn': { name: 'SSN (US)', value: '123-4567' },
          }
        },
        "facebook": {
          id: 'facebook',
          header: "Facebook",
          headerImg: "https://img.icons8.com/material/24/000000/facebook.png",
          data: {
            'facebook/name': { name: 'Name', value: 'Batuhan' },
            'facebook/surname': { name: 'Surname', value: 'Tasdoven' },
            'facebook/email': { name: 'E-mail', value: 'btasdoven@gmail.com' },
          }
        }
      }
    }
};
 

async function start() {
    await storage.init({ dir: 'stg', logging: true });
    await storage.clear();
    await storage.setItem('5', rows[5]);
    console.log(rows[5])
    rows[5] = await storage.getItem('5');
    console.log(rows[5])
}

start();


exports.getGroups =  function (id) {
  console.log('getGroups');
  console.log(rows[id].groups);
  return rows[id].groups;
}

exports.getFields =  function (id, fieldId) {
    console.log('getFields');
    console.log(rows[id].fields);
    return rows[id].fields[fieldId];
}

exports.setFields = function (id, fieldId, value) {
    console.log('setFields');
    console.log(rows[id].fields[fieldId]);
    rows[id].fields[fieldId] = value;
 
    storage.setItem(id, rows[id]);
    console.log(rows[id].fields[fieldId]);
}
  