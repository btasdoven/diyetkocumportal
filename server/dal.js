const storage = require('node-persist');

const rows = {
    5: {
      allFieldList: {
        "profile/name": 'text',
        "profile/surname": 'text',
        'profile/address': 'address',
        'phones/us': 'mobile',
        'phones/canada': 'mobile',
        'emails/gmail': 'email',
        'emails/hotmail': 'email',
        'emails/work': 'email',
        'emails/school': 'email',
        'emails/junk': 'email',
        'addresses/sfu': 'address',
        'addresses/vancouver': 'address',
        'legal/passport': 'text',
        'legal/sin': 'text',
        'legal/ssn': 'text',
      },
      groups: {
        "profile": {
          id: 'profile',
          header: "About Me",
          headerIcon: 'person'
        },
        "phones": {
          id: 'phones',
          header: "Phone Numbers",
          headerIcon: 'phone'
        },        
        "emails": {
          id: "emails",
          header: "E-mails",   
          headerIcon: 'alternate_email'
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
        }, 
        "icbc": {
          id: 'icbc',
          header: "ICBC",
          headerImg: "https://upload.wikimedia.org/wikipedia/en/thumb/c/c7/Insurance_Corporation_of_British_Columbia_Logo.svg/220px-Insurance_Corporation_of_British_Columbia_Logo.svg.png",
          app: true,
        }
      },
      fields: {
        "profile": {
          id: 'profile',
          header: "About Me",
          data: {
            'profile/name': { id:'profile/name', fieldId: 'name', name: 'Name', type: 'text', value: 'Batuhan' },
            'profile/surname': { id:'profile/surname', fieldId: 'surname', name: 'Surname', type: 'text', value: 'Tasdoven' },
          }
        },
        "phones": {
          id: "phones",
          header: "Phone Numbers",
          data: {
            'phones/us': { id:'phones/us', fieldId: 'us', name: 'US Number', type: 'tel', value: '+1 (425)-241-5251' },
            'phones/canada': { id:'phones/canada', fieldId: 'canada', name: 'Canada Number', type: 'tel', value: '+1 (604)-754-0155' }
          }
        },
        "emails": {
          id: "emails",
          header: "E-mail Addresses",
          data: {
            'emails/gmail': { id:'emails/gmail', fieldId: 'gmail', name: 'Gmail', type: 'email', value: 'btasdoven@gmail.com' },
            'emails/hotmail': { id:'emails/hotmail', fieldId: 'hotmail', name: 'Hotmail', type: 'email', value: 'btasdoven@hotmail.com' },
            'emails/school': { id:'emails/school', fieldId: 'work', name: 'School METU', type: 'email', value: 'e1746346@ceng.metu.edu.tr' },
            'emails/work': { id:'emails/work', fieldId: 'work', name: 'MS Work', type: 'email', value: 'batasdov@microsoft.com' },
            'emails/junk': { id:'emails/junk', fieldId: 'junk', name: 'For Junk', type: 'email', value: 'xxbatu_352xx@hotmail.com' },
          }
        },
        "addresses": {
          id: "addresses",
          header: "Addresses",
          data: {
            'addresses/sfu': { 
              id:'addresses/sfu',
              fieldId: 'sfu',
              name: 'SFU Address',
              type: 'address',
              value: '207 - 8950 University High Street, Burnaby, BC V5A4Y8, Canada', 
              'addresses/sfu_street': '207 - 8950 University High Street',
              'addresses/sfu_city': 'Burnaby',
              'addresses/sfu_state': 'BC',
              'addresses/sfu_pk': 'V5A 4Y8',
              'addresses/sfu_country': 'Canada'
            },
            'addresses/vancouver': {
              id:'addresses/vancouver',
              fieldId: 'vancouver',
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
            'legal/passport': { id: 'legal/passport', fieldId: 'passport', name: 'Passport No', type: 'text', value: 'A11312345' },
            'legal/sin': { id: 'legal/sin', fieldId: 'sin', name: 'SIN (Canada)', type: 'text', value: '123-4567' },
            'legal/ssn': { id: 'legal/ssn', fieldId: 'ssn', name: 'SSN (US)', type: 'text', value: '123-4567' },
          }
        },
        "bchydro": {
          data: {
            'bchydro/name': { id:'bchydro/name', fieldId: 'name', name: 'Name', type: 'link', link: 'profile/name', 'bchydro/name_link': 'profile/name'  },
            'bchydro/surname': { id:'bchydro/surname', fieldId: 'surname', name: 'Surname', type: 'link', link_type: 'text', link: 'profile/surname', 'bchydro/surname_link': 'profile/surname'  },
            'bchydro/email': { id:'bchydro/email', fieldId: 'email', name: 'E-mail', type: 'link', link_type: 'email', link: 'emails/gmail', 'bchydro/email_link': 'emails/gmail' },
            'bchydro/phone': { id:'bchydro/phone', fieldId: 'phone', name: 'Phone', type: 'link', link_type: 'mobile', link: 'phones/us', 'bchydro/phone_link': 'phones/us' },
            'bchydro/address': { id:'bchydro/address', fieldId: 'address', name: 'Home Address', type: 'link', link_type: 'address', link: 'addresses/sfu', 'bchydro/address_link': 'addresses/sfu' },
          }
        },
        "telus": {
          data: {
            'telus/id': {id: 'telus/id', fieldId: 'id', name: 'Account ID', type:'text', value: 'T574622', isReadOnly: true},
            'telus/phone': { id:'telus/phone', fieldId: 'phone', name: 'Phone Number', type: 'link', link_type: 'mobile', link: 'phones/canada', 'telus/phone_link': 'phones/canada' },
            'telus/address': { id:'telus/address', fieldId: 'address', name: 'Home Address', type: 'link', link_type: 'addresses', link: 'addresses/sfu', 'telus/address_link': 'addresses/sfu' },
          }
        },
        "icbc": {
          data: {
            "icbc/license": { id: 'icbc/license', fieldId: 'license', name: 'License No', type: 'text', value: '946-8762', isReadOnly: true},
            "icbc/vehicle": { id: 'icbc/vehicle', fieldId: 'vehicle', name: 'Vehicle Info', type: 'text', value: 'Jeep, Compass, 2018, Gray', isReadOnly: true},
            "icbc/insurance": { id: 'icbc/insurance', fieldId: 'insurance', name: 'Insurance Info', type: 'text', value: 'Level 3 Coverage, $1M liability, $500 deductable', isReadOnly: true},
            'icbc/phone': { id:'icbc/phone', fieldId: 'phone', name: 'Phone Number', type: 'link', link_type:'mobile', link: 'phones/canada', 'icbc/phone_link': 'phones/canada' },
            "icbc/creditcard": { id: 'icbc/creditcard', fieldId: 'creditcard', name: 'Credit Card', type: 'text', value: 'xxxx-xxxx-xxxx-8644'},
          }
        }
      }
    }
};
 

async function start() {
    await storage.init({ dir: 'stg', logging: true });

    if (process.env.PORT) {
      await storage.clear();
      await storage.setItem('5', rows[5]);
    }

    rows[5] = await storage.getItem('5');
}

start();

exports.getAllFieldList = function(id) {
  console.log('getAllFieldList');
  return rows[id].allFieldList;
}

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
    rows[id].allFieldList[fieldId] = true;
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
  