const storage = require('node-persist');

function createData(id, name, value) {
    return { id, name, value };
}

const rows = {
    5: {
      id: 5,
      fields: {
        "basic": {
          header: "Basic Fields",
          data: {
            'basic/name': { name: 'Name', value: 'Cagla' },
            'basic/surname': { name: 'Surname', value: 'Istanbulluoglu 32 Tasdoven' },
            'basic/mobile': { name: 'Mobile', value: '+1 (123)-456-7859' },
          }
        },
        "facebook": {
          header: "Facebook Fields",
          headerImg: "https://img.icons8.com/material/24/000000/facebook.png",
          data: {
            'facebook/name': { name: 'Name', value: 'Cagla 2' },
            'facebook/surname': { name: 'Surname', value: ' 2 Istanbulluoglu Tasdoven' },
            'facebook/mobile': { name: 'Mobile', value: '+1 (123) -456-7859' },
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


exports.getFields =  function (id) {
    console.log('getFields');
    console.log(rows[id].fields);
    return rows[id].fields;
}

exports.setFields = function (id, fieldId, value) {
    console.log('setFields');
    console.log(rows[id].fields[fieldId]);
    rows[id].fields[fieldId] = value;
 
    storage.setItem(id, rows[id]);
    console.log(rows[id].fields[fieldId]);
}
  