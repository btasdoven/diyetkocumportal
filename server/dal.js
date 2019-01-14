const storage = require('node-persist');

const rows = {
    5: {
      groups: {
        "profile": {
          id: 'profile',
          header: "Profile",
          headerIcon: 'person'
        },
        "addresses": {
          id: 'addresses',
          header: "Addresses",
          headerIcon: 'location_city'
        },
        "creditcards": {
          id: 'creditcards',
          header: "Credit Cards",
          headerIcon: 'credit_card'
        },
        "legal": {
          id: 'legal',
          header: "Legal",
          headerIcon: 'work'
        },
        "facebook": {
          id: 'facebook',
          header: "Facebook",
          headerImg: "https://img.icons8.com/material/24/000000/facebook.png",
          app: true
        },
        "bchydro": {
          id: 'bchydro',
          header: "BC Hydro",
          headerImg: "https://www.mycowichanvalleynow.com/wp-content/uploads/2015/09/BC-Hydro-Logo.png",
          app: true
        },
        "telus": {
          id: 'telus',
          header: "Telus",
          headerImg: "https://media.glassdoor.com/sqll/8006/telus-squarelogo-1528814538191.png",
          app: true
        }
      },
      fields: {
        "profile": {
          id: 'profile',
          header: "Profile",
          data: {
            'profile/name': { id:'profile/name', name: 'Name', type: 'text', value: 'Batuhan' },
            'profile/surname': { id:'profile/surname', name: 'Surname', type: 'text', value: 'Tasdoven' },
            'profile/mobile': { id:'profile/mobile', name: 'Mobile', type: 'tel', value: '+1 (425)-241-5251' },
            'profile/email': { id:'profile/email', name: 'E-mail', type: 'email', value: 'btasdoven@gmail.com' },
            'profile/address': { id:'profile/address', name: 'Current Address', type: 'link', link: 'addresses/sfu', 'profile/address_link': 'addresses/sfu'  },
          }
        },
        "addresses": {
          id: "addresses",
          header: "Addresses",
          data: {
            'addresses/sfu': { 
              id:'addresses/sfu',
              name: 'SFU Address',
              type: 'address',
              value: '207 - 8950 University High Street, Burnaby, BC V5A 4Y8, Canada', 
              'addresses/sfu_street': '207 - 8950 University High Street',
              'addresses/sfu_city': 'Burnaby',
              'addresses/sfu_state': 'BC',
              'addresses/sfu_pk': 'V5A 4Y8',
              'addresses/sfu_country': 'Canada'
            },
            'addresses/vancouver': {
              id:'addresses/vancouver',
              name: 'Vancouver Address',
              type: 'address',
              value: '1704 - 501 Pacific Street, Vancouver, BC V6Z 2X6, Canada',
              'addresses/vancouver_street': '1705 - 501 Pacific Street',
              'addresses/vancouver_city': 'Vancouver',
              'addresses/vancouver_state': 'BC',
              'addresses/vancouver_pk': 'V6Z 2X6',
              'addresses/vancouver_country': 'Canada'
            },
          }
        },
        "creditcards": {
          id: 'creditcards',
          header: "Credit Cards",
          headerImg: "https://static.thenounproject.com/png/29661-200.png",
          data: {

          }
        },
        "legal": {
          id: 'legal',
          header: "Legal",
          data: {
            'legal/passport': { id: 'legal/passport', name: 'Passport No', type: 'text', value: 'A11312345' },
            'legal/sin': { id: 'legal/sin', name: 'SIN (Canada)', type: 'text', value: '123-4567' },
            'legal/ssn': { id: 'legal/ssn', name: 'SSN (US)', type: 'text', value: '123-4567' },
          }
        },
        "facebook": {
          id: 'facebook',
          header: "Facebook",
          headerImg: "https://img.icons8.com/material/24/000000/facebook.png",
          data: {
            'facebook/name': { id:'facebook/name', name: 'Name', type: 'link', link: 'profile/name', 'facebook/name_link': 'profile/name'  },
            'facebook/surname': { id:'facebook/surname', name: 'Surname', type: 'link', link: 'profile/surname', 'facebook/surname_link': 'profile/surname'  },
            'facebook/email': { id:'facebook/email', name: 'E-mail', type: 'link', link: 'profile/email', 'facebook/email_link': 'profile/email' },
          }
        },
        "bchydro": {
          data: {
            'bchydro/name': { id:'bchydro/name', name: 'Name', type: 'link', link: 'profile/name', 'bchydro/name_link': 'profile/name'  },
            'bchydro/surname': { id:'bchydro/surname', name: 'Surname', type: 'link', link: 'profile/surname', 'bchydro/surname_link': 'profile/surname'  },
            'bchydro/email': { id:'bchydro/email', name: 'E-mail', type: 'link', link: 'profile/email', 'bchydro/email_link': 'profile/email' },
            'bchydro/phone': { id:'bchydro/phone', name: 'E-mail', type: 'link', link: 'profile/mobile', 'bchydro/phone_link': 'profile/mobile' },
            'bchydro/address': { id:'bchydro/address', name: 'Home Address', type: 'link', link: 'profile/address', 'bchydro/address_link': 'profile/address' },
          }
        },
        "telus": {
          data: {
            'telus/email': { id:'telus/email', name: 'E-mail', type: 'link', link: 'profile/email', 'telus/email_link': 'profile/email' },
            'telus/address': { id:'telus/address', name: 'Home Address', type: 'link', link: 'profile/address', 'telus/address_link': 'profile/address' },
          }
        }
      }
    }
};
 

async function start() {
    await storage.init({ dir: 'stg', logging: true });

    if (!process.env.PORT) {
      await storage.clear();
      await storage.setItem('5', rows[5]);
    }

    rows[5] = await storage.getItem('5');
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
    rows[id].fields[fieldId] = value;
    // var fieldData = rows[id].fields[fieldId].data;

    // Object.keys(fieldData).forEach((fieldId) => {
    //   if (fieldData[fieldId].type == 'link') {
    //     var refFieldId = fieldData[fieldId].link;
    //     var refGroup = refFieldId.split('/')[0];
    //     fieldData[fieldId].value = rows[id].fields[refGroup].data[refFieldId].value;
    //   }
    // });

    storage.setItem(id, rows[id]);
    console.log(rows[id].fields[fieldId]);
}
  