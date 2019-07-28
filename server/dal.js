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
            'procedure': { id:'profile/procedure', fieldId: 'procedure', name: 'Procedure', type: 'text', value: 'A 1-l. three-necked round-bottomed flask is fitted with a ground-glass-sealed stirrer, an immersed thermometer, a gas inlet tube, an addition funnel (Note 1), and a distilling head, wrapped with asbestos cloth, connected to a condenser arranged for distillation. The flask is charged with 150 ml. of mineral oil (Note 2), and the system is thoroughly swept out with a slow stream of carbon dioxide admitted through the gas inlet tube while the flask is heated with an electric heating mantle. When the temperature of the oil reaches 240–250°, a slurry of 90 g. (0.51 mole) of powdered anhydrous disodium methylsuccinate (Note 3) and 100 g. (0.287 mole) of phosphorus heptasulfide (Note 4) in 250 ml. of mineral oil is placed in the addition funnel. With efficient stirring and a slow continuous stream of carbon dioxide passing through the system, the slurry is added to the hot mineral oil at such a rate as to effect fairly rapid distillation of 3-methylthiophene accompanied by considerable gas evolution (mostly hydrogen sulfide). During the addition, which requires about 1 hour, the temperature is maintained at 240–250° (Note 5). The temperature is then raised to 275° and stirring continued in the inert atmosphere for an additional hour or until distillation ceases. The total distillate, amounting to 33–38 ml., is washed with two 50-ml. portions of 5% sodium hydroxide solution and finally with 50 ml. of water (Note 6). The crude 3-methylthiophene is then distilled (Note 7). A small fore-run is discarded, and the fraction boiling between 112° and 115° is collected. The yield is 26–30 g. (52–60%), n25D 1.5170 ± 0.0005 (Note 8), (Note 9), and (Note 10).' },
            'hints': { id:'profile/hints', fieldId: 'hints', name: 'Hints', type: 'text', value: 'Be Careful' },
            'NMR': { id:'profile/NMR', fieldId: 'NMR', name: 'NMR', type: 'image', value: [
              './static/nmr.png',
              'https://www.researchgate.net/profile/Stephanie_Schubert2/publication/227269936/figure/fig2/AS:586258921316352@1516786427136/13-C-NMR-spectrum-of-thiophene-2-carboxylic-cyclodextrin-ester-a-sample-2-400-MHz.png',
            ]},
            'MSDS': { id:'profile/MSDS', fieldId: 'MSDS', name: 'MSDS', type: 'image', value: [
              './static/nmr.png',
              'https://www.researchgate.net/profile/Stephanie_Schubert2/publication/227269936/figure/fig2/AS:586258921316352@1516786427136/13-C-NMR-spectrum-of-thiophene-2-carboxylic-cyclodextrin-ester-a-sample-2-400-MHz.png',
            ]},
          }
        },
        "X": {
          data: {
            'procedure': { id:'profile/procedure', fieldId: 'procedure', name: 'Procedure', type: 'text', value: 'how to synthesize' },
            'hints': { id:'profile/hints', fieldId: 'hints', name: 'Hints', type: 'text', value: 'Be Careful' },
            'NMR': { id:'profile/NMR', fieldId: 'NMR', name: 'NMR', type: 'image', value: [
              './static/nmr.png',
              'https://www.researchgate.net/profile/Stephanie_Schubert2/publication/227269936/figure/fig2/AS:586258921316352@1516786427136/13-C-NMR-spectrum-of-thiophene-2-carboxylic-cyclodextrin-ester-a-sample-2-400-MHz.png',
            ]},
            'MSDS': { id:'profile/MSDS', fieldId: 'MSDS', name: 'MSDS', type: 'image', value: [
              './static/nmr.png',
              'https://www.researchgate.net/profile/Stephanie_Schubert2/publication/227269936/figure/fig2/AS:586258921316352@1516786427136/13-C-NMR-spectrum-of-thiophene-2-carboxylic-cyclodextrin-ester-a-sample-2-400-MHz.png',
            ]},
          }
        },
        "profile2": {
          data: {
            'procedure': { id:'profile/procedure', fieldId: 'procedure', name: 'Procedure', type: 'text', value: 'how to synthesize' },
            'hints': { id:'profile/hints', fieldId: 'hints', name: 'Hints', type: 'text', value: 'Be Careful' },
            'NMR': { id:'profile/NMR', fieldId: 'NMR', name: 'NMR', type: 'image', value: [
              './static/nmr.png',
              'https://www.researchgate.net/profile/Stephanie_Schubert2/publication/227269936/figure/fig2/AS:586258921316352@1516786427136/13-C-NMR-spectrum-of-thiophene-2-carboxylic-cyclodextrin-ester-a-sample-2-400-MHz.png',
            ]},
            'MSDS': { id:'profile/MSDS', fieldId: 'MSDS', name: 'MSDS', type: 'image', value: [
              './static/nmr.png',
              'https://www.researchgate.net/profile/Stephanie_Schubert2/publication/227269936/figure/fig2/AS:586258921316352@1516786427136/13-C-NMR-spectrum-of-thiophene-2-carboxylic-cyclodextrin-ester-a-sample-2-400-MHz.png',
            ]},
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
  