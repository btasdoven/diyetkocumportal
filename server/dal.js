const storage = require('node-persist');

const rows = {
    5: {
      allFieldList: {
        "profile/name": 'text',
        "profile/surname": 'text',
        'phones/us': 'mobile',
        'phones/canada': 'mobile',
        'emails/gmail': 'email',
        'emails/hotmail': 'email',
        'emails/work': 'email',
        'emails/school': 'email',
        'emails/junk': 'email',
        'addresses/current': 'address',
        'addresses/sfu': 'address',
        'addresses/vancouver': 'address',
        'legal/passport': 'text',
        'legal/sin': 'text',
        'legal/ssn': 'text',
      },
      materialHeaders: {
        "profile": {
          id: 'profile',
          header: "2-Methylthiophene",
          headerImg: 'https://www.sigmaaldrich.com/content/dam/sigma-aldrich/structure5/183/mfcd00005451.eps/_jcr_content/renditions/mfcd00005451-medium.png',
          weight: '1.38',
          weightUnit: 'g',
          purity: '78',
          purityUnit: '%',
          state: 'Solid'
        },
        "X": {
          id: 'X',
          header: "2-Mercaptoethanol",
          headerImg: 'https://www.sigmaaldrich.com/content/dam/sigma-aldrich/structure5/080/mfcd00004890.eps/_jcr_content/renditions/mfcd00004890-medium.png',
          weight: '0.42',
          weightUnit: 'ml',
          purity: '99',
          purityUnit: '%',
          state: 'Liquid'
        },
        "profile2": {
          id: 'profile2',
          header: "1,6-Hexanediamine",
          headerImg: 'https://www.sigmaaldrich.com/content/dam/sigma-aldrich/structure1/102/mfcd00008243.eps/_jcr_content/renditions/mfcd00008243-medium.png',
          weight: '2.13',
          weightUnit: 'g',
          purity: '98',
          purityUnit: '%',
          state: 'Solid'
        }
      },
      materials: {
        "profile": {
          data: {
            'procedure': { id:'profile/procedure', fieldId: 'procedure', name: 'Procedure', type: 'text', value: 'how to synthesize' },
            'hints': { id:'profile/hints', fieldId: 'hints', name: 'Hints', type: 'text', value: 'Be Careful' },
            'NMR': { id:'profile/NMR', fieldId: 'NMR', name: 'NMR', type: 'image', value: [
              './static/nmr.png',
              'https://www.researchgate.net/profile/Stephanie_Schubert2/publication/227269936/figure/fig2/AS:586258921316352@1516786427136/13-C-NMR-spectrum-of-thiophene-2-carboxylic-cyclodextrin-ester-a-sample-2-400-MHz.png',
              './static/nmr.png',
              'https://www.researchgate.net/profile/Stephanie_Schubert2/publication/227269936/figure/fig2/AS:586258921316352@1516786427136/13-C-NMR-spectrum-of-thiophene-2-carboxylic-cyclodextrin-ester-a-sample-2-400-MHz.png',
              './static/nmr.png',
              'https://www.researchgate.net/profile/Stephanie_Schubert2/publication/227269936/figure/fig2/AS:586258921316352@1516786427136/13-C-NMR-spectrum-of-thiophene-2-carboxylic-cyclodextrin-ester-a-sample-2-400-MHz.png',
              'https://www.researchgate.net/profile/Stephanie_Schubert2/publication/227269936/figure/fig2/AS:586258921316352@1516786427136/13-C-NMR-spectrum-of-thiophene-2-carboxylic-cyclodextrin-ester-a-sample-2-400-MHz.png',
            ]},
            'MSDS': { id:'profile/MSDS', fieldId: 'MSDS', name: 'MSDS', type: 'text', value: 'Sigma INFO' },
          }
        },
        "X": {
          data: {
            'procedure': { id:'profile/procedure', fieldId: 'procedure', name: 'Procedure', type: 'text', value: 'how to synthesize' },
            'hints': { id:'profile/hints', fieldId: 'hints', name: 'Hints', type: 'text', value: 'Be Careful' },
            'NMR': { id:'profile/NMR', fieldId: 'NMR', name: 'NMR', type: 'image', value: [
              './static/nmr.png',
              'https://www.researchgate.net/profile/Stephanie_Schubert2/publication/227269936/figure/fig2/AS:586258921316352@1516786427136/13-C-NMR-spectrum-of-thiophene-2-carboxylic-cyclodextrin-ester-a-sample-2-400-MHz.png',
              './static/nmr.png',
              'https://www.researchgate.net/profile/Stephanie_Schubert2/publication/227269936/figure/fig2/AS:586258921316352@1516786427136/13-C-NMR-spectrum-of-thiophene-2-carboxylic-cyclodextrin-ester-a-sample-2-400-MHz.png',
              './static/nmr.png',
              'https://www.researchgate.net/profile/Stephanie_Schubert2/publication/227269936/figure/fig2/AS:586258921316352@1516786427136/13-C-NMR-spectrum-of-thiophene-2-carboxylic-cyclodextrin-ester-a-sample-2-400-MHz.png',
              'https://www.researchgate.net/profile/Stephanie_Schubert2/publication/227269936/figure/fig2/AS:586258921316352@1516786427136/13-C-NMR-spectrum-of-thiophene-2-carboxylic-cyclodextrin-ester-a-sample-2-400-MHz.png',
            ]},
            'MSDS': { id:'profile/MSDS', fieldId: 'MSDS', name: 'MSDS', type: 'text', value: 'Sigma INFO' },
          }
        },
        "profile2": {
          data: {
            'procedure': { id:'profile/procedure', fieldId: 'procedure', name: 'Procedure', type: 'text', value: 'how to synthesize' },
            'hints': { id:'profile/hints', fieldId: 'hints', name: 'Hints', type: 'text', value: 'Be Careful' },
            'NMR': { id:'profile/NMR', fieldId: 'NMR', name: 'NMR', type: 'image', value: [
              './static/nmr.png',
              'https://www.researchgate.net/profile/Stephanie_Schubert2/publication/227269936/figure/fig2/AS:586258921316352@1516786427136/13-C-NMR-spectrum-of-thiophene-2-carboxylic-cyclodextrin-ester-a-sample-2-400-MHz.png',
              './static/nmr.png',
              'https://www.researchgate.net/profile/Stephanie_Schubert2/publication/227269936/figure/fig2/AS:586258921316352@1516786427136/13-C-NMR-spectrum-of-thiophene-2-carboxylic-cyclodextrin-ester-a-sample-2-400-MHz.png',
              './static/nmr.png',
              'https://www.researchgate.net/profile/Stephanie_Schubert2/publication/227269936/figure/fig2/AS:586258921316352@1516786427136/13-C-NMR-spectrum-of-thiophene-2-carboxylic-cyclodextrin-ester-a-sample-2-400-MHz.png',
              'https://www.researchgate.net/profile/Stephanie_Schubert2/publication/227269936/figure/fig2/AS:586258921316352@1516786427136/13-C-NMR-spectrum-of-thiophene-2-carboxylic-cyclodextrin-ester-a-sample-2-400-MHz.png',
            ]},
            'MSDS': { id:'profile/MSDS', fieldId: 'MSDS', name: 'MSDS', type: 'text', value: 'Sigma INFO' },
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

exports.getMaterials =  function (userId, materialId) {
  console.log('getMaterials');
  console.log(materialId);
  
  if (materialId == undefined) {
    return rows[userId].materialHeaders;
  }

  return { [materialId] : rows[userId].materials[materialId] };
}

exports.getAllFieldList = function(id) {
  console.log('getAllFieldList');
  return rows[id].allFieldList;
}

exports.getGroups =  function (id, groupId) {
  console.log('getGroups');
  console.log(groupId); 
  
  if (groupId == undefined) {
    console.log("group id undefined")
    return rows[id].groups;
  }

  return { [groupId] : rows[id].groups[groupId] };
}

exports.getFields =  function (id, fieldId) {
    console.log('getFields');
    console.log(rows[id].fields);
    return rows[id].fields[fieldId];
}

exports.getLink =  function (id, linkId) {
    console.log('getLink');
    if (!row[id].fields[linkId].shareLink) {
      console.log("incorrect link request " + id + " " + linkId)
    }
    
    return rows[id].fields[linkId];
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
  