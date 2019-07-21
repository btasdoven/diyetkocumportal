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
          headerImg: 'https://www.sigmaaldrich.com/content/dam/sigma-aldrich/structure5/183/mfcd00005451.eps/_jcr_content/renditions/mfcd00005451-medium.png'
        },
        "X": {
          id: 'X',
          header: "2-Methylthiophene",
          headerImg: 'https://www.sigmaaldrich.com/content/dam/sigma-aldrich/structure5/183/mfcd00005451.eps/_jcr_content/renditions/mfcd00005451-medium.png'
        },
        "profile2": {
          id: 'profile2',
          header: "2-Methylthiophene",
          headerImg: 'https://www.sigmaaldrich.com/content/dam/sigma-aldrich/structure5/183/mfcd00005451.eps/_jcr_content/renditions/mfcd00005451-medium.png'
        },
        "X2": {
          id: 'X2',
          header: "2-Methylthiophene",
          headerImg: 'https://www.sigmaaldrich.com/content/dam/sigma-aldrich/structure5/183/mfcd00005451.eps/_jcr_content/renditions/mfcd00005451-medium.png'
        },
        "profile3": {
          id: 'profile3',
          header: "2-Methylthiophene",
          headerImg: 'https://www.sigmaaldrich.com/content/dam/sigma-aldrich/structure5/183/mfcd00005451.eps/_jcr_content/renditions/mfcd00005451-medium.png'
        },
        "X3": {
          id: 'X3',
          header: "2-Methylthiophene",
          headerImg: 'https://www.sigmaaldrich.com/content/dam/sigma-aldrich/structure5/183/mfcd00005451.eps/_jcr_content/renditions/mfcd00005451-medium.png'
        }
      },
      materials: {
        "profile": {
          data: {
            'profile/name': { id:'profile/name', fieldId: 'name', name: 'Weight', type: 'text', value: '1.38g' },
            'profile/surname': { id:'profile/surname', fieldId: 'surname', name: 'Purity', type: 'text', value: '74%' },
            'profile/procedure': { id:'profile/procedure', fieldId: 'procedure', name: 'Procedure', type: 'text', value: 'how to synthesize' },
            'profile/hints': { id:'profile/hints', fieldId: 'hints', name: 'Hints', type: 'text', value: 'Be Careful' },
            'profile/NMR': { id:'profile/NMR', fieldId: 'NMR', name: 'NMR', type: 'image', value: 'https://www.researchgate.net/profile/Stephanie_Schubert2/publication/227269936/figure/fig2/AS:586258921316352@1516786427136/13-C-NMR-spectrum-of-thiophene-2-carboxylic-cyclodextrin-ester-a-sample-2-400-MHz.png' },
            'profile/MSDS': { id:'profile/MSDS', fieldId: 'MSDS', name: 'MSDS', type: 'text', value: 'Sigma INFO' },
            'profile/phase': { id:'profile/phase', fieldId: 'phase', name: 'States', type: 'text', value: 'Liquid' },
          }
        },
        "X": {
          data: {
            'profile/name': { id:'profile/name', fieldId: 'name', name: 'Weight', type: 'text', value: '1.38g' },
            'profile/surname': { id:'profile/surname', fieldId: 'surname', name: 'Purity', type: 'text', value: '74%' },
            'profile/procedure': { id:'profile/procedure', fieldId: 'procedure', name: 'Procedure', type: 'text', value: 'how to synthesize' },
            'profile/hints': { id:'profile/hints', fieldId: 'hints', name: 'Hints', type: 'text', value: 'Be Careful' },
            'profile/NMR': { id:'profile/NMR', fieldId: 'NMR', name: 'NMR', type: 'image', value: 'https://www.researchgate.net/profile/Stephanie_Schubert2/publication/227269936/figure/fig2/AS:586258921316352@1516786427136/13-C-NMR-spectrum-of-thiophene-2-carboxylic-cyclodextrin-ester-a-sample-2-400-MHz.png' },
            'profile/MSDS': { id:'profile/MSDS', fieldId: 'MSDS', name: 'MSDS', type: 'text', value: 'Sigma INFO' },
            'profile/phase': { id:'profile/phase', fieldId: 'phase', name: 'States', type: 'text', value: 'Liquid' },
          }
        },
        "profile2": {
          data: {
            'profile/name': { id:'profile/name', fieldId: 'name', name: 'Weight', type: 'text', value: '1.38g' },
            'profile/surname': { id:'profile/surname', fieldId: 'surname', name: 'Purity', type: 'text', value: '74%' },
            'profile/procedure': { id:'profile/procedure', fieldId: 'procedure', name: 'Procedure', type: 'text', value: 'how to synthesize' },
            'profile/hints': { id:'profile/hints', fieldId: 'hints', name: 'Hints', type: 'text', value: 'Be Careful' },
            'profile/NMR': { id:'profile/NMR', fieldId: 'NMR', name: 'NMR', type: 'image', value: 'https://www.researchgate.net/profile/Stephanie_Schubert2/publication/227269936/figure/fig2/AS:586258921316352@1516786427136/13-C-NMR-spectrum-of-thiophene-2-carboxylic-cyclodextrin-ester-a-sample-2-400-MHz.png' },
            'profile/MSDS': { id:'profile/MSDS', fieldId: 'MSDS', name: 'MSDS', type: 'text', value: 'Sigma INFO' },
            'profile/phase': { id:'profile/phase', fieldId: 'phase', name: 'States', type: 'text', value: 'Liquid' },
          }
        },
        "X2": {
          data: {
            'profile/name': { id:'profile/name', fieldId: 'name', name: 'Weight', type: 'text', value: '1.38g' },
            'profile/surname': { id:'profile/surname', fieldId: 'surname', name: 'Purity', type: 'text', value: '74%' },
            'profile/procedure': { id:'profile/procedure', fieldId: 'procedure', name: 'Procedure', type: 'text', value: 'how to synthesize' },
            'profile/hints': { id:'profile/hints', fieldId: 'hints', name: 'Hints', type: 'text', value: 'Be Careful' },
            'profile/NMR': { id:'profile/NMR', fieldId: 'NMR', name: 'NMR', type: 'image', value: 'https://www.researchgate.net/profile/Stephanie_Schubert2/publication/227269936/figure/fig2/AS:586258921316352@1516786427136/13-C-NMR-spectrum-of-thiophene-2-carboxylic-cyclodextrin-ester-a-sample-2-400-MHz.png' },
            'profile/MSDS': { id:'profile/MSDS', fieldId: 'MSDS', name: 'MSDS', type: 'text', value: 'Sigma INFO' },
            'profile/phase': { id:'profile/phase', fieldId: 'phase', name: 'States', type: 'text', value: 'Liquid' },
          }
        },
        "profile3": {
          data: {
            'profile/name': { id:'profile/name', fieldId: 'name', name: 'Weight', type: 'text', value: '1.38g' },
            'profile/surname': { id:'profile/surname', fieldId: 'surname', name: 'Purity', type: 'text', value: '74%' },
            'profile/procedure': { id:'profile/procedure', fieldId: 'procedure', name: 'Procedure', type: 'text', value: 'how to synthesize' },
            'profile/hints': { id:'profile/hints', fieldId: 'hints', name: 'Hints', type: 'text', value: 'Be Careful' },
            'profile/NMR': { id:'profile/NMR', fieldId: 'NMR', name: 'NMR', type: 'image', value: 'https://www.researchgate.net/profile/Stephanie_Schubert2/publication/227269936/figure/fig2/AS:586258921316352@1516786427136/13-C-NMR-spectrum-of-thiophene-2-carboxylic-cyclodextrin-ester-a-sample-2-400-MHz.png' },
            'profile/MSDS': { id:'profile/MSDS', fieldId: 'MSDS', name: 'MSDS', type: 'text', value: 'Sigma INFO' },
            'profile/phase': { id:'profile/phase', fieldId: 'phase', name: 'States', type: 'text', value: 'Liquid' },
          }
        },
        "X3": {
          data: {
            'profile/name': { id:'profile/name', fieldId: 'name', name: 'Weight', type: 'text', value: '1.38g' },
            'profile/surname': { id:'profile/surname', fieldId: 'surname', name: 'Purity', type: 'text', value: '74%' },
            'profile/procedure': { id:'profile/procedure', fieldId: 'procedure', name: 'Procedure', type: 'text', value: 'how to synthesize' },
            'profile/hints': { id:'profile/hints', fieldId: 'hints', name: 'Hints', type: 'text', value: 'Be Careful' },
            'profile/NMR': { id:'profile/NMR', fieldId: 'NMR', name: 'NMR', type: 'image', value: 'https://www.researchgate.net/profile/Stephanie_Schubert2/publication/227269936/figure/fig2/AS:586258921316352@1516786427136/13-C-NMR-spectrum-of-thiophene-2-carboxylic-cyclodextrin-ester-a-sample-2-400-MHz.png' },
            'profile/MSDS': { id:'profile/MSDS', fieldId: 'MSDS', name: 'MSDS', type: 'text', value: 'Sigma INFO' },
            'profile/phase': { id:'profile/phase', fieldId: 'phase', name: 'States', type: 'text', value: 'Liquid' },
          }
        },
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
  